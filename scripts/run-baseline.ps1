# 跑基线：把 27 条用例的 input 交给一个真实 AI，答案落盘，再交给 score 打分。
#
# 用法：
#   pwsh -File scripts/run-baseline.ps1 -Tool claude -Out evals/baseline/claude
#   pwsh -File scripts/run-baseline.ps1 -Tool claude -Only route-001,chain-001
#   pwsh -File scripts/run-baseline.ps1 -Force            # 覆盖已有答案重跑
#
# 两个关键设定，缺一个基线就不可比：
#   1. 在空的临时目录里跑，不让模型翻到本仓库的 git 历史当材料
#   2. 禁掉工具（--allowed-tools None），只让它凭 prompt 作答
#
# 断点续跑：答案已存在直接跳过，不用 -Force 不会覆盖。

param(
  [string]$Tool = 'claude',
  [string]$Out = 'evals/baseline/claude',
  [string[]]$Only = @(),
  [string]$Model = '',
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$casesFile = Join-Path $root 'evals\cases.json'
$sysFile = Join-Path $root 'skill-source\system-prompt.md'
$fixDir = Join-Path $root 'evals\fixtures'
$outDir = if ([IO.Path]::IsPathRooted($Out)) { $Out } else { Join-Path $root $Out }
$sandbox = Join-Path $env:TEMP 'pm-baseline-sandbox'

# 用例自己没带材料时，给这几条补上夹具。不带材料只能测"会不会要材料"，测不出评审和打分能力
$fixtures = @{
  'review-001'     = 'prd.md'
  'review-002'     = 'prd.md'
  'review-004'     = 'prd.md'
  'grade-001'      = 'prd.md'
  'grade-002'      = 'prd.md'
  'style-001'      = 'weekly.md'
  'chain-002'      = 'requirements.md'
  'chain-003'      = 'requirements.md'
  'material-001'   = 'interview.md'
  'material-002'   = 'competitors.md'
  'competitor-001' = 'competitors.md'
  'self-001'       = 'project-log.md'
}

if (-not (Test-Path $casesFile)) { throw "找不到 $casesFile" }
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }
if (-not (Test-Path $sandbox)) { New-Item -ItemType Directory -Force -Path $sandbox | Out-Null }

$sys = [IO.File]::ReadAllText($sysFile)
$cases = (Get-Content $casesFile -Raw -Encoding utf8 | ConvertFrom-Json).cases
if ($Only.Count -gt 0) {
  $ids = @(($Only -join ',') -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
  $cases = @($cases | Where-Object { $ids -contains $_.id })
  if ($cases.Count -eq 0) { throw "没有匹配的用例 id：$($ids -join ', ')" }
}
if ($cases -isnot [array]) { $cases = @($cases) }

$guide = "`n`n直接回答用户。不要复述规则，不要说明你在做什么。材料或文档没有实际贴出来的，按没给处理，先说缺什么，不要自己编。"

$sw = Get-Date
$done = 0
foreach ($c in $cases) {
  $outFile = Join-Path $outDir ($c.id + '.md')
  if ((Test-Path $outFile) -and -not $Force) { Write-Host ("跳过 " + $c.id + "（已有答案，加 -Force 覆盖）"); continue }

  $prompt = "以下是你在这次会话中必须遵守的工作规则，读完再回答后面的问题。`n`n" + $sys + "`n`n---`n`n用户说：" + $c.input

  $fixName = $fixtures[$c.id]
  if ($fixName) {
    $fixPath = Join-Path $fixDir $fixName
    if (Test-Path $fixPath) {
      $fixText = [IO.File]::ReadAllText($fixPath)
      $prompt += "`n`n---`n`n用户附上的材料（$fixName）：`n`n" + $fixText
    }
  }
  $prompt += $guide

  $tmp = Join-Path $sandbox ('prompt-' + $c.id + '.txt')
  [IO.File]::WriteAllText($tmp, $prompt, (New-Object Text.UTF8Encoding $false))

  $sw1 = Get-Date
  if ($Tool -eq 'claude') {
    $bin = "claude -p --allowed-tools None --output-format text"
    if ($Model) { $bin = "claude -p --model $Model --allowed-tools None --output-format text" }
  } elseif ($Tool -eq 'gemini') {
    $bin = "gemini -p --output-format text"
  } else {
    throw "不认识的工具：$Tool（目前支持 claude / gemini）"
  }
  $arg = "cd /d `"$sandbox`" && $bin 2>nul < `"$tmp`""
  $text = (& cmd /c $arg) -join "`n"
  $text = $text.Trim()
  if (-not $text) { Write-Warning ("$($c.id) 返回空，未写入"); continue }

  [IO.File]::WriteAllText($outFile, $text + "`n", (New-Object Text.UTF8Encoding $false))
  Remove-Item -LiteralPath $tmp -Force
  $done++
  $sec = [int]((Get-Date) - $sw1).TotalSeconds
  Write-Host ("$($c.id)  完成  $sec 秒  $([math]::Round($text.Length / 100) / 10) 百字")
}

$total = [int]((Get-Date) - $sw).TotalSeconds
Write-Host ""
Write-Host "本次跑了 $done 条，总耗时 $total 秒，答案在 $outDir"
Write-Host "下一步：node bin/index.js score all $Out --json"
