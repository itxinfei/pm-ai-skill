# 常见问题

## 装不上 / 装完找不到

**Q：运行 install 说找不到工具目录？**

脚本会自己探测 13 个常见 AI 工具的 skills 目录。一个都没探到的话，会把文件放到 `~/.agents/skills/pm-ai-skill`，同时把路径打印出来。你按打印的路径手动拷到你那个工具配置的 skills 目录就行。

**Q：装完重启工具还是没生效？**

大多数工具只在启动时扫描 skills 目录，装完必须重启。WorkBuddy、TraeCode、Claude Code 都是这样。

**Q：Windows 上 PowerShell 报"无法加载脚本，因为在此系统上禁止运行脚本"？**

执行一次这个，然后重跑安装：
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Q：Mac / Linux 上 install.sh 提示 Permission denied？**

```bash
chmod +x install.sh
./install.sh
```

---

## 各工具怎么用

**Q：Claude Code 里怎么调？**

装在 `~/.claude/skills/pm-ai-skill` 之后，直接说"用 pm-ai-skill 帮我排一下需求优先级"。它读 SKILL.md 的 description 匹配，不需要敲命令。

**Q：TraeCode CN 能用吗？**

能。装在 `~/.trae-cn/skills/` 下。Trae 的 skill 机制和 Claude Code 一致。

**Q：豆包 / 豆包办公 呢？**

装到 `~/.agents/skills/` 或豆包的 skills 目录。豆包读的是 skill.json + SKILL.md。

**Q：Cursor、Windsurf、Cline、Gemini CLI、Codex 这些呢？**

脚本里都覆盖了。装完各自重启即可。

**Q：能不能不装，直接用？**

可以直接把 `skill-source/system-prompt.md` 的内容复制粘贴到任何大模型对话框。缺点是每次都要粘，也没有触发的语义匹配。

---

## 内容相关

**Q：76 个模块是不是太多了，用不过来？**

正常。一个真实项目真正会用到的也就 8-10 个。模块多是让你在遇到具体问题时能对上号，不是让你全跑一遍。不知道用哪个就说你现在卡在哪，会帮你选。

**Q：它能直接给我业务结论吗？**

不能，也不该。它给的是框架、追问和检查清单。市场数据、竞品情报、用户真实反馈，这些必须你自己核验。任何 AI 直接给你的市场结论，都别信。

**Q：输出的东西靠谱吗？**

框架部分是稳的，比如 PRD 七段结构、RICE 的计算方式、A/B 测试的样本量逻辑。涉及具体业务判断的部分，得你自己把关。它更像是把老 PM 的经验摆在你面前，让你少漏东西。

**Q：会不会给我编数据？**

明确约束了不许编。如果某处需要数据但你没有，它会说"这里需要具体数字，请补充"而不是瞎填。

**Q：和我装的其他 skill 冲突吗？**

不冲突。每个 skill 是独立目录，靠 description 语义匹配。除非两个 skill 的触发描述高度重合，否则不会打架。

---

## 维护和二次开发

**Q：怎么更新？**

npm 装的：
```bash
npm update -g @itxinfei/pm-ai-skill
pm-ai-skill install
```

git 克隆的：
```bash
git pull
node bin/index.js install
```

**Q：想改内容，改哪个文件？**

- 模块正文 → `skill-source/system-prompt.md`
- 触发指令 → `skill-source/triggers.md`
- 元信息（名称、标签）→ `skill-source/skill.json`
- 改完要跑 `node bin/index.js install` 才会同步到各工具目录

**Q：能导出 zip 离线发给同事吗？**

```bash
pm-ai-skill export-zip
```
当前目录生成 `pm-all-in-one-skill.zip`，对方解压后跑 install 即可。

**Q：可以商用吗？**

MIT 协议，随便用、随便改、随便商用。改了欢迎提 PR，不提也没关系。

**Q：模板和示例在哪？**

```bash
pm-ai-skill template          # 列出 13 个模板
pm-ai-skill example           # 列出 4 个示例
pm-ai-skill template prd      # 导出 PRD 模板到当前目录
pm-ai-skill template initiation  # 立项报告模板
```

---

## 作者

itxinfei（心飞为你飞）。

- GitHub：https://github.com/itxinfei/pm-ai-skill
- Gitee：https://gitee.com/itxinfei/pm-ai-skill
- npm：https://www.npmjs.com/package/@itxinfei/pm-ai-skill

有问题提 Issue，别发邮件，看不到。
