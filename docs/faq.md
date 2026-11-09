# 常见问题 FAQ

## Q1：这个 Skill 能直接给我业务结论吗？
不能。它是结构化思考教练，输出框架、追问、提示词，不替你做业务判断。外部市场、竞品、用户数据都需要你人工核验。

## Q2：和单独用 ChatGPT / Claude 有什么区别？
单独用大模型，你需要自己记提示词、自己拼框架。PM-AI-Skill 把 10 个高频 PM 工作流固化成一套系统提示词，触发即用，输出结构一致。

## Q3：支持哪些 AI 平台？
核心是 Markdown 提示词 + skill.json 元文件，可导入任何支持自定义 Skill 的平台（WorkBuddy 优先）。也可以直接复制 system-prompt.md 内容粘贴到任意大模型对话。

## Q4：怎么更新？
```bash
npm update -g pm-ai-skill
pm-ai-skill install
```

## Q5：找不到 WorkBuddy skills 目录怎么办？
执行 `pm-ai-skill install`，如果没自动探测到，文件会释放到当前目录，你手动拷到 WorkBuddy 配置的 skills 目录即可。

## Q6：想导出 zip 包离线分发？
```bash
pm-ai-skill export-zip
```
会在当前目录生成 `pm-all-in-one-skill.zip`。

## Q7：可以二次开发吗？
MIT 协议，随便改、随便商用。欢迎提 PR。

## Q8：作者是谁？
itxinfei，GitHub / Gitee 同名。
