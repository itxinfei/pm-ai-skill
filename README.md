<div align="center">

# 🚀 pm-ai-skill

**产品经理全链路 AI 工作流 · 一个 Skill 覆盖从想法到复盘**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei%20%E0%B8%83%E5%BF%83%E9%A3%9E%E4%B8%BA%E4%BD%A0%E9%A3%9E-orange.svg?style=flat-square)](https://gitee.com/itxinfei)
[![Platform](https://img.shields.io/badge/Platform-WorkBuddy%20%7C%20ChatGPT%20%7C%20Claude-brightgreen.svg?style=flat-square)](#)
[![Modules](https://img.shields.io/badge/Modules-42-red.svg?style=flat-square)](#能力矩阵)

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill) · [提示词库](docs/prompt-reference.md) · [工作流](docs/workflow-guide.md)

**作者：itxinfei（心飞为你飞）**

</div>

---

## 📦 安装

### Windows（一键脚本）

```powershell
irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex
```

脚本自动找到 WorkBuddy 的 skills 目录，把 `pm-ai-skill` 放进去。找不到就释放到当前目录，手动拷一下。

### 手动安装

1. 下载 zip：<https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip>
2. 解压
3. 把 `skill-source/` 改名 `pm-ai-skill/`
4. 丢进 WorkBuddy skills 目录（通常 `~/.workbuddy/skills/` 或 `%APPDATA%\WorkBuddy\skills\`）

### npm（可选）

```bash
npm i -g pm-ai-skill
pm-ai-skill install
```

---

## 🎯 能力矩阵

### 🔍 需求发现（5 个）

| 模块 | 你能干嘛 |
|---|---|
| RICE 优先级 | 丢需求列表进来，出得分和排序 |
| Kano 模型 | 把需求分基本型 / 期望型 / 兴奋型，判断哪些是惊喜 |
| JTBD 分析 | 用户为什么"雇佣"你的产品，找切换动力 |
| Working Backwards | 从新闻稿倒推功能清单 |
| 访谈解析 | 从访谈文本提取痛点 / 爽点 / 痒点 |

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
| 反馈聚类 | 用户反馈分组、情感分析、严重度分级 |
| 行为数据分析 | 埋点方案、漏斗分析、留存曲线、路径分析 |

### 🏢 竞品与市场（5 个）

| 模块 | 你能干嘛 |
|---|---|
| 竞品分析 | 定位象限、功能对比、定价带、用户情绪 |
| 市场空白 | 找出未被满足的细分人群和场景 |
| 切换动力 | 用户为什么从竞品切过来 |
| TAM / SAM / SOM | 市场规模估算，自下而上 / 自上而下两种方法 |
| 竞品功能拆解 | 逐功能对比，识别标配 / 差异化 / 过度设计 |

### 📐 方案设计（4 个）

| 模块 | 你能干嘛 |
|---|---|
| 产品架构 | 表现层 / 业务层 / 数据层分层，拆 MVP |
| User Story 拆分 | As a... I want... So that...，带 Given-When-Then 验收标准 |
| 思维导图 | 大纲转结构，查逻辑冲突 |
| Excalidraw 绘图 | 痛点场景、价值主张、功能架构、用户旅程 |

### 📝 文档输出（4 个）

| 模块 | 你能干嘛 |
|---|---|
| PRD 教练 | 强制填业务目标、成功指标、回退条件 |
| 业务案例一页纸 | 给高管看的 business case，300 字决策建议 |
| 发布说明 | 用户视角的更新文案，不写技术术语 |
| 功能规格说明 | 前置条件、主流程、异常流程、验收标准 |

### 🤝 协作沟通（2 个）

| 模块 | 你能干嘛 |
|---|---|
| 会议纪要 | 决策、行动项、负责人、deadline |
| 风险与延期沟通 | 给老板和客户的沟通文案 |

### 📊 数据与度量（3 个）

| 模块 | 你能干嘛 |
|---|---|
| 数据分析 | CSV 清洗、趋势、异常检测、业务解读 |
| AI 产品度量 | AI 功能的效果 / 体验 / 业务 / 成本指标 |
| RICE 复盘 | 上线后回看当初估算，校准下一轮 |

### 💰 商用与增长（9 个）

| 模块 | 你能干嘛 |
|---|---|
| 商业模式画布 | 苏格拉底追问，揪出未验证假设 |
| 定价策略 | Freemium / 订阅 / 按量 / 分层 / 渗透 / 撇脂，多方案对比 |
| AARRR 漏斗 | 获取 → 激活 → 留存 → 变现 → 推荐，找瓶颈 |
| RARRA 留存优先 | 从留存反推产品优先级 |
| 单位经济模型 | LTV / CAC / 回本周期 / 毛利率，判断模式跑不跑得通 |
| GTM 上市策略 | 目标人群、渠道、定价、首发节奏、冷启动 |
| 客户成功与续费 | 健康分模型、流失预警、续费话术、增购路径 |
| 路线图规划 | Now / Next / Later 分季排 |
| 项目复盘六段法 | 背景、角色、决策、推演、结果、方法论 |

---

## 💬 直接说人话就行

装完不用记命令，在对话里直接说：

```
用 RICE 排一下这几个需求：xxx
```

```
帮我设计一个可用性测试方案，测试任务是完成支付
```

```
设计一个 A/B 测试，假设是新版注册流程能提升转化率
```

```
估算企业级客服 SaaS 的 TAM/SAM/SOM
```

```
我们的产品是 XX，帮我设计定价策略，对比 Freemium / 订阅 / 分层三种方案
```

```
用 AARRR 漏斗分析我们的产品，当前数据是获取 10000、激活 3000、留存 1500、变现 300
```

```
计算单位经济模型：LTV、CAC、回本周期
```

```
项目要延期 2 周，帮我写沟通文案
```

完整提示词库 → [docs/prompt-reference.md](docs/prompt-reference.md)

---

## 🗺️ 工作流

```
想法 ──▶ 需求发现 ──▶ 用户调研 ──▶ 竞品市场 ──▶ 方案设计 ──▶ 文档输出
 │          │            │            │            │            │
 │          ▼            ▼            ▼            ▼            ▼
 │       RICE/Kano     问卷/访谈     定位象限     产品架构     PRD
 │       JTBD          可用性测试     TAM/SOM      User Story   业务案例
 │       Working       A/B 测试       切换动力     思维导图     发布说明
 │       Backwards     NPS/NPS/CES    功能拆解     Excalidraw
 │                     日记研究
 │                     卡片分类
 │                     行为分析
 │          │            │            │            │            │
 │          └────────────┴────────────┴────────────┴────────────┘
 │                                    │
 │                                    ▼
 │                              协作沟通（会议纪要 / 风险沟通）
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
 │
 └──── 苏格拉底商业模式画布（贯穿始终）
```

---

## 📁 目录结构

```
pm-ai-skill/
├── install.ps1              # Windows 一键安装脚本
├── bin/                     # CLI（npm 方式）
│   └── index.js
├── skill-source/            # WorkBuddy 读的源文件
│   ├── skill.json
│   ├── system-prompt.md     # 42 个模块的系统提示词
│   └── triggers.md          # 触发指令清单
├── templates/               # 可直接复用的模板
│   ├── prd-template.md
│   ├── meeting-minutes-template.md
│   ├── interview-script-sample.md
│   └── business-model-checklist.md
├── docs/                    # 文档
│   ├── capability.md
│   ├── prompt-reference.md
│   ├── workflow-guide.md
│   └── faq.md
└── examples/                # 脱敏示例
    ├── rice-priority-example.md
    ├── competitor-analysis-sample.md
    └── mindmap-sample.md
```

---

## ⚡ CLI 命令（npm 安装后）

```bash
pm-ai-skill install           # 装到 WorkBuddy
pm-ai-skill export-zip        # 导出 zip 包
pm-ai-skill template prd      # 看 PRD 模板
pm-ai-skill template meeting  # 看会议纪要模板
pm-ai-skill template interview
pm-ai-skill template bmc
pm-ai-skill doc capability     # 看能力清单
pm-ai-skill doc prompt         # 看提示词库
pm-ai-skill doc workflow      # 看工作流
pm-ai-skill doc faq
pm-ai-skill example rice      # 看 RICE 示例
pm-ai-skill example competitor
pm-ai-skill example mindmap
```

---

## ⚠️ 几点说明

- 这是辅助工具，不替你做业务判断。AI 输出的数字、竞品信息、用户反馈，自己核。
- 输出 User Story 必须带验收标准，输出 Business Case 必须带一句话决策建议——这是硬约束。
- 输出 A/B 测试必须包含止损条件和统计显著性判断。
- 输出定价策略必须给至少 2 个方案对比，不能只推荐一种。
- 输出 TAM/SAM/SOM 必须标注假设来源和置信度，不能给精确数字。
- 模板和示例都是脱敏的，直接用。
- 有问题提 Issue，想补模板或案例提 PR。

---

<div align="center">

**MIT License** · Built by **itxinfei（心飞为你飞）**

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill)

</div>
