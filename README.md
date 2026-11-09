<div align="center">

# 🚀 pm-ai-skill

**产品经理全链路 AI 工作流 · 20 年实战经验提炼 · 从每天日常到项目全流程全覆盖**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei%20%E0%B8%83%E5%BF%83%E9%A3%9E%E4%B8%BA%E4%BD%A0%E9%A3%9E-orange.svg?style=flat-square)](https://gitee.com/itxinfei)
[![npm version](https://img.shields.io/npm/v/@itxinfei/pm-ai-skill.svg?style=flat-square)](https://www.npmjs.com/package/@itxinfei/pm-ai-skill)
[![npm downloads](https://img.shields.io/npm/dm/@itxinfei/pm-ai-skill.svg?style=flat-square)](https://www.npmjs.com/package/@itxinfei/pm-ai-skill)
[![Platform](https://img.shields.io/badge/Platform-WorkBuddy%20%7C%20ChatGPT%20%7C%20Claude-brightgreen.svg?style=flat-square)](#)
[![Modules](https://img.shields.io/badge/Modules-65-red.svg?style=flat-square)](#能力矩阵)

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill) · [提示词库](docs/prompt-reference.md) · [工作流](docs/workflow-guide.md)

**作者：itxinfei（心飞为你飞）**

</div>

---

## 📦 安装

四种方式，任选一种。

### 方式一：npm 安装

```bash
npm i -g @itxinfei/pm-ai-skill
pm-ai-skill install
```

> 国内如果 npm 访问慢，用下面的 Gitee 方式。

### 方式二：Windows 一键脚本

```powershell
irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex
```

脚本自动找到 WorkBuddy 的 skills 目录，把 `pm-ai-skill` 放进去。找不到就释放到当前目录，手动拷一下。

### 方式三：手动下载 zip

1. 下载：<https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip>
2. 解压
3. 把 `skill-source/` 改名 `pm-ai-skill/`
4. 丢进 WorkBuddy skills 目录（通常 `~/.workbuddy/skills/` 或 `%APPDATA%\WorkBuddy\skills\`）

### 方式四：直接复制提示词（最简单）

不想装？直接打开 [skill-source/system-prompt.md](skill-source/system-prompt.md)，把内容复制粘贴到 ChatGPT / Claude / 豆包的系统提示词里，就能用全部 57 个能力。

---

## 🎯 能力矩阵

### 🔍 需求发现与优先级（7 个）

| 模块 | 你能干嘛 |
|---|---|
| RICE 优先级 | 量化需求排序，Reach × Impact × Confidence ÷ Effort |
| MoSCoW 优先级 | Must / Should / Could / Won't，砍 MVP 范围 |
| Kano 模型 | 基本型 / 期望型 / 兴奋型，判断哪些是惊喜 |
| Impact-Effort 矩阵 | 四象限可视化，找快赢和大项目 |
| JTBD 分析 | 用户为什么"雇佣"你的产品，找切换动力 |
| Working Backwards | 从新闻稿倒推功能清单 |
| 访谈解析 | 从访谈文本提取痛点 / 爽点 / 痒点 |

> 💡 RICE / MoSCoW / Impact-Effort 三个框架互补：RICE 算分，MoSCoW 定边界，Impact-Effort 可视化。

### 👥 用户调研（10 个）

| 模块 | 你能干嘛 |
|---|---|
| 问卷设计 | 15 题以内，避开引导性问题，样本量估算 |
| 深度访谈脚本 | 探索 / 验证两种模式，30 分钟四段结构，含 5 Why 追问 |
| 可用性测试 | 测试任务设计、完成率 / 时长 / 错误数 / SUS 评分 |
| A/B 测试设计 | 假设、变量、样本量、统计显著性、止损条件 |
| NPS / CSAT / CES | 满意度调研设计、分数解读、改进闭环 |
| 焦点小组 | 招募条件、主持人提纲、讨论规则 |
| 日记研究 | 连续记录行为和感受，捕捉真实场景痛点 |
| 卡片分类 | 信息架构验证，分组结果解读 |
| 反馈聚类 | 功能建议 / Bug / UI/UX / 价格 / 赞美吐槽，严重度分级 |
| 行为数据分析 | 埋点方案、漏斗分析、留存曲线、路径分析 |

### 🏢 竞品与市场（6 个）

| 模块 | 你能干嘛 |
|---|---|
| 竞品分析 | 定位象限、功能对比、定价带、用户情绪 |
| 市场空白 | 找出未被满足的细分人群和场景 |
| 切换动力 | 用户为什么从竞品切过来 |
| TAM / SAM / SOM | 市场规模估算，自下而上 / 自上而下两种方法 |
| 竞品功能拆解 | 逐功能对比，识别标配 / 差异化 / 过度设计 |
| 产品定位 | 一句话定位声明，说出我们的唯一价值 |

### 🧭 策略与规划（6 个）

| 模块 | 你能干嘛 |
|---|---|
| 产品愿景 | 长期方向声明，不写功能，写"让谁的什么生活变什么样" |
| OKR 制定 | Objective 定性有挑战，Key Results 可量化 |
| 路线图规划 | Now / Next / Later 分季排 |
| Sprint 迭代规划 | 季度目标拆双周迭代，Story Point、容量、依赖 |
| 赌注评估 | 预期回报、成功概率、失败代价、最大损失 |
| 商业模式画布 | 苏格拉底追问，揪出未验证假设 |

### 📐 方案设计（5 个）

| 模块 | 你能干嘛 |
|---|---|
| 产品架构 | 表现层 / 业务层 / 数据层分层，拆 MVP |
| User Story 拆分 | As a... I want... So that...，带 Given-When-Then 验收标准 |
| 思维导图 | 大纲转结构，查逻辑冲突 |
| 故事板 | 6 格叙事故事板，早期概念验证 |
| Excalidraw 绘图 | 痛点场景、价值主张、功能架构、用户旅程 |

### 📝 文档输出（4 个）

| 模块 | 你能干嘛 |
|---|---|
| PRD 教练 | 强制填业务目标、成功指标、回退条件 |
| 业务案例一页纸 | 给高管看的 business case，300 字决策建议 |
| 发布说明 | 用户视角的更新文案，不写技术术语 |
| 功能规格说明 | 前置条件、主流程、异常流程、验收标准 |

### 🤝 协作沟通（4 个）

| 模块 | 你能干嘛 |
|---|---|
| 会议纪要 | 决策、行动项、负责人、deadline |
| 风险与延期沟通 | 给老板和客户的沟通文案 |
| 问题追踪与升级 | issue 追踪表、升级邮件模板 |
| 销售赋能 | 销售话术、竞品 FAQ、异议处理、Demo 脚本 |

### 📊 数据与度量（3 个）

| 模块 | 你能干嘛 |
|---|---|
| 数据分析 | CSV 清洗、趋势、异常检测、业务解读 |
| AI 产品度量 | AI 功能的效果 / 体验 / 业务 / 成本指标 |
| RICE 复盘 | 上线后回看当初估算，校准下一轮 |

### 💰 商用与增长（7 个）

| 模块 | 你能干嘛 |
|---|---|
| 定价策略 | Freemium / 订阅 / 按量 / 分层 / 渗透 / 撇脂，多方案对比 |
| AARRR 漏斗 | 获取 → 激活 → 留存 → 变现 → 推荐，找瓶颈 |
| RARRA 留存优先 | 从留存反推产品优先级 |
| 单位经济模型 | LTV / CAC / 回本周期 / 毛利率 |
| GTM 上市策略 | 目标人群、渠道、定价、首发节奏、冷启动 |
| 客户成功与续费 | 健康分模型、流失预警、续费话术、增购路径 |
| 项目复盘六段法 | 背景、角色、决策、推演、结果、方法论 |

> 💡 AARRR 和 RARRA 互补：AARRR 从获客出发，RARRA 从留存出发，适合不同阶段的产品。

### 🌱 自我迭代与成长（5 个）

| 模块 | 你能干嘛 |
|---|---|
| 使用反馈学习 | 每次输出后主动问哪里需要调整，记录反馈，越用越懂你 |
| 个人案例库 | 把你的项目、决策、结果沉淀成案例卡，下次类似场景自动调用 |
| 能力成长追踪 | 记录你用得多和没用过的模块，推荐下一步学习路径 |
| 错误复盘 | 你说"不对"时，追问根因，不只改这一次，还要下次避免 |
| 提示词自我优化 | 根据你的反馈，建议调整 system-prompt 的侧重点 |

> 💡 这不是一次性工具，是越用越懂你的工作伙伴。你反馈越多，它输出越准。

---

## 💬 直接说人话就行

装完不用记命令，在对话里直接说：

```
用 RICE 排一下这几个需求，再用 MoSCoW 砍 MVP 范围
```

```
帮我设计一个可用性测试方案，测试任务是完成支付
```

```
设计一个 A/B 测试，假设是新版注册流程能提升转化率
```

```
帮我写一句话产品定位声明，对比竞品说出我们的唯一价值
```

```
帮我们写产品愿景声明，不写具体功能
```

```
帮我制定季度 OKR，Objective 要定性有挑战，KR 要可量化
```

```
评估这个项目的赌注大小：预期回报、成功概率、失败代价
```

```
我们的产品是 XX，帮我设计定价策略，对比 Freemium / 订阅 / 分层三种方案
```

```
用 AARRR 漏斗分析我们的产品，当前数据是获取 10000、激活 3000、留存 1500、变现 300
```

```
帮我建一个 issue 追踪表，再写一封给干系人的升级邮件
```

完整提示词库 → [docs/prompt-reference.md](docs/prompt-reference.md)

---

## 🗺️ 工作流

```
想法 ──▶ 需求发现 ──▶ 用户调研 ──▶ 竞品市场 ──▶ 策略规划
 │          │            │            │            │
 │          ▼            ▼            ▼            ▼
 │       RICE/MoSCoW   问卷/访谈     定位象限     产品愿景
 │       Kano/Impact   可用性测试     TAM/SOM      OKR
 │       JTBD          A/B 测试       切换动力     路线图
 │       Working       NPS/焦点小组   功能拆解     Sprint
 │       Backwards     日记研究                   赌注评估
 │                     卡片分类                   商业模式
 │                     行为分析
 │          │            │            │            │
 │          └────────────┴────────────┴────────────┘
 │                                    │
 │                                    ▼
 │                              方案设计（产品架构 / User Story / 故事板 / Excalidraw）
 │                                    │
 │                                    ▼
 │                              文档输出（PRD / 业务案例 / 发布说明）
 │                                    │
 │                                    ▼
 │                              协作沟通（会议纪要 / 风险沟通 / 问题追踪 / 销售赋能）
 │                                    │
 │                                    ▼
 │                              上线 ──▶ 数据度量 ──▶ 商用增长
 │                                    │       │           │
 │                                    │       ▼           ▼
 │                                    │    数据分析    定价策略
 │                                    │    AI 度量     AARRR/RARRA
 │                                    │    RICE 复盘   单位经济
 │                                    │                GTM 上市
 │                                    │                客户成功
 │                                    ▼
 │                              项目复盘六段法
 │                                    │
 │                                    ▼
 │                              自我迭代与成长
 │                              （反馈学习 / 案例库 / 成长追踪 / 错误复盘 / 提示词优化）
 │
 └──── 苏格拉底商业模式画布（贯穿始终）
```

---

## 📁 目录结构

```
pm-ai-skill/
├── install.ps1              # Windows 一键安装脚本
├── skill-source/            # WorkBuddy 读的源文件（直接复制这里就能用）
│   ├── skill.json
│   ├── system-prompt.md     # 57 个模块的系统提示词
│   └── triggers.md          # 触发指令清单
├── templates/               # 可直接复用的模板
│   ├── prd-template.md
│   ├── meeting-minutes-template.md
│   ├── interview-script-sample.md
│   ├── business-model-checklist.md
│   ├── competitor-analysis-template.md
│   ├── roadmap-template.md
│   └── retrospective-template.md
├── docs/                    # 文档
│   ├── capability.md
│   ├── prompt-reference.md
│   ├── workflow-guide.md
│   └── faq.md
└── examples/                # 脱敏示例
    ├── prd-example.md
    ├── rice-priority-example.md
    ├── competitor-analysis-sample.md
    └── mindmap-sample.md
```

---

## ⚠️ 几点说明

- 这是辅助工具，不替你做业务判断。AI 输出的数字、竞品信息、用户反馈，自己核。
- 输出 User Story 必须带验收标准，输出 Business Case 必须带一句话决策建议——这是硬约束。
- 输出 A/B 测试必须包含止损条件和统计显著性判断。
- 输出定价策略必须给至少 2 个方案对比，不能只推荐一种。
- 输出 TAM/SAM/SOM 必须标注假设来源和置信度，不能给精确数字。
- 输出优先级时，如果同时适用多个框架（RICE / MoSCoW / Impact-Effort），说明各自适用场景。
- 输出 OKR 时，Objective 定性有挑战，Key Results 可量化，不能把 KR 写成任务清单。
- 每次输出后会主动问"哪里需要调整"，你反馈越多，它越懂你。
- 积累案例时会脱敏，不记录敏感业务数据。
- 模板和示例都是脱敏的，直接用。
- 有问题提 Issue，想补模板或案例提 PR。

---

<div align="center">

**MIT License** · Built by **itxinfei（心飞为你飞）**

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill)

</div>
