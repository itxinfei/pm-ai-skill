<div align="center">

# pm-ai-skill

产品经理干活用的 AI 助手。76 个模块，十类活。你说人话，它认得出你卡在哪。

不是教你什么是 RICE，是帮你把手上这堆东西变成能交出去的结果。

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei%20%E5%BF%83%E9%A3%9E%E4%B8%BA%E4%BD%A0%E9%A3%9E-orange.svg?style=flat-square)](https://github.com/itxinfei)
[![npm version](https://img.shields.io/npm/v/@itxinfei/pm-ai-skill.svg?style=flat-square)](https://www.npmjs.com/package/@itxinfei/pm-ai-skill)
[![GitHub release](https://img.shields.io/github/v/release/itxinfei/pm-ai-skill?style=flat-square&label=Release)](https://github.com/itxinfei/pm-ai-skill/releases)
[![Platform](https://img.shields.io/badge/Platform-13%20%2B%20AI%20Tools-brightgreen.svg?style=flat-square)](#支持的工具)
[![Stars](https://img.shields.io/github/stars/itxinfei/pm-ai-skill?style=flat-square&color=yellow)](https://github.com/itxinfei/pm-ai-skill/stargazers)

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill) · [发行版](https://github.com/itxinfei/pm-ai-skill/releases) · [能力清单](docs/capability.md) · [提示词库](docs/prompt-reference.md) · [工作流](docs/workflow-guide.md) · [工具速查](docs/tools.md) · [常见问题](docs/faq.md) · [同类项目盘点](docs/awesome-pm-skills.md)

作者：itxinfei（心飞为你飞） · [English](README_EN.md)

</div>

---

## 它能接三种活

| 类型 | 你会怎么说 | 它给什么 |
|---|---|---|
| 判断 | "该不该做""值不值""是真需求还是客气话" | 结论 + 依据，不给文档 |
| 产出 | "写个 PRD""排个优先级""画个路线图" | 对着模块出东西 |
| 链路 | "从头推到能开发" | A-F 六条链路，每步交接 |

分不清看一句话：要的是一个结论，还是一份能交出去的东西。

### 你手上已经有东西

这是它和"AI 写作工具"最大的区别：先说清手里是什么，它先读再问。

| 手上有 | 给你什么 |
|---|---|
| 访谈录音、笔记 | 机会清单 + 该问却没问到的问题 |
| 竞品官网、截图、财报 | 对比表 + 跟不跟的结论 |
| 一句"我想做个 XX" | 做不做的判断 + 下一步 |
| 已经写好的 PRD | 打分，不重写 |
| 需求清单 | 排序 + 建议砍掉的名单 |
| 数据报表 | 结论 + 可能原因 + 怎么验证 |
| 上线计划 | 风险清单 + 阻断项 + 兜底 |
| 差评、投诉截图 | 归类 + 影响面 + 改不改 |
| 立项申请 | 缺口 + 该不该上会 |
| 只有一个 deadline | 最小可交付范围 |

材料不够会直接报缺什么，不拿通用话术糊上。

### 六条链路

| 链路 | 什么时候用 | 走哪几步 |
|---|---|---|
| A 想法到能开发 | 有个新想法要落地 | 需求体检 → PRD → 评审 → 改 → 埋点 |
| B 版本规划 | 需求一堆，不知道先做哪个 | 需求池 → 排序 → 路线图 |
| C 数据掉了 | 留存、转化下坡 | 看数 → 归因 → 实验 → 埋点 → 复盘 |
| D 做一轮调研 | 想知道用户到底怎么想 | 目标 → 校正问题 → 问卷/访谈 → 分析 → 转需求 |
| E 竞品驱动立项 | 竞品做了个东西，要不要跟 | 竞品拆解 → 该不该跟 → 接 A |
| F 上线前自查 | 明天就发 | Pre-mortem → 走查 → 埋点核验 → 灰度 |

硬规则只有一条：上一步的产出必须是下一步的合法输入。接不上，说明这一步没做完。

开始前会先报价：几步、每步交什么、哪几步要你拍板。每步交接不超过 10 行，随时能停，停下来不是半成品。

### 六个视角轮流挑刺

| 视角 | 盯什么 |
|---|---|
| 产品 | 目标清不清楚、范围有没有蔓延、值不值 |
| 研发 | 能不能做、接口清不清、要多久 |
| 测试 | 怎么验、异常路径、边界在哪 |
| 设计 | 交互一致、空状态、有没有反馈 |
| 运营 | 埋点、灰度、回滚 |
| 法务 | 隐私、合规、内容审核 |

按 阻断 / 重要 / 建议 三级分，结论三档：能上、有条件能上、不能上。

值钱的不是结论，是**分歧**。两个视角判断相反的地方单独拎出来，那才是会上要吵的事。

### 也能给你的东西打分

拿着写好的东西问"这样行不行"，它不重写，先打分。每项 0-3 分，有一项 0 分直接判不能发。

| 手上是什么 | 查什么 |
|---|---|
| PRD | 问题定义、目标与验收、范围边界、依赖与风险、埋点 |
| 竞品分析 | 结论先行、证据可查、差距量化、动作建议 |
| 数据复盘 | 假设明确、口径一致、归因分层、下一步具体 |
| 立项申请 | 市场判断、模型可信、资源匹配、风险与退出条件 |
| 访谈记录 | 样本交代、原声摘录、聚类有据、机会可验 |
| 上线计划 | 灰度规则、回滚条件、责任到人、指标观测 |

结论只有三档：能发 / 补两处再发 / 重写。能发就说能发，挑刺挑多了下次没人找你。

---

## 安装

```bash
npm i -g @itxinfei/pm-ai-skill && pm-ai-skill install
```

npm 慢或者打不开，用下面任意一种：

| 方式 | 命令 |
|---|---|
| Windows 脚本 | `irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 \| iex` |
| macOS / Linux | `curl -fsSL https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.sh \| bash` |
| 发行包 | 下 [最新 zip](https://github.com/itxinfei/pm-ai-skill/releases/latest)，解压后 `node bin/index.js install` |

两个脚本会先扫你装了哪些工具，有几个装几个。连 Node 都没有：把 `skill-source/` 改名成 `pm-ai-skill/`，手动丢进对应目录，效果一样。

一份配置，这些工具都能用：

| 国产 | 国外 | 通用 |
|---|---|---|
| WorkBuddy、TraeCode CN、Trae、豆包 | Claude Code、Codex、Gemini CLI、Cursor、Windsurf、Kiro、OpenCode、Continue | Cline、Roo Code 等 `.agents/skills` |

或者干脆不装：把 [system-prompt.md](skill-source/system-prompt.md) 粘到任何 AI 的系统提示词里就能用。

---

## 76 个模块

<details>
<summary>点开看完整清单（十类，76 个）</summary>

### 需求发现与优先级

| 模块 | 干什么用 |
|---|---|
| RICE | Reach × Impact × Confidence ÷ Effort，量化排序 |
| MoSCoW | Must / Should / Could / Won't，砍 MVP 范围 |
| Kano | 基本型 / 期望型 / 兴奋型，判断哪些是惊喜 |
| Impact-Effort | 四象限，找快赢和大项目 |
| JTBD | 用户为什么用你的产品，找切换动力 |
| Working Backwards | 从新闻稿倒推功能 |
| 需求澄清 5 问 | 先问清楚为什么做，再谈做什么 |
| 访谈解析 | 从访谈记录里提取痛点、爽点、痒点 |

### 用户调研

| 模块 | 干什么用 |
|---|---|
| 用户分层 | 新用户/老用户、付费/免费，不同人群不同方案 |
| 问卷设计 | 15 题以内，避开引导性问题 |
| 深度访谈 | 探索/验证两种模式，30 分钟四段结构 |
| 可用性测试 | 完成率、时长、错误数、SUS 评分 |
| A/B 测试 | 假设、样本量、统计显著性、止损条件 |
| NPS / CSAT / CES | 满意度调研、分数解读、改进闭环 |
| 焦点小组 | 招募、提纲、讨论规则 |
| 日记研究 | 连续记录，捕捉真实场景痛点 |
| 卡片分类 | 信息架构验证 |
| 反馈聚类 | 按主题分组、严重度分级 |
| 行为数据分析 | 埋点、漏斗、留存、路径 |

### 竞品与市场

| 模块 | 干什么用 |
|---|---|
| 机会解决方案树 | 结果→机会→方案→实验，别上来就想功能 |
| 竞品分析 | 定位象限、功能对比、用户情绪 |
| 市场空白 | 找没被满足的细分人群和场景 |
| 切换动力 | 用户为什么从竞品切过来 |
| TAM / SAM / SOM | 市场规模估算，给区间不给精确数字 |
| 竞品功能拆解 | 标配 / 差异化 / 过度设计 |
| 产品定位 | 一句话说清楚我们是谁、有什么不一样 |
| 战略分析三件套 | SWOT + PESTLE + 波特五力 |
| 厂商/供应商调研 | 找候选、初筛、演示、POC、选型报告 |

### 策略与规划

| 模块 | 干什么用 |
|---|---|
| 产品愿景 | 长期方向，不写具体功能 |
| 项目立项完整流程 | 问题定义→调研→方案→测算→风险→决策，8 步 |
| OKR | Objective 定性有挑战，KR 可量化 |
| 路线图 | Now / Next / Later，分季度排 |
| Sprint 规划 | 双周迭代，Story Point、容量、依赖 |
| 赌注评估 | 预期回报、成功概率、失败代价 |
| 商业模式画布 | 苏格拉底追问，揪出未验证假设 |
| 北极星指标 | 一个指标代表核心价值 |

### 方案设计

| 模块 | 干什么用 |
|---|---|
| 产品架构 | 表现层/业务层/数据层，拆 MVP |
| User Story | As a... I want... So that...，带验收标准 |
| 用户旅程地图 | 阶段、触点、情绪、痛点、机会点 |
| 思维导图 | 梳理逻辑，查冲突 |
| 故事板 | 6 格叙事，早期概念验证 |
| 画图实操指南 | 流程图/架构图/信息架构/数据流程图，具体怎么画 |
| Excalidraw 输出 | 生成可直接粘贴的绘图结构描述 |

### 文档输出

| 模块 | 干什么用 |
|---|---|
| PRD | 背景、目标、用户故事、功能、验收、埋点、风险 |
| 业务案例一页纸 | 给高管看的，一页讲清楚值不值得做 |
| 发布说明 | 用户视角，不写技术术语 |
| 功能规格说明 | 前置条件、主流程、异常流程 |
| 需求评审准备 | 评审前怎么准备、评审中怎么讲 |

### 协作沟通

| 模块 | 干什么用 |
|---|---|
| 会议纪要 | 决策、行动项、负责人、deadline |
| 干系人地图 | 影响力×关注度，不同人不同沟通方式 |
| Pre-mortem 预先分析 | 假设上线失败了，倒推原因 |
| 风险与延期沟通 | 坏消息早说，讲清楚原因和补救方案 |
| 问题追踪与升级 | issue 表、升级邮件 |
| 销售赋能 | 话术、竞品 FAQ、异议处理 |
| 增长飞轮 | 循环式增长，获取→使用→产生价值→再带来用户 |
| 用户画像 | 做 2-3 个具体的人，不是人口统计标签 |
| 和开发对齐 | 怎么沟通不吵架，怎么找替代方案 |

### 数据与度量

| 模块 | 干什么用 |
|---|---|
| 数据分析 | CSV 清洗、趋势、异常检测、业务解读 |
| 指标层级 | 北极星→一级→二级→护栏指标 |
| HEART 框架 | 谷歌用户体验度量，5 个维度 |
| AI 产品度量 | 准确率、人工接管率、成本、留存 |
| RICE 复盘 | 上线后回看估算，校准下一轮 |
| PMF | Sean Ellis 测试，判断产品市场契合度 |
| 延迟成本 | 晚做一个月损失多少，优先级怎么排 |

### 商用与增长

| 模块 | 干什么用 |
|---|---|
| 定价策略 | Freemium/订阅/按量/分层，多方案对比 |
| AARRR | 获取→激活→留存→变现→推荐，找瓶颈 |
| RARRA | 从留存反推优先级 |
| 单位经济模型 | LTV、CAC、回本周期、毛利率 |
| GTM 上市策略 | 目标人群、渠道、定价、冷启动 |
| 客户成功 | 健康分、流失预警、续费话术 |
| 项目复盘 | 六段法，沉淀经验 |

### 自我迭代与成长

| 模块 | 干什么用 |
|---|---|
| 反馈学习 | 每次输出后问哪里需要调整，分类记录 |
| 个人案例库 | 沉淀项目经验，下次类似场景自动调用 |
| 成长追踪 | 记录用了哪些模块，推荐下一步学什么 |
| 错误复盘 | 找根因，不只改这一次，还要下次避免 |
| 提示词自我优化 | 根据反馈调整 system-prompt，先问再改 |

</details>

---

## 用法

不用记命令，说人话。

```
用 RICE 排一下这几个需求，再用 MoSCoW 砍 MVP
这份访谈记录你帮我看看，能提炼出什么
这份 PRD 你打个分，能不能进评审
我们要做个新项目，帮我走一遍立项流程
```

92 条可复制的提问模板：[提示词库](docs/prompt-reference.md)。

### 另外两件事

**出报告**。不止 Markdown，还有三个单文件 HTML 模板，双击能看，能打印成 PDF。

```bash
pm-ai-skill asset report     # 汇报页：结论、指标、进度、风险
pm-ai-skill asset review     # 评审页：六视角评分、问题分级、分歧点
pm-ai-skill asset grade      # 打分页：结论三档、维度分数、必须补的几处
```

**给脚本用**。`pm-ai-skill manifest` 导出 76 个模块的 id、分类、标题、定义，做检索或自己的小工具都行，不用解析 prompt。

### 目录

```
skill-source/    system-prompt.md（核心）+ manifest.json + triggers.md
docs/            能力清单、92 条提示词、工作流、工具速查、同类盘点、FAQ
templates/       13 个模板，能直接抄
examples/        10 份真实样例，看"做成什么样算合格"
assets/          3 个 HTML 报告模板
evals/           行为回归用例，改完拿它验有没有改坏
bin/index.js     install / template / example / doc / asset / manifest / info
```

---

## 它做不到什么

- **不给数字结论**。市场多大、能涨几个点，得你自己算。它给算法和拆解方式。
- **不替你做决策**。给依据和风险清单，拍板的是你。
- **不保证输出对**。AI 可能拿着错的前提给出很合理的答案。涉及钱、法务、安全，必须人工复核。
- **不替代一手信息**。用户怎么想、客户真实反馈，它猜不出来。没有就标成假设。
- **不懂你的公司**。组织政治、历史包袱，它不知道。方案落不了地，先想想是不是这些原因。
- **不写生产代码**。能画原型、能给接口约定，写不了代码。
- **不覆盖**：定价模型落地、投放策略、算法选型、特定行业合规、B 端复杂销售链路。

---

<div align="center">

MIT License · itxinfei（心飞为你飞）

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill)

</div>
