# pm-ai-skill

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitee.com/itxinfei/pm-ai-skill/blob/main/LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei-orange)](https://gitee.com/itxinfei)

> PM‑AI‑Skill｜产品经理全链路 WorkBuddy Skill 整合包，一条命令安装

- Gitee（国内主仓库）：<https://gitee.com/itxinfei/pm-ai-skill>
- GitHub（镜像）：<https://github.com/itxinfei/pm-ai-skill>

把 10 个独立 PM Skill 合并为一套 Skill，覆盖产品经理完整工作链路：
需求发现 → 用户研究 → 竞品分析 → 数据分析 → PRD 撰写 → 会议纪要 → 思维导图 → 产品架构 → 苏格拉底商业模式画布 → Excalidraw 草图可视化。

> ⚠️ 重要声明：Skill 是思考辅助工具，**不替代产品经理的业务判断**；所有 AI 输出的业务数据请务必人工核验。

## 🚀 一键安装（推荐）

### Windows PowerShell
```powershell
irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex
```

### 手动安装（任意系统）
1. 下载仓库 zip：<https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip>
2. 解压
3. 把 `skill-source/` 文件夹重命名为 `pm-ai-skill/`
4. 拷到 WorkBuddy 的 skills 目录下（通常是 `~/.workbuddy/skills/` 或 `%APPDATA%\WorkBuddy\skills\`）

### npm 方式（可选，需要 Node ≥ 18）
```bash
npm install -g pm-ai-skill
pm-ai-skill install
```

## 📦 命令（npm 安装后可用）

```bash
# 安装 skill 到 WorkBuddy
pm-ai-skill install

# 导出兼容旧版的 skill zip 包
pm-ai-skill export-zip

# 查看模板
pm-ai-skill template prd
pm-ai-skill template meeting
pm-ai-skill template interview
pm-ai-skill template bmc

# 查看文档
pm-ai-skill doc capability
pm-ai-skill doc prompt
pm-ai-skill doc workflow
pm-ai-skill doc faq

# 查看示例
pm-ai-skill example rice
pm-ai-skill example competitor
pm-ai-skill example mindmap
```

## 🎯 能力一览

- ✅ RICE 需求优先级、用户访谈内容解析
- ✅ 竞品竞争格局分析、市场空白识别
- ✅ 用户问卷 & 深度访谈脚本生成，反馈主题聚类
- ✅ CSV 数据分析清洗、异常 & 趋势挖掘，业务解读
- ✅ PRD 结构化教练，强制业务目标 / 成功指标 / 回退条件
- ✅ 结构化会议纪要，保留决策上下文、完整行动项
- ✅ Markdown 文本转思维导图，逻辑冲突检测
- ✅ B 端 / C 端业务产品架构输出，MVP 能力拆分
- ✅ 苏格拉底追问式商业模式画布，识别待验证假设
- ✅ 输出 Excalidraw 绘图描述：痛点场景、价值主张、用户旅程

## 💬 触发指令示例

```
# 需求优先级
使用 RICE 模型评估以下需求：xxx

# 用户研究
帮我设计一份针对【老功能使用率低】的问卷 + 深度访谈脚本

# 竞品分析
分析 XX 垂直赛道竞争格局，找出市场空白

# PRD 辅助
基于业务目标：提升新用户首单转化 15%，生成 PRD 结构化框架

# 会议纪要
把下面会议录音文本整理成结构化纪要，保留决策上下文

# 商业模式画布
用苏格拉底追问模式校验这个创新项目商业模式
```

## 📁 目录结构

```
pm-ai-skill/
├── install.ps1           # Windows 一键安装脚本
├── bin/                  # CLI 入口（npm 方式）
├── skill-source/         # WorkBuddy skill 源文件
├── templates/            # PRD / 会议纪要 / 访谈 / 商业模式模板
├── docs/                  # 能力、提示词、工作流、FAQ
├── examples/              # 脱敏实战示例
└── README.md
```

## 📌 使用建议

不要把 AI 当成直接出结果的黑盒，把 Skill 当作你的"结构化思考教练"：

1. 需求探索期：优先用户研究 + RICE 优先级评估
2. 调研阶段：竞品分析 + 产品架构能力做定位
3. 方案设计：思维导图 + Excalidraw 可视化输出
4. 文档输出：PRD 结构化框架，补齐业务目标和回退条件
5. 上线验证：数据分析看业务效果
6. 日常协作：会议纪要保证跨团队信息对齐

## 📖 文档导航

- [能力详细文档](./docs/capability.md)
- [提示词参考库](./docs/prompt-reference.md)
- [分阶段工作流指南](./docs/workflow-guide.md)
- [FAQ 常见问题](./docs/faq.md)

## 🤝 贡献

欢迎提交 Issue 反馈问题，提交 PR 补充模板、案例。

## License

[MIT](./LICENSE) © itxinfei
