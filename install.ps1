# PM-AI-Skill 一键安装脚本（Windows PowerShell）
# 支持所有主流 AI CLI 和 IDE
# 用法：irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex

$ErrorActionPreference = 'Stop'
$skillName = 'pm-ai-skill'

Write-Host "=== PM-AI-Skill 一键安装 ===" -ForegroundColor Cyan
Write-Host ""

$tmpZip = Join-Path $env:TEMP "pm-ai-skill-main.zip"
$tmpDir = Join-Path $env:TEMP "pm-ai-skill-extract"
if (Test-Path -LiteralPath $tmpDir) { Remove-Item -LiteralPath $tmpDir -Recurse -Force }

# 1. 下载。Gitee 的 archive 链接有时返回网页不是 zip，所以下回来要验一下文件头
$sources = @(
    'https://github.com/itxinfei/pm-ai-skill/archive/refs/heads/main.zip',
    'https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip'
)
$gotIt = $false
Write-Host "[1/4] 下载中..."
foreach ($url in $sources) {
    $host_ = ([Uri]$url).Host
    try {
        Invoke-WebRequest -Uri $url -OutFile $tmpZip -UseBasicParsing -ErrorAction Stop
        if (Test-Path -LiteralPath $tmpZip) {
            $bytes = [IO.File]::ReadAllBytes($tmpZip)
            if ($bytes.Length -gt 4 -and $bytes[0] -eq 0x50 -and $bytes[1] -eq 0x4B) {
                Write-Host "  来源：$host_"
                $gotIt = $true
                break
            }
            Write-Host "  $host_ 返回的不是 zip，换下一个源" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "  $host_ 连不上，换下一个源" -ForegroundColor Yellow
    }
}
if (-not $gotIt) {
    Write-Host "两个源都没取到。手动下载后解压，运行 node bin\index.js install：" -ForegroundColor Red
    Write-Host "  https://github.com/itxinfei/pm-ai-skill/releases/latest"
    return
}

# 2. 解压
try {
    Expand-Archive -Path $tmpZip -DestinationPath $tmpDir -Force -ErrorAction Stop
} catch {
    Write-Host "解压失败：$($_.Exception.Message)" -ForegroundColor Red
    Write-Host "文件可能没下完整，请手动下载 Release 包：https://github.com/itxinfei/pm-ai-skill/releases/latest"
    return
}
$extractedRoot = Get-ChildItem -LiteralPath $tmpDir -Directory | Select-Object -First 1
$skillSource = Join-Path $extractedRoot.FullName 'skill-source'
if (-not (Test-Path -LiteralPath $skillSource)) {
    $found = Get-ChildItem -LiteralPath $tmpDir -Recurse -Filter 'skill.json' | Select-Object -First 1
    if ($found) { $skillSource = Split-Path -Parent $found.FullName }
}
if (-not (Test-Path -LiteralPath $skillSource)) {
    Write-Host "压缩包里没找到 skill-source，先别装了，去提个 issue" -ForegroundColor Red
    return
}
# 模板、文档、样例、HTML 报告要一起装。system-prompt 里写着有多少个，文件不在就只能靠编。
$assetRoot = $extractedRoot.FullName
$assetNames = @('templates', 'docs', 'examples', 'assets')
Write-Host "[2/4] 解压完成"

# 3. 所有支持的工具目录
$homeDir = $env:USERPROFILE

$toolPaths = @(
    # 国产
    @{ Tool = 'WorkBuddy';      Path = (Join-Path $env:APPDATA 'WorkBuddy\skills') },
    @{ Tool = 'WorkBuddy';      Path = (Join-Path $homeDir '.workbuddy\skills') },
    @{ Tool = 'TraeCode CN';    Path = (Join-Path $homeDir '.trae-cn\skills') },
    @{ Tool = 'Trae';           Path = (Join-Path $homeDir '.trae\skills') },
    @{ Tool = '豆包';           Path = (Join-Path $homeDir 'Doubao\skills') },
    @{ Tool = '豆包';           Path = (Join-Path $homeDir '.doubao\skills') },
    # 国外
    @{ Tool = 'Claude Code';    Path = (Join-Path $homeDir '.claude\skills') },
    @{ Tool = 'Codex';          Path = (Join-Path $homeDir '.codex\skills') },
    @{ Tool = 'Gemini CLI';     Path = (Join-Path $homeDir '.gemini\skills') },
    @{ Tool = 'Cursor';         Path = (Join-Path $homeDir '.cursor\skills') },
    @{ Tool = 'Windsurf';       Path = (Join-Path $homeDir '.codeium\windsurf\skills') },
    @{ Tool = 'Kiro';           Path = (Join-Path $homeDir '.kiro\skills') },
    @{ Tool = 'OpenCode';       Path = (Join-Path $homeDir '.opencode\skills') },
    @{ Tool = 'Continue';       Path = (Join-Path $homeDir '.continue\skills') },
    # 通用约定（豆包、Cline、Roo Code 等）
    @{ Tool = '通用 .agents';   Path = (Join-Path $homeDir '.agents\skills') }
)

$targets = @()
$seen = @{}
foreach ($t in $toolPaths) {
    if ((Test-Path -LiteralPath $t.Path) -and -not $seen.ContainsKey($t.Path)) {
        $seen[$t.Path] = $true
        $targets += $t
    }
}

Write-Host "[3/4] 检测到 $($targets.Count) 个工具"

# 4. 安装
function Install-Assets($dest) {
    foreach ($a in $assetNames) {
        $srcA = Join-Path $assetRoot $a
        if (Test-Path -LiteralPath $srcA) {
            Copy-Item -LiteralPath $srcA -Destination (Join-Path $dest $a) -Recurse -Force
        }
    }
}

if ($targets.Count -gt 0) {
    foreach ($t in $targets) {
        $dest = Join-Path $t.Path $skillName
        if (Test-Path -LiteralPath $dest) { Remove-Item -LiteralPath $dest -Recurse -Force }
        Copy-Item -LiteralPath $skillSource -Destination $dest -Recurse
        Install-Assets $dest
        Write-Host "  -> $($t.Tool): $dest" -ForegroundColor Green
    }
} else {
    # 一个都没找到，装到通用目录
    $defaultDir = Join-Path $homeDir '.agents\skills'
    if (-not (Test-Path -LiteralPath $defaultDir)) { New-Item -ItemType Directory -Path $defaultDir -Force | Out-Null }
    $dest = Join-Path $defaultDir $skillName
    Copy-Item -LiteralPath $skillSource -Destination $dest -Recurse
    Install-Assets $dest
    Write-Host "  -> 通用目录: $dest" -ForegroundColor Yellow

    # 当前目录里要是已经是这份内容，就别再拷一份
    $cwdIsProject = Test-Path -LiteralPath (Join-Path (Get-Location).Path 'skill-source\system-prompt.md')
    if (-not $cwdIsProject) {
        $localDest = Join-Path (Get-Location).Path $skillName
        Copy-Item -LiteralPath $skillSource -Destination $localDest -Recurse
        Install-Assets $localDest
        Write-Host "  -> 当前目录: $localDest" -ForegroundColor Yellow
    }
}

# 清理
Remove-Item -LiteralPath $tmpZip -Force -ErrorAction SilentlyContinue
Remove-Item -LiteralPath $tmpDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "[4/4] 安装完成" -ForegroundColor Cyan
Write-Host ""
Write-Host "重启工具后直接说：用 RICE 模型评估一下这些需求"
Write-Host "想用 HTML 报告模板和命令行，装 npm 版：npm i -g @itxinfei/pm-ai-skill"
