# PM-AI-Skill 一键安装脚本（Windows PowerShell）
# 支持：WorkBuddy、TraeCode CN、豆包、以及所有支持 .agents/skills 约定的工具
# 用法：
#   irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex

$ErrorActionPreference = 'Stop'
$zipUrl = 'https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip'
$skillName = 'pm-ai-skill'

Write-Host "=== PM-AI-Skill 一键安装 ===" -ForegroundColor Cyan
Write-Host "支持：WorkBuddy / TraeCode CN / 豆包 / 其他 .agents 兼容工具"
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

# 3. 找所有支持的工具目录
$home = $env:USERPROFILE
$targets = @()

# WorkBuddy
$workbuddyPaths = @(
    (Join-Path $env:APPDATA 'WorkBuddy\skills'),
    (Join-Path $home '.workbuddy\skills'),
    (Join-Path $env:LOCALAPPDATA 'WorkBuddy\skills')
)
foreach ($p in $workbuddyPaths) {
    if (Test-Path $p) { $targets += [PSCustomObject]@{ Tool = 'WorkBuddy'; Path = $p } }
}

# TraeCode CN
$traePath = Join-Path $home '.trae-cn\skills'
if (Test-Path $traePath) { $targets += [PSCustomObject]@{ Tool = 'TraeCode CN'; Path = $traePath } }

# 豆包（.agents 约定）
$agentsPath = Join-Path $home '.agents\skills'
if (Test-Path $agentsPath) { $targets += [PSCustomObject]@{ Tool = '豆包/通用'; Path = $agentsPath } }

# 去重
$targets = $targets | Sort-Object Path -Unique

Write-Host "[3/4] 检测到 $($targets.Count) 个工具"

# 4. 安装到每个工具
if ($targets.Count -gt 0) {
    foreach ($t in $targets) {
        $dest = Join-Path $t.Path $skillName
        if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
        Copy-Item $skillSource $dest -Recurse
        Write-Host "  -> $($t.Tool): $dest" -ForegroundColor Green
    }
} else {
    # 一个都没找到，装到 .agents/skills 并释放到当前目录
    $defaultAgents = Join-Path $home '.agents\skills'
    if (-not (Test-Path $defaultAgents)) { New-Item -ItemType Directory -Path $defaultAgents -Force | Out-Null }
    $dest = Join-Path $defaultAgents $skillName
    Copy-Item $skillSource $dest -Recurse
    Write-Host "  -> 通用目录: $dest" -ForegroundColor Yellow

    $localDest = Join-Path (Get-Location) $skillName
    Copy-Item $skillSource $localDest -Recurse
    Write-Host "  -> 当前目录: $localDest" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "没检测到已安装的工具，你可以手动把 skill 文件夹拷到对应工具的 skills 目录。"
}

# 清理
Remove-Item $tmpZip -Force -ErrorAction SilentlyContinue
Remove-Item $tmpDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "[4/4] 安装完成" -ForegroundColor Cyan
Write-Host ""
Write-Host "重启对应工具后，直接说：用 RICE 模型评估一下这些需求"
Write-Host "或者：帮我写个 PRD，先问我业务背景"
