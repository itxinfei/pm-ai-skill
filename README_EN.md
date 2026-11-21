<div align="center">

# pm-ai-skill

A working AI assistant for product managers · 76 modules · 13 tools · Chinese-native

76 modules in a single skill. Install once, works in 13 AI tools.

Everywhere a PM gets stuck in a year is in here: intake, research, competitors, strategy, docs, metrics, growth.

Bring what you already have. It reads before it asks, then grades your output: shippable, or two things to fix first.

[![npm](https://img.shields.io/npm/v/@itxinfei/pm-ai-skill.svg?style=flat-square)](https://www.npmjs.com/package/@itxinfei/pm-ai-skill)
[![Release](https://img.shields.io/github/v/release/itxinfei/pm-ai-skill?style=flat-square&label=Release)](https://github.com/itxinfei/pm-ai-skill/releases)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei%20%E5%BF%83%E9%A3%9E%E4%B8%BA%E4%BD%A0%E9%A3%9E-orange.svg?style=flat-square)](https://github.com/itxinfei)
[![Stars](https://img.shields.io/github/stars/itxinfei/pm-ai-skill?style=flat-square&color=yellow)](https://github.com/itxinfei/pm-ai-skill/stargazers)

[GitHub](https://github.com/itxinfei/pm-ai-skill) · [Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [Releases](https://github.com/itxinfei/pm-ai-skill/releases) · [Capabilities](docs/capability.md) · [Prompt library](docs/prompt-reference.md) · [Workflows](docs/workflow-guide.md) · [FAQ](docs/faq.md)

By itxinfei (心飞为你飞) · [中文](README.md)

*Detailed docs are written in Chinese.*

</div>

---

## Where to start

You do not need to know module names. Find your situation and say that sentence.

| Your situation | Just say this |
|---|---|
| The boss dropped a one-line request | "Should we build this? Stress-test it" |
| A pile of interview notes or complaints | "Pull the opportunities out, and tell me what I failed to ask" |
| A competitor shipped a feature | "Break it down and tell me whether to follow" |
| You owe a PRD / roadmap / OKR | "Draft it from the template, then tell me if it ships" |
| Something is written and needs a pass | "Six-role review, only the things that will actually break" |
| Launching tomorrow | "Pre-launch check: blockers and fallbacks" |
| Retention is dropping | "Walk the metric tree and find where it broke" |
| Repricing, or taking a product to market | "Pricing plan / GTM plan — verdict first, then the doc" |

Not sure which one? Just describe the problem. It triages first, then decides whether to hand you a verdict or a deliverable.

---

## How it differs from a plain AI assistant

| | A plain assistant | This |
|---|---|---|
| You say "write me a PRD" | Hands you a template to fill | Asks whether it should be built at all, and tells you not to write it if it fails |
| You paste interview notes | Summarizes into three conclusions | Pulls quotes, clusters by theme, names the question you never asked |
| You ask "is this any good" | Says "looks solid, could be polished" | Scores five dimensions, and one zero means it does not ship |
| You want a review | Gives you a list of issues | Six roles each attack it, and the places where two roles disagree get called out |

---

## Highlights

| | | What it actually is |
|---|---|---|
| 1 | **76 modules, ten categories** | Discovery → research → competition → strategy → design → docs → collaboration → data → monetization → self-improvement. Every place a PM gets stuck in a year |
| 2 | **Triage before work** | A verdict, a deliverable, or a chain. Getting the type wrong wastes the whole session |
| 3 | **Six chains A–F** | Idea to buildable, release planning, metric drop, one research round, competitor-driven kickoff, pre-launch check |
| 4 | **Chains stay under control** | Steps quoted up front, handoffs under 10 lines, stop anytime and nothing is half-finished |
| 5 | **Bring what you have** | Ten common inputs triaged: interviews, competitor screenshots, requirement lists, dashboards, launch plans, nothing but a deadline |
| 6 | **Read first, ask second** | Does not open with "what do you want to build". Opens with "here are three things I see in this" |
| 7 | **Six-role review** | Product, engineering, QA, design, operations, legal — each takes a pass, graded blocking / important / suggestion |
| 8 | **Only reports disagreements** | Not twelve lines of "consider improving error handling", but "order state undefined after payment timeout — what happens on retry" |
| 9 | **Grades what you wrote** | Six document types, five dimensions each, 0–3 points |
| 10 | **Dares to say it ships** | If the material holds up, it says so, plus at most two optional additions |
| 11 | **Three strictness levels** | Quick screen / standard / final. Words like "launching tomorrow" push it to final automatically |
| 12 | **HTML reports** | Three single-file templates, double-click to view, print straight to PDF |
| 13 | **One command, 13 tools** | Four Chinese tools, eight international, plus a generic `.agents/skills` path |
| 14 | **Install once, get everything** | One skill, not nine plugin packs to pick from |
| 15 | **14 templates, 15 samples** | Templates say what to fill in; samples show what good looks like, and each ends with why it qualifies |
| 16 | **27 regression cases** | Run them after a change and see whether behavior broke |
| 17 | **Machine-readable manifest** | 76 module ids, categories and definitions, for your own scripts |
| 18 | **Written in Chinese, for Chinese teams** | Not a translation. Biweekly sprints, review meetings, a boss who wants something by Friday |

---

## Compared with similar projects

A survey of the popular PM skill repos lives in [docs/awesome-pm-skills.md](docs/awesome-pm-skills.md). The short version:

| Dimension | This | The leaders |
|---|---|---|
| Modules | 76, single skill | 72–95, mostly split into plugin packs |
| Language | Chinese-native | English-first |
| Install | One command, scans your machine | Assemble by hand |
| Tools | 13, four of them Chinese | Mostly Claude Code |
| Grading | Six doc types, 0–3, zero blocks | A few have it |
| HTML reports | 3 templates, printable | Rare |
| Regression cases | 27 | Rare |
| Real samples | 15, each with a note on why it qualifies | 200+ (product-on-purpose) |

Where this loses, plainly: fewer modules than the 95-skill project, far fewer samples than the 200-sample one, and nowhere near their stars — those projects have been running for two years.

Where it wins, on two things the others skip: **install once and you have all of it**, no picking among nine packs; and **it judges what you already wrote** instead of rewriting it.

---

## Install

```bash
npm i -g @itxinfei/pm-ai-skill && pm-ai-skill install
```

No global install? Run it once with npx:

```bash
npx @itxinfei/pm-ai-skill install
```

If that does not work, pick another route:

| Route | How |
|---|---|
| Windows | `irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 \| iex` |
| macOS / Linux | `curl -fsSL https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.sh \| bash` |
| Release zip | Download the [latest zip](https://github.com/itxinfei/pm-ai-skill/releases/latest), unzip, run `node bin/index.js install` |
| Nothing at all | Paste [system-prompt.md](skill-source/system-prompt.md) into any AI's system prompt |

The scripts detect which tools you have and install into each one found:

> **Chinese** WorkBuddy · TraeCode CN · Trae · Doubao
> **International** Claude Code · Codex · Gemini CLI · Cursor · Windsurf · Kiro · OpenCode · Continue
> **Generic** Cline · Roo Code and others via `.agents/skills`

One config, copied into each tool's directory. Change it once, not thirteen times.

---

## What it does

### Three kinds of request, three kinds of answer

| You say | It gives |
|---|---|
| "should we build this", "is this worth it", "is this a real need" | A verdict with evidence, no document |
| "write a PRD", "rank these", "draw a roadmap" | A deliverable from the matching module |
| "take this from idea to buildable" | A chain: requirement check → PRD → review → instrumentation |

One test decides: do you want a conclusion, or something you can hand over.

### Six chains

| Chain | When | Steps |
|---|---|---|
| A Idea to buildable | A new idea needs to land | Requirement check → PRD → review → fix → instrumentation |
| B Release planning | A pile of requests, no order | Backlog → ranking → roadmap |
| C Metric dropped | Retention or conversion sliding | Look → attribute → experiment → instrument → retro |
| D One research round | You need to know what users think | Goal → fix the questions → survey/interviews → analysis → requirements |
| E Competitor-driven kickoff | A competitor shipped something | Teardown → follow or not → joins chain A |
| F Pre-launch check | Shipping tomorrow | Pre-mortem → walkthrough → instrumentation check → rollout |

> One hard rule: the output of a step must be a valid input to the next. If it does not connect, that step was not finished.

### When you already have something

Most people arrive holding something, and "can you take a look" rarely explains what they want.

| You have | You get |
|---|---|
| Interview recordings or notes | Opportunity list + the questions you never asked |
| Competitor screenshots or filings | Comparison table + a follow-or-not verdict |
| One sentence: "I want to build X" | Build or not, plus the next step |
| A finished PRD | A grade, not a rewrite |
| A long requirement list | Ranking + a list to cut |
| A metrics export | Conclusion + likely causes + how to verify |
| A launch plan | Risk list + blockers + fallback |
| Negative reviews | Categories + blast radius + fix or ignore |
| A kickoff application | Gaps + whether it belongs in a steering meeting |
| Nothing but a deadline | The minimum shippable scope |

When material is thin, it says what is missing instead of filling the gap with boilerplate.

### Six roles take turns

| Role | Looks at |
|---|---|
| Product | Is the goal clear, is scope creeping, is it worth it |
| Engineering | Can it be built, are interfaces defined, how long |
| QA | How to verify, exception paths, boundaries |
| Design | Consistency, empty states, feedback |
| Operations | Instrumentation, rollout, rollback |
| Legal | Privacy, compliance, content review |

Graded **blocking / important / suggestion**, verdict in three tiers: ship, ship with conditions, do not ship.

> The verdict is not the valuable part. The disagreement is. Where two roles reach opposite conclusions is exactly what the meeting will fight over.

When material is too thin (one sentence, a couple of screenshots), it lists the gaps instead of pretending to review.

### Grading what you already wrote

| Document | Five dimensions, 0–3 each |
|---|---|
| PRD | Problem definition, goals and acceptance, scope, dependencies and risk, instrumentation |
| Competitor analysis | Conclusion first, evidence traceable, gap quantified, action proposed |
| Data retro | Hypothesis stated, definitions consistent, attribution layered, next step concrete |
| Kickoff application | Market judgment, model credibility, resourcing fit, risk and exit |
| Interview synthesis | Sample described, quotes kept, clustering grounded, opportunities testable |
| Launch plan | Rollout rules, rollback triggers, owners named, metrics watched |

**One zero and it does not ship.** Three verdicts only: ship it, fix two things, rewrite.

And the reverse rule holds too: if it ships, say so. Over-critique once and nobody asks you again.

### Output beyond Markdown

Three single-file HTML templates, inline styles, double-click to open, print straight to PDF.

| Template | What is on it |
|---|---|
| `asset report` | Status page: one-line verdict, metric cards, progress, risk table |
| `asset review` | Review page: six-role scores, graded issues, disagreement columns |
| `asset grade` | Scorecard: three-tier verdict, dimension scores as dots, deductions quoted from the source |

Better for a weekly update to your boss or a review pack than a Markdown table.

---

## Commands

| Command | Does |
|---|---|
| `pm-ai-skill install` | Install into every AI tool detected |
| `pm-ai-skill template prd` | Fetch a template (14 available) |
| `pm-ai-skill example grade` | Read a sample (15 available) |
| `pm-ai-skill doc prompt` | Read docs (capability / prompt / workflow / FAQ / tools / survey) |
| `pm-ai-skill asset report` | Export HTML (report / review / grade) |
| `pm-ai-skill eval` | List the 27 behavior cases; pass an id for one |
| `pm-ai-skill manifest` | Export the machine-readable manifest |
| `pm-ai-skill info` | Show version and installed tools |

You rarely need commands. Plain language works:

```
Grade this PRD — can it go into review
Here are my interview notes, what can you pull out
Rank these with RICE, then cut the MVP with MoSCoW
```

---

## 76 modules

<details>
<summary>Open the list (ten categories)</summary>

| Category | Count | Modules |
|---|---|---|
| Discovery & prioritization | 8 | RICE · MoSCoW · Kano · Impact-Effort · JTBD · Working Backwards · Requirement 5 Questions · Interview Parsing |
| User research | 11 | Segmentation · Survey design · Depth interview · Usability testing · A/B testing · NPS/CSAT/CES · Focus group · Diary study · Card sorting · Feedback clustering · Behavioral analytics |
| Competitive & market | 9 | Opportunity solution tree · Competitor analysis · Market gap · Switching drivers · TAM/SAM/SOM · Feature teardown · Positioning · SWOT/PESTLE/Five Forces · Vendor research |
| Strategy & planning | 8 | Product vision · Project initiation · OKR · Roadmap · Sprint planning · Bet assessment · Business model canvas · North star |
| Solution design | 7 | Product architecture · User story · Journey map · Mind map · Storyboard · Diagram playbook · Excalidraw output |
| Documentation | 5 | PRD · Business case one-pager · Release notes · Functional spec · Review prep |
| Collaboration | 9 | Meeting minutes · Stakeholder map · Pre-mortem · Delivering bad news · Issue escalation · Sales enablement · Growth flywheel · Persona · Aligning with engineering |
| Data & metrics | 7 | Data analysis · Metric hierarchy · HEART · AI product metrics · RICE retro · PMF · Cost of delay |
| Monetization & growth | 7 | Pricing strategy · AARRR · RARRA · Unit economics · GTM · Customer success · Project retro |
| Self-improvement | 5 | Feedback learning · Personal case library · Growth tracking · Error retro · Prompt self-tuning |

When to use each module: [capability list](docs/capability.md). Ready-to-copy prompts: [prompt library](docs/prompt-reference.md) (92 entries). What to practice at each career stage: [growth path](docs/growth-path.md).

</details>

---

## Templates and samples

Templates give the skeleton; samples set the bar. Every sample ends with a short note on why it qualifies — read it against your own draft.

| Sample | What it is |
|---|---|
| `example review` | Six-role review: 2 blocking, 4 important, 3 suggestions, 6 things you can leave alone |
| `example okr` | Quarterly OKR: why process KRs beat outcome KRs, and what is explicitly not being done |
| `example roadmap` | Quarterly roadmap: scoring, the three things cut, and slack left for surprises |
| `example persona` | B2B persona: his day and who appraises him, not hobbies |
| `example gtm` | Small-tool launch: pricing rationale, channel order, kill criteria |
| `example grade` | Grading a PRD: five scores, deductions quoted from the text, two must-fix items |
| `example prd` | Full PRD, problem statement through instrumentation |
| `example rice` | RICE ranking with the arithmetic and the cut list |
| `example competitor` | Competitor analysis: comparison table and a follow-or-not verdict |
| `example discovery` | Interview synthesis: quotes, clusters, opportunities |
| `example strategy` | One-page strategy |
| `example launch` | Launch plan |
| `example metrics` | Metric tree |
| `example premortem` | Pre-mortem |
| `example mindmap` | Mindmap |

---

## Layout

```
skill-source/   system-prompt.md (core) + manifest.json + triggers.md
docs/           capabilities · 92 prompts · workflows · tools · survey · FAQ
templates/      14 templates        examples/   15 samples
assets/         3 HTML reports      evals/      27 regression cases
```

---

## What it can't do

- **No numbers handed to you.** Market size, growth rate, point gains — you compute them. It gives methods and decompositions.
- **No decisions made for you.** Evidence and risk lists, but you sign off.
- **No guarantee of correctness.** AI can build a very reasonable answer on a wrong premise. Anything touching money, legal or safety gets a human check.
- **No substitute for first-hand information.** It cannot guess what users think. Feed it interviews or mark the gap as an assumption.
- **No knowledge of your company.** Org politics, legacy baggage, who dislikes whom — none of that is visible. If a plan will not land, check there first.
- **No production code.** Prototypes and interface contracts, yes. Code, no.
- **Out of scope**: pricing execution, paid acquisition, model selection, specific regulatory regimes, complex B2B sales cycles.

---

## About the author

**itxinfei** (心飞为你飞) has worked on both sides — product and engineering — and now writes PRDs and code. This skill is what accumulated while doing the work, not something assembled from a tutorial.

- GitHub: [github.com/itxinfei](https://github.com/itxinfei)
- Gitee: [gitee.com/itxinfei](https://gitee.com/itxinfei)

---

<div align="center">

MIT License · itxinfei (心飞为你飞)

[GitHub](https://github.com/itxinfei/pm-ai-skill) · [Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [Issues](https://github.com/itxinfei/pm-ai-skill/issues)

</div>
