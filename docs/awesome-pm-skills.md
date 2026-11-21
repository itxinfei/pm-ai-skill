# GitHub 上的 PM Skill 生态

2026-11-21 用 GitHub API 抓的，star 是当时的值。star 说明有多少人点过，不说明质量。

看这份清单有两个用途：找同类对标，找能直接抄的做法。

---

## 前十

| 仓库 | star | 规模 | 它做对了什么 |
|---|---|---|---|
| [phuryn/pm-skills](https://github.com/phuryn/pm-skills) | 28.2k | 100+ skills，42 条 workfolw，9 个 plugin | README 第一屏就是「你现在要干什么 → 用哪条命令」，`/discover` `/write-prd` `/plan-launch`。按职能拆包，装一个包解决一类事 |
| [deanpeters/Product-Manager-Skills](https://github.com/deanpeters/Product-Manager-Skills) | 8.1k | 95 skills | 一个 skill 只干一件事，细到「写竞品对比表」单独成一个。有 catalog 目录页，有 starter pack，发版自动化 |
| [mohitagw15856/pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) | 1.6k | 1310 skills | 数量打法天花板。真正值得看的是 `npx pm-claude-skills add`，一行装完，不用全局安装 |
| [RefoundAI/lenny-skills](https://github.com/RefoundAI/lenny-skills) | 1.5k | 86 skills | 内容全部出自 Lenny's Podcast 的真实访谈，每条能追溯到哪一期。别人给框架，它给有出处的经验 |
| [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) | 1.2k | 提示词集 | 同一作者更早的版本。不装 skill，直接复制粘贴，门槛低到零 |
| [SpaceZephyr/pm-skills](https://github.com/SpaceZephyr/pm-skills) | 1.2k | 三层架构 | 总控 / 执行 / 顾问团三层 + 6 角色评审 + HTML 输出。本项目 1.1.0 吸收的就是它 |
| [product-on-purpose/pm-skills](https://github.com/product-on-purpose/pm-skills) | 831 | 68 skills + 200+ 样例 + 6 sub-agents | 卖的不是模板是样例：200+ 份真实产出，告诉你合格长什么样。再加 CI 强制契约，提交就校验 |
| [jackispm/ProductManager](https://github.com/jackispm/ProductManager) | 567 | 中文资源集 | 面向产品工程师和独立开发者，不只大厂 PM。视角不一样 |
| [archlizheng/AIPM-Wiki](https://github.com/archlizheng/AIPM-Wiki) | 530 | 中文知识库 | 面试题库 + 学习路线 + 案例拆解。AI PM 转行的人从这儿进门 |
| [menkesu/awesome-pm-skills](https://github.com/menkesu/awesome-pm-skills) | 460 | 25 workflows | README 用「带什么来 → 用哪个 → 要什么」三列，不按模块名分类。内容来自 340 期播客 |

---

## 值得抄的，和抄了没

| 做法 | 出自 | 本项目 |
|---|---|---|
| 首屏「你要干什么 → 用哪条命令」 | phuryn | 1.2.4 加了，README 第一屏就是这张表 |
| 按职能拆 plugin 包 | phuryn | **不抄**。单 skill 装一次全都有，少一步选择 |
| 一个 skill 一件事 | deanpeters | 半抄。模块粒度一样细，但打在一个 skill 里 |
| catalog 目录页 | deanpeters | 有，`docs/capability.md` 76 行 |
| `npx` 一行装 | mohitagw | 1.2.4 加了，不用全局安装也能跑 |
| 内容能追溯出处 | lenny-skills | **不抄**。这份的是自己干活攒的，编个出处反而假 |
| 真实样例库，不是模板库 | product-on-purpose | 200+ 份，每份带用法说明；本项目 15 份，每份带"为什么算合格"，还得继续补 |
| 机器可读清单 | product-on-purpose | 有，`manifest.json` 76 模块 / 10 分类 / 6 链路 |
| CI 强制契约 | product-on-purpose | 有，`check.js` + GitHub Actions，提交就查 |
| 固定章节结构的 PRD | pmYangKun（B 端 14 章） | 1.2.4 加了 `prd-b2b` 模板 |
| 给已有产出挑毛病 | Digidai | 有，六视角评审 + 0-3 分打分 |
| 成长路线，不只是工具 | AIPM-Wiki | 1.2.4 加了 `docs/growth-path.md` |
| 「带什么来」三列分诊 | menkesu | 有，十种材料的分诊表 |

## 不抄的

- **拼数量**。1310 个 skill，用户还是不知道选哪个。数量不解决选择困难。
- **只做翻译**。中文版英文 skill 谁都能做，没有护城河。
- **拿 star 当目标**。28k 那个仓库 README 里有句"If this project helps you, ⭐ the repo"，位置很聪明，但那是运营，不是能力。

---

## 本项目在哪

76 个模块 · 92 条提示词 · 15 份样例 · 3 个 HTML 模板 · 27 条回归用例 · manifest · 13 个 AI 工具

不比模块数（比不过 1310），比这三样：

1. **中文原生**。不是翻译腔。周报、立项、双周迭代、老板周五要东西，这些都是国内团队的日常。
2. **装完就能用**。一条命令，13 个工具都装上，不依赖某个工具的市场生态。
3. **给判断，不只给文档**。分诊决定要不要写，评审挑毛病，打分判能不能发。这三层是为了在"这东西到底该不该做"上拦你一下。

## 还差什么

- **样例不够**。15 份对 200+，差距在那摆着。样例是最难补的，每份都得真写。
- **英文不原生**。有 README_EN，但文档主体是中文，海外用户进不来。
- **没人替你验证效果**。27 条用例靠人跑，接不了自动化评测。
