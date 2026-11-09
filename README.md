<div align="center">

# pm-ai-skill

产品经理干活用的 AI 助手，不是教科书。

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei%20%E0%B8%83%E5%BF%83%E9%A3%9E%E4%B8%BA%E4%BD%A0%E9%A3%9E-orange.svg?style=flat-square)](https://gitee.com/itxinfei)
[![npm version](https://img.shields.io/npm/v/@itxinfei/pm-ai-skill.svg?style=flat-square)](https://www.npmjs.com/package/@itxinfei/pm-ai-skill)
[![Platform](https://img.shields.io/badge/Platform-13%20%2B%20AI%20Tools-brightgreen.svg?style=flat-square)](#支持的工具)

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill) · [提示词库](docs/prompt-reference.md) · [工作流](docs/workflow-guide.md)

作者：itxinfei（心飞为你飞）

[English](README_EN.md)

</div>

---

## 安装

四种方式，看你方便。

### npm

```bash
npm i -g @itxinfei/pm-ai-skill
pm-ai-skill install
```

国内 npm 慢的话，用下面的方式。

### Windows 一键脚本

```powershell
irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex
```

### macOS / Linux 一键脚本

```bash
curl -fsSL https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.sh | bash
```

脚本自动检测你装了哪些工具，有几个装几个。

### 支持的工具

| 类型 | 工具 | 全局 skills 目录 |
|---|---|---|
| 国产 | WorkBuddy | `%APPDATA%\WorkBuddy\skills` / `~/.workbuddy/skills` |
| 国产 | TraeCode CN | `~/.trae-cn/skills` |
| 国产 | Trae | `~/.trae/skills` |
| 国产 | 豆包 | `~/.agents/skills` |
| 国外 | Claude Code | `~/.claude/skills` |
| 国外 | Codex | `~/.codex/skills` |
| 国外 | Gemini CLI | `~/.gemini/skills` |
| 国外 | Cursor | `~/.cursor/skills` |
| 国外 | Windsurf | `~/.codeium/windsurf/skills` |
| 国外 | Kiro | `~/.kiro/skills` |
| 国外 | OpenCode | `~/.opencode/skills` |
| 国外 | Continue | `~/.continue/skills` |
| 通用 | Cline / Roo Code 等 | `~/.agents/skills` |

什么都没检测到的话，文件会放到 `~/.agents/skills` 和当前目录，自己手动拷。

### 手动下载 zip

1. 下载：<https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip>
2. 解压
3. 把 `skill-source/` 改名 `pm-ai-skill/`
4. 放到对应工具的 skills 目录下

### 直接复制

不想装东西？打开 [skill-source/system-prompt.md](skill-source/system-prompt.md)，把内容复制到 ChatGPT / Claude / 豆包的系统提示词里，就能用。

---

## 能力矩阵

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

RICE、MoSCoW、Impact-Effort 三个不冲突，看场景选：要算分用 RICE，要定边界用 MoSCoW，要快速脑暴用 Impact-Effort。

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
| 北极星指标 | 一个指标代表核心价值 |
| 商业模式画布 | 苏格拉底追问，揪出未验证假设 |

### 方案设计

| 模块 | 干什么用 |
|---|---|
| 产品架构 | 表现层/业务层/数据层，拆 MVP |
| User Story | As a... I want... So that...，带验收标准 |
| 用户旅程地图 | 阶段、触点、情绪、痛点、机会点 |
| 思维导图 | 梳理逻辑，查冲突 |
| 故事板 | 6 格叙事，早期概念验证 |
| 画图实操指南 | 流程图/架构图/信息架构/数据流程图，具体怎么画 |

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
| 增长飞轮 | 循环式增长，比线性漏斗可持续 |
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

---

## 怎么用

不用记命令，直接说人话就行。比如：

```
用 RICE 排一下这几个需求，再用 MoSCoW 砍 MVP
```

```
帮我设计可用性测试，任务是完成支付
```

```
我们要做个新项目，帮我走一遍立项流程
```

```
帮我写产品定位，对比竞品说清楚我们有什么不一样
```

更多例子看 [提示词库](docs/prompt-reference.md)。

---

## 目录结构

```
pm-ai-skill/
├── install.ps1
├── skill-source/
│   ├── skill.json
│   ├── system-prompt.md
│   └── triggers.md
├── templates/
├── docs/
└── examples/
```

templates 里有 7 个模板，examples 里有 4 个脱敏示例，都是能直接用的。

---

## 一些提醒

- 这是辅助工具，不替你做业务判断。AI 输出的数字、竞品信息，自己核一遍。
- User Story 必须带验收标准，业务案例必须有一句话决策建议，A/B 测试必须有止损条件。
- 定价策略至少给两个方案对比，TAM/SAM/SOM 给区间不给精确数字。
- 多个框架都适用时，会说清楚各自的适用场景，不会硬套。
- 每次输出完会问你哪里需要调整，你反馈越多，它越懂你。
- 案例和示例都是脱敏的，不记录敏感数据。

有问题提 Issue，想补模板或案例提 PR。

---

<div align="center">

MIT License · itxinfei（心飞为你飞）

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill)

</div>
