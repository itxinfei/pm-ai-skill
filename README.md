# pm-ai-skill

[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitee.com/itxinfei/pm-ai-skill/blob/main/LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei-orange)](https://gitee.com/itxinfei)

把散落在各处的 10 个 PM 提示词捏成了一个 WorkBuddy Skill，省得每次新开对话都要重新贴 prompt。

- Gitee：<https://gitee.com/itxinfei/pm-ai-skill>
- GitHub：<https://github.com/itxinfei/pm-ai-skill>

## 装

Windows PowerShell 一行：

```powershell
irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex
```

脚本会自动找到 WorkBuddy 的 skills 目录，放进去就行。找不到就释放到当前目录，手动拷一下。

不想跑脚本就手动：下载 zip 解压，把 `skill-source/` 改名 `pm-ai-skill/`，丢进 WorkBuddy skills 目录。

npm 方式也留着，但不是主推：

```bash
npm i -g pm-ai-skill
pm-ai-skill install
```

## 能干啥

本质上就是把常见的 PM 工作流固化成提示词，你不用自己写：

- **RICE 排需求**：丢需求列表进来，出得分和排序
- **用户研究**：写问卷、出访谈脚本、把反馈聚类
- **竞品分析**：画定位象限、找市场空白（外部数据自己核）
- **PRD 教练**：给框架，逼你填业务目标、成功指标、回退条件，不替你写业务内容
- **会议纪要**：录音转写文本进来，出决策、行动项、负责人、deadline
- **思维导图**：大纲转结构，顺手查逻辑冲突
- **产品架构**：表现层 / 业务层 / 数据层分层，MVP 拆能力
- **商业模式画布**：苏格拉底式追问，不直接填空，帮你揪出未验证的假设
- **Excalidraw 绘图**：出痛点场景、价值主张、功能架构、用户旅程的描述文本

## 怎么用

装完直接在对话里说人话就行，比如：

```
用 RICE 排一下这几个需求：xxx
帮我写个针对老功能没人用的访谈脚本
基于新用户首单转化目标，给我搭个 PRD 框架
把下面会议录音整理成纪要，要带负责人和 deadline
```

## npm 装了之后有什么命令

```bash
pm-ai-skill install          # 装到 WorkBuddy
pm-ai-skill export-zip       # 导出 zip 包
pm-ai-skill template prd     # 看 PRD 模板
pm-ai-skill template meeting  # 看会议纪要模板
pm-ai-skill doc prompt        # 看提示词库
pm-ai-skill example rice     # 看 RICE 示例
```

## 目录

```
pm-ai-skill/
├── install.ps1       # Windows 一键安装
├── bin/              # CLI
├── skill-source/     # WorkBuddy 读的源文件
├── templates/        # PRD、纪要、访谈、商业模式模板
├── docs/             # 能力、提示词、工作流、FAQ
└── examples/         # 脱敏示例
```

## 其他

- 这是辅助工具，不替你做业务判断，AI 输出的数字和外部数据自己核。
- 模板和示例都是脱敏的，直接用。
- 有问题提 Issue，想补模板或案例提 PR。

License: MIT，作者 itxinfei。
