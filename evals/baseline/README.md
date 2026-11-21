# 基线

第一次真实基线，跑在 v1.2.6 发布前。

看数字别看热闹：它的用处是下次改完 `system-prompt.md` 再跑一遍，掉分的地方就是改坏的地方。

## 读数

| 项 | 值 |
|---|---|
| 用例 | 27 条全跑 |
| 平均 | 98% |
| 通过 | 25 |
| 不过 | 2 |
| 模型 | Claude Code 2.1.330（`claude -p`） |
| 时间 | 2026-11-21，全量重跑 1582 秒 |

答案在 `claude/`，逐条得分在 `claude/score.json`。

## 跑法为什么是这样

三个设定，缺一个分数就不可比：

1. **空目录**：在临时空目录里跑。否则模型会翻到本仓库的 git 历史当材料——第一版基线就是这么被污染的，`self-001` 直接拿提交记录做了复盘。
2. **禁工具**：`--allowed-tools None`。让它只能凭 prompt 作答，不能读文件。
3. **带材料**：12 条用例自带夹具（`evals/fixtures/`）。这些用例的 input 里写着"（附文档）""（贴三段访谈）"，不给材料只能测"会不会要材料"，测不出评审和打分的真实水平。

## 没过的两条

| 用例 | 缺什么 | 判断 |
|---|---|---|
| `checkup-002` | 没问"用户现在怎么解决" | 真缺。优先级判断对了，最关键的一问漏了 |
| `style-001` | 周报里写了"这条才闭环" | 真缺。套话就是套话，跟语境无关 |

这两处不是尺子松，是确实没做到。留着，下一版改完对照它们有没有修好。

## 复跑

```powershell
pwsh -File scripts/run-baseline.ps1 -Tool claude -Force
node bin/index.js score all evals/baseline/claude
```

只跑几条用 `-Only checkup-002,style-001 -Force`，两分钟出结果。

跑完加上门禁再比一次：

```powershell
node bin/index.js score all evals/baseline/claude --baseline
```

没有掉分退出码是 0，掉分是 1。改过 `cases.json` 的规则会先报「指纹对不上」，那时候先想清楚是修规则还是让分好看，再决定要不要重出基线。
