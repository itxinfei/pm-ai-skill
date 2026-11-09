# pm-ai-skill

[![npm version](https://img.shields.io/npm/v/pm-ai-skill.svg)](https://www.npmjs.com/package/pm-ai-skill)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/itxinfei/pm-ai-skill/blob/main/LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei-orange)](https://github.com/itxinfei)

> PM‑AI‑Skill｜产品经理全链路 WorkBuddy Skill All‑in‑One 整合包，npm 一键安装

- GitHub：<https://github.com/itxinfei/pm-ai-skill>
- Gitee（国内镜像）：<https://gitee.com/itxinfei/pm-ai-skill>

把 10 个独立 PM Skill 合并为一套 Skill，覆盖产品经理完整工作链路：
需求发现 → 用户研究 → 竞品分析 → 数据分析 → PRD 撰写 → 会议纪要 → 思维导图 → 产品架构 → 苏格拉底商业模式画布 → Excalidraw 草图可视化。

> ⚠️ 重要声明：Skill 是思考辅助工具，**不替代产品经理的业务判断**；所有 AI 输出的业务数据请务必人工核验。

## 🚀 安装

全局安装（推荐）：

```bash
npm install -g pm-ai-skill
```

或者作为项目本地依赖：

```bash
npm install pm-ai-skill
npx pm-ai-skill info
```

## 📦 命令

```bash
# 安装 skill 到 WorkBuddy（自动探测目录）
pm-ai-skill install

# 导出兼容旧版的 skill zip 包，手动导入 WorkBuddy
pm-ai-skill export-zip

# 查看模板
pm-ai-skill template prd          # PRD 结构化模板
pm-ai-skill template meeting      # 会议纪要模板
pm-ai-skill template interview    # 用户访谈脚本样例
pm-ai-skill template bmc          # 商业模式假设校验清单

# 查看文档
pm-ai-skill doc capability        # 能力清单
pm-ai-skill doc prompt            # 提示词参考
pm-ai-skill doc workflow          # 分阶段工作流
pm-ai-skill doc faq               # 常见问题

# 查看 skill 元信息
pm-ai-skill info
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

## 📁 目录结构

```
pm-ai-skill/
├── bin/                 # CLI 入口
├── skill-source/        # WorkBuddy skill 元文件 + 系统提示词
├── templates/           # PRD / 会议纪要 / 访谈 / 商业模式模板
├── docs/                # 能力、提示词、工作流、FAQ
├── examples/            # 脱敏实战示例
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

## 📌 来源说明

本 Skill 整合自《产品经理必装的 10 个 Skills：从需求到落地的全链路 AI 武装》全部实战场景，做一体化重构。

## License

[MIT](./LICENSE) © itxinfei
