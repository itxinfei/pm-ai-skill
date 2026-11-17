<div align="center">

# pm-ai-skill

产品经理干活用的 AI 助手 · 76 个模块 · 支持 13 种 AI 工具

不是教你什么是 RICE，是帮你把手上这堆东西变成能交出去的结果

[![npm](https://img.shields.io/npm/v/@itxinfei/pm-ai-skill.svg?style=flat-square)](https://www.npmjs.com/package/@itxinfei/pm-ai-skill)
[![Release](https://img.shields.io/github/v/release/itxinfei/pm-ai-skill?style=flat-square&label=Release)](https://github.com/itxinfei/pm-ai-skill/releases)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/itxinfei/pm-ai-skill?style=flat-square&color=yellow)](https://github.com/itxinfei/pm-ai-skill/stargazers)

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill) · [发行版](https://github.com/itxinfei/pm-ai-skill/releases) · [能力清单](docs/capability.md) · [提示词库](docs/prompt-reference.md) · [工作流](docs/workflow-guide.md) · [FAQ](docs/faq.md)

作者 itxinfei（心飞为你飞） · [English](README_EN.md)

</div>

---

## 它和普通 AI 助手差在哪

|  | 普通 AI 帮你 | 这个 |
|---|---|---|
| 你说"写个 PRD" | 给你一个模板让你填 | 先问该不该做，过不了就劝你别写 |
| 你给一堆访谈记录 | 概括成三条结论 | 抽出原声、按主题聚类、指出你该问却没问到什么 |
| 你问"这份行不行" | 说"整体不错，可以完善一下" | 按五项打分，有一项 0 分就判不能发 |
| 你要评审 | 给你一张问题清单 | 六个视角各挑一遍，把两个视角判断相反的地方单独拎出来 |

---

## 安装

```bash
npm i -g @itxinfei/pm-ai-skill && pm-ai-skill install
```

装不上，换一种：

| 方式 | 怎么装 |
|---|---|
| Windows | `irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 \| iex` |
| macOS / Linux | `curl -fsSL https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.sh \| bash` |
| 发行包 | 下 [最新 zip](https://github.com/itxinfei/pm-ai-skill/releases/latest)，解压后 `node bin/index.js install` |
| 什么都不装 | 把 [system-prompt.md](skill-source/system-prompt.md) 粘进任意 AI 的系统提示词 |

脚本会自动扫你装了哪些工具，有几个装几个：

> **国产** WorkBuddy · TraeCode CN · Trae · 豆包
> **国外** Claude Code · Codex · Gemini CLI · Cursor · Windsurf · Kiro · OpenCode · Continue
> **通用** Cline · Roo Code 等 `.agents/skills`

---

## 能干什么

### 三种活，三种给法

| 你说 | 它给 |
|---|---|
| "该不该做""值不值""是真需求还是客气话" | 结论 + 依据，不给文档 |
| "写个 PRD""排个优先级""画个路线图" | 对着模块出东西 |
| "从头推到能开发" | 走链路：需求体检 → PRD → 评审 → 埋点 |

判断标准只有一句：你要的是一个结论，还是一份能交出去的东西。

### 手上有东西，交给你

多数人是攥着材料来的，那句"帮我看看"根本说不清要什么。

| 手上有 | 给你 |
|---|---|
| 访谈录音、笔记 | 机会清单 + 该问却没问到的问题 |
| 竞品截图、财报 | 对比表 + 跟不跟的结论 |
| 一句"我想做个 XX" | 做不做的判断 + 下一步 |
| 写好的 PRD | 打分，不重写 |
| 需求清单 | 排序 + 建议砍掉的名单 |
| 数据报表 | 结论 + 可能原因 + 怎么验证 |
| 上线计划 | 风险清单 + 阻断项 + 兜底 |
| 差评截图 | 归类 + 影响面 + 改不改 |
| 立项申请 | 缺口 + 该不该上会 |
| 只有一个 deadline | 最小可交付范围 |

材料不够会直接报缺什么，不拿通用话术糊上。

### 六个视角轮流挑刺

| 视角 | 盯什么 |
|---|---|
| 产品 | 目标清不清楚、范围有没有蔓延、值不值 |
| 研发 | 能不能做、接口清不清、要多久 |
| 测试 | 怎么验、异常路径、边界在哪 |
| 设计 | 交互一致、空状态、有没有反馈 |
| 运营 | 埋点、灰度、回滚 |
| 法务 | 隐私、合规、内容审核 |

按 **阻断 / 重要 / 建议** 分三级，结论三档：能上、有条件能上、不能上。

> 值钱的不是结论，是分歧。两个视角判断相反的地方，才是会上要吵的事。

### 给已有的东西打分

| 手上是什么 | 查什么（每项 0-3 分） |
|---|---|
| PRD | 问题定义、目标与验收、范围边界、依赖与风险、埋点 |
| 竞品分析 | 结论先行、证据可查、差距量化、动作建议 |
| 数据复盘 | 假设明确、口径一致、归因分层、下一步具体 |
| 立项申请 | 市场判断、模型可信、资源匹配、风险与退出条件 |
| 访谈记录 | 样本交代、原声摘录、聚类有据、机会可验 |
| 上线计划 | 灰度规则、回滚条件、责任到人、指标观测 |

**有一项 0 分，直接判不能发。** 结论只有三档：能发 / 补两处再发 / 重写。

反过来同样守规矩：能发就说能发。挑刺挑多了，下次没人找你。

---

## 命令

| 命令 | 干什么 |
|---|---|
| `pm-ai-skill install` | 装到本机检测到的所有 AI 工具 |
| `pm-ai-skill template prd` | 取模板（13 个） |
| `pm-ai-skill example grade` | 看样例（10 份，看"做成什么样算合格"） |
| `pm-ai-skill doc prompt` | 查文档（能力 / 提示词 / 工作流 / FAQ / 工具 / 盘点） |
| `pm-ai-skill asset report` | 导 HTML（report 汇报 / review 评审 / grade 打分） |
| `pm-ai-skill manifest` | 导机器可读清单，给脚本和自己的小工具用 |
| `pm-ai-skill info` | 看版本和装了哪些工具 |

平时不用记命令，说人话就行：

```
这份 PRD 你打个分，能不能进评审
这份访谈记录你帮我看看，能提炼出什么
用 RICE 排一下这几个需求，再用 MoSCoW 砍 MVP
```

---

## 76 个模块

<details>
<summary>点开看清单（十类）</summary>

| 类 | 数量 | 模块 |
|---|---|---|
| 需求发现与优先级 | 8 | RICE · MoSCoW · Kano · Impact-Effort · JTBD · Working Backwards · 需求澄清 5 问 · 访谈解析 |
| 用户调研 | 11 | 用户分层 · 问卷设计 · 深度访谈 · 可用性测试 · A/B 测试 · NPS/CSAT/CES · 焦点小组 · 日记研究 · 卡片分类 · 反馈聚类 · 行为数据分析 |
| 竞品与市场 | 9 | 机会解决方案树 · 竞品分析 · 市场空白 · 切换动力 · TAM/SAM/SOM · 竞品功能拆解 · 产品定位 · 战略三件套 · 厂商调研 |
| 策略与规划 | 8 | 产品愿景 · 项目立项流程 · OKR · 路线图 · Sprint 规划 · 赌注评估 · 商业模式画布 · 北极星指标 |
| 方案设计 | 7 | 产品架构 · User Story · 用户旅程地图 · 思维导图 · 故事板 · 画图实操指南 · Excalidraw 输出 |
| 文档输出 | 5 | PRD · 业务案例一页纸 · 发布说明 · 功能规格说明 · 需求评审准备 |
| 协作沟通 | 9 | 会议纪要 · 干系人地图 · Pre-mortem · 风险与延期沟通 · 问题追踪与升级 · 销售赋能 · 增长飞轮 · 用户画像 · 和开发对齐 |
| 数据与度量 | 7 | 数据分析 · 指标层级 · HEART · AI 产品度量 · RICE 复盘 · PMF · 延迟成本 |
| 商用与增长 | 7 | 定价策略 · AARRR · RARRA · 单位经济模型 · GTM · 客户成功 · 项目复盘 |
| 自我迭代与成长 | 5 | 反馈学习 · 个人案例库 · 成长追踪 · 错误复盘 · 提示词自我优化 |

每个模块的适用场景见 [能力清单](docs/capability.md)，配套提问见 [提示词库](docs/prompt-reference.md)（92 条）。

</details>

---

## 目录

```
skill-source/   system-prompt.md（核心）+ manifest.json + triggers.md
docs/           能力清单 · 92 条提示词 · 工作流 · 工具速查 · 同类盘点 · FAQ
templates/      13 个模板         examples/  10 份样例
assets/         3 个 HTML 报告     evals/     行为回归用例
```

---

## 它做不到什么

- **不给数字结论**。市场多大、能涨几个点，自己算。它给算法和拆解方式。
- **不替你做决策**。给依据和风险清单，拍板的是你。
- **不保证输出对**。AI 可能拿着错的前提给出很合理的答案。涉及钱、法务、安全必须人工复核。
- **不懂你的公司**。组织政治、历史包袱它不知道。方案落不了地，先想想是不是这些原因。
- **不写生产代码**。能画原型、能给接口约定，写不了代码。
- **不覆盖**：定价落地、投放策略、算法选型、特定行业合规、B 端复杂销售链路。

---

<div align="center">

MIT License · itxinfei（心飞为你飞）

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill) · [Issues](https://github.com/itxinfei/pm-ai-skill/issues)

</div>
