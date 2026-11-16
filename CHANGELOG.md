# 更新日志

本项目遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [1.0.1] - 2026-11-16

内容增强，把文档和实际模块对齐。

### 新增模板

模板从 7 个扩到 13 个，补的都是高频场景：

- 立项报告（`initiation`）：八步走完，10 页以内
- OKR（`okr`）：带自查清单和常见错误对照
- A/B 测试方案（`abtest`）：含样本量、止损条件、判定规则
- Pre-mortem 清单（`premortem`）：老虎/纸老虎/大象三分类 + 常见大象检查表
- 用户画像卡（`persona`）：具体到人，标数据来源
- 指标树（`metrics`）：北极星→一级→二级→护栏，带归因逻辑

### 文档重写

- `docs/capability.md` 原来还写着"整合 10 大 PM 工作能力"，内容是最初的旧版。重写为 76 个模块完整清单，每个说清什么时候用、输出什么。
- `docs/prompt-reference.md` 从 18 条提示词扩到 76 条，覆盖全部模块。
- `skill-source/triggers.md` 从 79 行扩到 156 条触发指令，补齐了原来缺的 10 个模块（访谈解析、卡片分类、OST、战略分析三件套、画图指南、功能规格、干系人地图、Pre-mortem、增长飞轮、用户画像），并取消了临时的"大厂方法论"段落，归位到对应分类。
- `docs/workflow-guide.md` 从 6 个阶段扩到 11 个阶段，每阶段列出实际会用到的模块编号。
- `docs/faq.md` 重写，补上 13 个工具的适配说明、常见安装坑、维护方式。

### 修正

- README 能力矩阵补上漏掉的 2 个模块（Excalidraw 输出、用户画像）。
- README 作者徽章的中文名 URL 编码错误，显示成乱码，已修。
- 增长飞轮的分类归属统一到"协作与沟通"，此前 README 和 system-prompt 不一致。
- 策略与规划类里北极星指标和商业模式画布的排列顺序纠正。
- README / README_EN 的目录结构展开，标清每个文件干什么。

## [1.0.0] - 2026-11-09

首次发布。

### 核心内容

- 76 个产品经理能力模块，分 10 大类
- 7 个模板：PRD、会议纪要、访谈脚本、商业模式清单、竞品分析、路线图、复盘
- 4 个脱敏示例：PRD、RICE 优先级、竞品分析、思维导图
- 4 篇文档：能力清单、提示词库、工作流指南、FAQ
- 支持 13+ AI 工具，一键安装到所有已检测到的工具
- Windows（PowerShell）和 macOS/Linux（bash）两个安装脚本
- npm 包：`@itxinfei/pm-ai-skill`

### 十大能力分类

1. 需求发现与优先级（8 个）
2. 用户调研（11 个）
3. 竞品与市场（9 个）
4. 策略与规划（8 个）
5. 方案与设计（7 个）
6. 文档输出（5 个）
7. 协作与沟通（9 个）
8. 数据与度量（7 个）
9. 商用与增长（7 个）
10. 自我迭代与成长（5 个）

### 支持的工具

- 国产：WorkBuddy、TraeCode CN、Trae、豆包
- 国外：Claude Code、Codex、Gemini CLI、Cursor、Windsurf、Kiro、OpenCode、Continue
- 通用：所有支持 `.agents/skills` 约定的工具（Cline、Roo Code 等）
