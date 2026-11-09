# PM-AI-Skill 一键安装脚本（Windows PowerShell）
# 用法：
#   irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex
# 或手动下载后执行：
#   powershell -ExecutionPolicy Bypass -File install.ps1

$ErrorActionPreference = 'Stop'
$repo = 'https://gitee.com/itxinfei/pm-ai-skill'
$zipUrl = "$repo/repository/archive/main.zip"
$skillName = 'pm-ai-skill'

Write-Host "=== PM-AI-Skill 一键安装 ===" -ForegroundColor Cyan
Write-Host "下载地址：$zipUrl"

# 1. 下载 zip
$tmpZip = Join-Path $env:TEMP "pm-ai-skill-main.zip"
$tmpDir = Join-Path $env:TEMP "pm-ai-skill-extract"
if (Test-Path $tmpDir) { Remove-Item $tmpDir -Recurse -Force }

Invoke-WebRequest -Uri $zipUrl -OutFile $tmpZip -UseBasicParsing
Write-Host "✅ 下载完成"

# 2. 解压
Expand-Archive -Path $tmpZip -DestinationPath $tmpDir -Force
$extractedRoot = Get-ChildItem $tmpDir -Directory | Select-Object -First 1
$skillSource = Join-Path $extractedRoot.FullName 'skill-source'
if (-not (Test-Path $skillSource)) {
    # 兜底：找包含 skill.json 的目录
    $skillSource = (Get-ChildItem $tmpDir -Recurse -Filter 'skill.json' | Select-Object -First 1).DirectoryName
}
Write-Host "✅ 解压完成：$skillSource"

# 3. 探测 WorkBuddy skills 目录
$home2 = $env:USERPROFILE
$candidates = @(
    (Join-Path $env:APPDATA 'WorkBuddy\skills'),
    (Join-Path $home2 '.workbuddy\skills'),
    (Join-Path $env:LOCALAPPDATA 'WorkBuddy\skills')
)
$targetBase = $null
foreach ($c in $candidates) {
    if (Test-Path $c) { $targetBase = $c; break }
}

if ($targetBase) {
    $dest = Join-Path $targetBase $skillName
    if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
    Copy-Item $skillSource $dest -Recurse
    Write-Host "✅ 已安装到：$dest" -ForegroundColor Green
} else {
    $dest = Join-Path (Get-Location) $skillName
    Copy-Item $skillSource $dest -Recurse
    Write-Host "⚠️ 未找到 WorkBuddy skills 目录，已释放到当前目录：$dest" -ForegroundColor Yellow
    Write-Host "   请手动把整个文件夹拷到 WorkBuddy 的 skills 目录下。"
}

# 4. 清理
Remove-Item $tmpZip -Force -ErrorAction SilentlyContinue
Remove-Item $tmpDir -Recurse -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== 安装完成 ===" -ForegroundColor Cyan
Write-Host "重启 WorkBuddy 后，使用触发指令："
Write-Host "  pm-ai-skill install"
Write-Host "  或直接在对话中说：使用 RICE 模型评估以下需求..."
