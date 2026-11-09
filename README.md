<div align="center">

# 🚀 pm-ai-skill

**产品经理全链路 AI 工作流 · 一个 Skill 覆盖从想法到复盘**

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei-orange.svg?style=flat-square)](https://gitee.com/itxinfei)
[![Platform](https://img.shields.io/badge/Platform-WorkBuddy%20%7C%20ChatGPT%20%7C%20Claude-brightgreen.svg?style=flat-square)](#)
[![Skills](https://img.shields.io/badge/Modules-26-red.svg?style=flat-square)](#能力矩阵)

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill) · [提示词库](docs/prompt-reference.md) · [工作流](docs/workflow-guide.md)

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

| 阶段 | 模块 | 你能干嘛 |
|---|---|---|
| **🔍 需求发现** | RICE 优先级 | 丢需求列表进来，出得分和排序 |
| | JTBD 分析 | 用户为什么"雇佣"你的产品，找切换动力 |
| | Working Backwards | 从新闻稿倒推功能清单 |
| | 访谈解析 | 从访谈文本提取痛点 / 爽点 / 痒点 |
| **👥 用户研究** | 问卷设计 | 15 题以内，避开引导性问题 |
| | 访谈脚本 | 探索 / 验证两种模式，30 分钟四段结构 |
| | 反馈聚类 | 用户反馈分组、情感分析、高频问题排序 |
| **🏢 竞品市场** | 竞品分析 | 定位象限、功能对比、定价带、用户情绪 |
| | 市场空白 | 找出未被满足的细分人群和场景 |
| | 切换动力 | 用户为什么从竞品切过来 |
| **📐 方案设计** | 产品架构 | 表现层 / 业务层 / 数据层分层，拆 MVP |
| | User Story 拆分 | As a... I want... So that...，带验收标准 |
| | 思维导图 | 大纲转结构，查逻辑冲突 |
| | Excalidraw 绘图 | 痛点场景、价值主张、功能架构、用户旅程 |
| **📝 文档输出** | PRD 教练 | 强制填业务目标、成功指标、回退条件 |
| | 业务案例一页纸 | 给高管看的 business case，300 字决策建议 |
| | 发布说明 | 用户视角的更新文案，不写技术术语 |
| | 功能规格 | 前置条件、主流程、异常流程、验收标准 |
| **🤝 协作沟通** | 会议纪要 | 决策、行动项、负责人、deadline |
| | 风险与延期沟通 | 给老板和客户的沟通文案 |
| **📊 数据度量** | 数据分析 | CSV 清洗、趋势、异常检测、业务解读 |
| | AI 产品度量 | AI 功能的效果 / 体验 / 业务 / 成本指标 |
| | RICE 复盘 | 上线后回看当初估算，校准下一轮 |
| **🧭 策略复盘** | 商业模式画布 | 苏格拉底追问，揪出未验证假设 |
| | 路线图规划 | Now / Next / Later 分季排 |
| | 项目复盘六段法 | 背景、角色、决策、推演、结果、方法论 |

---

## 💬 直接说人话就行

装完不用记命令，在对话里直接说：

```
用 RICE 排一下这几个需求：xxx
```

```
帮我写个针对老功能没人用的访谈脚本
```

```
基于新用户首单转化目标，给我搭个 PRD 框架
```

```
用 Working Backwards 倒推这个新功能
```

```
把下面会议录音整理成纪要，要带负责人和 deadline
```

```
项目要延期 2 周，帮我写沟通文案
```

```
用六段法复盘这个项目
```

完整提示词库 → [docs/prompt-reference.md](docs/prompt-reference.md)

---

## 🗺️ 工作流

```
想法 ──▶ 用户研究 ──▶ 竞品分析 ──▶ 方案设计 ──▶ PRD ──▶ 协作 ──▶ 上线 ──▶ 数据复盘
 │           │            │            │          │       │       │         │
 │           ▼            ▼            ▼          ▼       ▼       ▼       ▼
 │        JTBD         定位象限     产品架构    业务    会议    发布    AI 度量
 │        问卷         切换动力     User Story   案例    纪要    说明
 │        访谈         市场空白     Excalidraw  一页纸
 │           │            │            │
 └───────────┴────────────┴────────────┘
              苏格拉底商业模式画布（贯穿始终）
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
│   ├── system-prompt.md     # 26 个模块的系统提示词
│   └── triggers.md          # 触发指令清单
├── templates/               # 可直接复用的模板
│   ├── prd-template.md
│   ├── meeting-minutes-template.md
│   ├── interview-script-sample.md
│   └── business-model-checklist.md
├── docs/                    # 文档
│   ├── capability.md         # 能力详细说明
│   ├── prompt-reference.md  # 提示词参考库
│   ├── workflow-guide.md     # 分阶段工作流
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
- 模板和示例都是脱敏的，直接用。
- 输出 User Story 必须带验收标准，输出 Business Case 必须带一句话决策建议——这是硬约束。
- 有问题提 Issue，想补模板或案例提 PR。

---

<div align="center">

**MIT License** · Built by [itxinfei](https://gitee.com/itxinfei)

</div>
