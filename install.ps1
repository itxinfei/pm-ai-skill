# PM-AI-Skill 一键安装脚本（Windows PowerShell）
# 支持所有主流 AI CLI 和 IDE
# 用法：irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex

$ErrorActionPreference = 'Stop'
$zipUrl = 'https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip'
$skillName = 'pm-ai-skill'

Write-Host "=== PM-AI-Skill 一键安装 ===" -ForegroundColor Cyan
Write-Host ""

# 1. 下载
$tmpZip = Join-Path $env:TEMP "pm-ai-skill-main.zip"
$tmpDir = Join-Path $env:TEMP "pm-ai-skill-extract"
if (Test-Path $tmpDir) { Remove-Item $tmpDir -Recurse -Force }

Invoke-WebRequest -Uri $zipUrl -OutFile $tmpZip -UseBasicParsing
Write-Host "[1/4] 下载完成"

# 2. 解压
Expand-Archive -Path $tmpZip -DestinationPath $tmpDir -Force
$extractedRoot = Get-ChildItem $tmpDir -Directory | Select-Object -First 1
$skillSource = Join-Path $extractedRoot.FullName 'skill-source'
if (-not (Test-Path $skillSource)) {
    $skillSource = (Get-ChildItem $tmpDir -Recurse -Filter 'skill.json' | Select-Object -First 1).DirectoryName
}
Write-Host "[2/4] 解压完成"

# 3. 所有支持的工具目录
$home = $env:USERPROFILE

$toolPaths = @(
    # 国产
    @{ Tool = 'WorkBuddy';      Path = (Join-Path $env:APPDATA 'WorkBuddy\skills') },
    @{ Tool = 'WorkBuddy';      Path = (Join-Path $home '.workbuddy\skills') },
    @{ Tool = 'TraeCode CN';    Path = (Join-Path $home '.trae-cn\skills') },
    @{ Tool = 'Trae';           Path = (Join-Path $home '.trae\skills') },
    # 国外
    @{ Tool = 'Claude Code';    Path = (Join-Path $home '.claude\skills') },
    @{ Tool = 'Codex';          Path = (Join-Path $home '.codex\skills') },
    @{ Tool = 'Gemini CLI';     Path = (Join-Path $home '.gemini\skills') },
    @{ Tool = 'Cursor';         Path = (Join-Path $home '.cursor\skills') },
    @{ Tool = 'Windsurf';       Path = (Join-Path $home '.codeium\windsurf\skills') },
    @{ Tool = 'Kiro';           Path = (Join-Path $home '.kiro\skills') },
    @{ Tool = 'OpenCode';       Path = (Join-Path $home '.opencode\skills') },
    @{ Tool = 'Continue';       Path = (Join-Path $home '.continue\skills') },
    # 通用约定（豆包、Cline、Roo Code 等）
    @{ Tool = '通用 .agents';   Path = (Join-Path $home '.agents\skills') }
)

# 筛选存在的目录，按路径去重
$targets = @()
$seen = @{}
foreach ($t in $toolPaths) {
    if ((Test-Path $t.Path) -and -not $seen.ContainsKey($t.Path)) {
        $seen[$t.Path] = $true
        $targets += $t
    }
}

Write-Host "[3/4] 检测到 $($targets.Count) 个工具"

# 4. 安装
if ($targets.Count -gt 0) {
    foreach ($t in $targets) {
        $dest = Join-Path $t.Path $skillName
        if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
        Copy-Item $skillSource $dest -Recurse
        Write-Host "  -> $($t.Tool): $dest" -ForegroundColor Green
    }
} else {
    # 一个都没找到，装到通用目录 + 当前目录
    $defaultDir = Join-Path $home '.agents\skills'
    if (-not (Test-Path $defaultDir)) { New-Item -ItemType Directory -Path $defaultDir -Force | Out-Null }
    $dest = Join-Path $defaultDir $skillName
    Copy-Item $skillSource $dest -Recurse
    Write-Host "  -> 通用目录: $dest" -ForegroundColor Yellow

    $localDest = Join-Path (Get-Location) $skillName
    Copy-Item $skillSource $localDest -Recurse
    Write-Host "  -> 当前目录: $localDest" -ForegroundColor Yellow
}

# 清理
Remove-Item $tmpZip -Force -ErrorAction SilentlyContinue
Remove-Item $tmpDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "[4/4] 安装完成" -ForegroundColor Cyan
Write-Host ""
Write-Host "重启工具后直接说：用 RICE 模型评估一下这些需求"
