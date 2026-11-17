# GitHub 上的 PM Skill 生态

2026-11-17 用 GitHub API 抓的，star 按仓库当前值，不是历史峰值。star 只说明有多少人点过，不代表质量 —— 真正要看的是它解决什么问题、怎么组织。

看这份清单的用途有两个：找同类做对标，找能直接抄的做法。

---

## 第一梯队（万星以上）

| 仓库 | star | 规模 | 它做对了什么 |
|---|---|---|---|
| [phuryn/pm-skills](https://github.com/phuryn/pm-skills) | 28.0k | 72 skills + 42 chained workflows，9 个 plugin | 按职能分 plugin（discovery / strategy / execution / market-research / growth / go-to-market / analytics / ai-shipping / toolkit），一条命令装一个职能包。README 第一屏是「你现在要干什么→用哪条命令」，`/discover` `/strategy` `/write-prd` `/plan-launch` `/north-star` |
| [deanpeters/Product-Manager-Skills](https://github.com/deanpeters/Product-Manager-Skills) | 8.0k | 95 skills + 6 command workflows | 一个 skill 只干一件事，粒度极细。有 `catalog/` 目录页、starter pack zip、自动发版。开场问的是「这周桌上摆着什么活」，不是让你报模块名 |

## 千星级

| 仓库 | star | 特点 |
|---|---|---|
| [mohitagw15856/pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) | 1.5k | 1310 个 skill，纯数量打法。覆盖面广到能当字典查，但不好记也不好选 |
| [deanpeters/product-manager-prompts](https://github.com/deanpeters/product-manager-prompts) | 1.2k | 上一个作者的提示词版，比 skill 版更早。适合直接复制粘贴 |
| [SpaceZephyr/pm-skills](https://github.com/SpaceZephyr/pm-skills) | 1.1k | 本项目 v1.1.0 的吸收对象：三层架构（总控 / 执行 / 顾问团）+ 6 角色评审 + HTML 输出 |
| [borghei/Claude-Skills](https://github.com/borghei/Claude-Skills) | 1.1k | 403 skills + 76 expert agents + 973 个 Python 工具。跨职能，不只 PM |

## 百星级，各有侧重

| 仓库 | star | 值得看的地方 |
|---|---|---|
| [product-on-purpose/pm-skills](https://github.com/product-on-purpose/pm-skills) | 813 | 68 skills，但配了 **200+ 真实样例输出**。它卖的不是模板，是"做出来应该长什么样"这条质量线 |
| [zamesin/Next-Move-Theory-Canon-and-Skills](https://github.com/zamesin/Next-Move-Theory-Canon-and-Skills) | 472 | 市场调研、价值主张、PRD、GTM 串成一条线，理论书 + skills 双份 |
| [menkesu/awesome-pm-skills](https://github.com/menkesu/awesome-pm-skills) | 460 | 25 个 workflow，内容来自 340 期 Lenny's Podcast。README 用「带什么来 → 用哪个 → 要什么」三列表，比按模块分类直观 |
| [peterfei/ai-agent-team](https://github.com/peterfei/ai-agent-team) | 452 | 中文。把 PM 放进一个虚拟团队（前端/后端/测试/DevOps），PM 只负责需求 |
| [pmYangKun/create-prd-skill](https://github.com/pmYangKun/create-prd-skill) | 378 | 中文。B 端 PRD，基于《决胜B端》方法论，固定 14 章结构 |
| [fleurytian/awesome-claude-skills](https://github.com/fleurytian/awesome-claude-skills) | 330 | 面向脑力工作者，作者是前麦肯锡 + AI 产品经理 |
| [nurettincoban/ai-prd-workflow](https://github.com/nurettincoban/ai-prd-workflow) | 311 | RFC 驱动：想法或已有代码 → 验证过的 PRD → 功能实现。偏工程侧 |
| [smallnest/goal-workflow](https://github.com/smallnest/goal-workflow) | 302 | `/prd` `/goal` `/review-it` `/ship-it` 四个命令把开发闭环跑完，中文作者 |
| [nicepkg/ai-workflow](https://github.com/nicepkg/ai-workflow) | 293 | 170+ skills，覆盖 14 个 AI 工具。装法统一是它的卖点 |
| [Fokkyp/claude-skills](https://github.com/Fokkyp/claude-skills) | 235 | 中文。作者称都在商业环境下测过，竞品分析、需求文档为主 |
| [Digidai/product-manager-skills](https://github.com/Digidai/product-manager-skills) | 205 | 强项是 **critique**：诊断 SaaS 指标、给 PRD 挑毛病、排优先级 |
| [wuwu119/lenny-pm-skills](https://github.com/wuwu119/lenny-pm-skills) | 198 | 中文。Lenny 那套的 86 技能翻译版 |
| [killvxk/pm-skills-zh](https://github.com/killvxk/pm-skills-zh) | 186 | 中文。phuryn 那 28k 星仓库的翻译版，65 技能 + 36 工作流 |
| [beautfulmt/PM-K12--skills](https://github.com/beautfulmt/PM-K12--skills) | 166 | 中文。从调研到 PRD、原型、验收、数据，一条完整链路 |
| [amplitude/builder-skills](https://github.com/amplitude/builder-skills) | 164 | Amplitude 官方出品。按职能分 9 个 plugin（含 sales、design、engineering），README 里每个 skill 一句话说清干什么 |
| [aakashg/pm-claude-code-setup](https://github.com/aakashg/pm-claude-code-setup) | 163 | 一份 CLAUDE.md + 起步 skill，教 PM 怎么配环境，不是给 skill 的 |
| [konglong87/superPM](https://github.com/konglong87/superPM) | 94 | 中文。全生命周期工作流，主打一键 |
| [Mehdibargach/claude-code-pm-skills](https://github.com/Mehdibargach/claude-code-pm-skills) | 99 | 20 个 skill，按 discovery / build / measure / communicate 分 |
| [assimovt/productskills](https://github.com/assimovt/productskills) | 74 | 小但干净，只做 discovery、strategy、prioritization、PRD 四件事 |
| [xuqiang97/pm-ai-toolkit](https://github.com/xuqiang97/pm-ai-toolkit) | 17 | 中文，和本项目定位最像：需求澄清、PRD、原型、评审、数据、复盘 |

---

## 中文生态，单独说

上面标"中文"的加起来超过 1800 星，说明这块有真实需求，但做法分三类：

1. **翻译搬运**（killvxk、wuwu119）：把英文仓库翻过来，省事，但方法论还是别人的语境。
2. **垂直深耕**（pmYangKun 的 B 端 PRD 14 章、beautfulmt 的 K12）：吃透一个场景，不贪全。
3. **团队化**（peterfei/ai-agent-team）：不把 PM 当主角，当成团队里的一个角色。

这三条路都能走，但说明一件事：**只做"中文版英文 skill"没有护城河**，翻译谁都能做。

---

## 值得学的六件事

对着上面这些仓库，能提出来、也确实能落地的做法：

| 做法 | 出自 | 为什么值得学 |
|---|---|---|
| **按"你带了什么"分诊**，不按模块名 | menkesu | 用户是拿着一份定价页/访谈记录来的，不是拿着"我要用 RICE"来的 |
| **给已有产出打分** | menkesu、Digidai | 大多数人不是从零写，是来让你挑毛病的。挑得准比写得多有用 |
| **真实样例库**，不是模板库 | product-on-purpose（200+ outputs） | 模板告诉你填什么，样例告诉你填成什么样算合格 |
| **机器可读清单** | product-on-purpose（library.json、skill-manifest.json） | 别人做工具、做检索、做市场页都要读它 |
| **命令快捷入口** | phuryn、smallnest | `/write-prd` 比"帮我写个 PRD"少打字，也更好记 |
| **发布前自动校验** | phuryn（validate_plugins.py）、product-on-purpose（release-please） | 上百个 skill 靠人眼看不住 |

## 不值得学的

- **拼数量**。1310 个 skill 的仓库，用户照样不知道选哪个。数量和可用性是两回事。
- **只做翻译**。前面说过，没有护城河。
- **用 star 当目标**。28k 星那个仓库的 README 里有一句"If this project helps you, ⭐ the repo"，位置放得很聪明 —— 但那是运营手段，不是产品能力。

---

## 本项目在哪

76 个模块、中文原生、单 skill、13 个 AI 工具一键装、带 CLI、有 HTML 输出和评测用例。

差异化不在模块数量（比不过 1310），在三点：

1. **中文原生**。不是翻译腔，模板和例子都是国内团队在用的东西（周报、立项、双周迭代）。
2. **能落地**。`npm i -g` 装完就有命令，不依赖某个特定工具的市场。
3. **给判断，不只给文档**。分诊、链路、多角色评审这三层是这一版加的，目标是让它在"该不该做"这种问题上能拦你一下。

短板也清楚：**样例库太薄**（4 个）、**没有打分能力**、**清单不是机器可读的**。这三样是下一步该补的。
