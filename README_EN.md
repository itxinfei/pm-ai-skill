<div align="center">

# pm-ai-skill

An AI assistant for product managers, not a textbook.

Say "write me a PRD" to an AI and you get a template to fill in. Anyone can write a template.

What actually blocks you: should this feature ship at all, where do you start on competitor research, retention dropped so what do you touch first, what breaks on launch day, what does "we can't build that" really mean.

These 76 modules are those positions, one by one. Just describe what you're stuck on — it recognizes the shape of the problem.

There are two things beyond the modules. A triage rule: it decides whether you want a judgment, a deliverable, or a whole chain, before it answers. And a six-role review: product, engineering, QA, design, ops, legal each walk through your plan, so the problems surface before the meeting does.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei-orange.svg?style=flat-square)](https://github.com/itxinfei)
[![npm version](https://img.shields.io/npm/v/@itxinfei/pm-ai-skill.svg?style=flat-square)](https://www.npmjs.com/package/@itxinfei/pm-ai-skill)
[![GitHub release](https://img.shields.io/github/v/release/itxinfei/pm-ai-skill?style=flat-square&label=Release)](https://github.com/itxinfei/pm-ai-skill/releases)
[![Platform](https://img.shields.io/badge/Platform-13%20%2B%20AI%20Tools-brightgreen.svg?style=flat-square)](#supported-tools)
[![Stars](https://img.shields.io/github/stars/itxinfei/pm-ai-skill?style=flat-square&color=yellow)](https://github.com/itxinfei/pm-ai-skill/stargazers)

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill) · [Releases](https://github.com/itxinfei/pm-ai-skill/releases) · [Capability list](docs/capability.md) · [Prompt library](docs/prompt-reference.md) · [Workflow guide](docs/workflow-guide.md) · [Tool cheat sheet](docs/tools.md) · [FAQ](docs/faq.md)

Author: itxinfei

[中文文档](README.md)

*Detailed docs are written in Chinese.*

</div>

---

## Install

Pick whichever works for you.

### npm

```bash
npm i -g @itxinfei/pm-ai-skill
pm-ai-skill install
```

### Windows one-click script

```powershell
irm https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.ps1 | iex
```

### macOS / Linux one-click script

```bash
curl -fsSL https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.sh | bash
```

The scripts detect which tools you have installed and set up the skill for each one.

### Supported tools

| Type | Tool | Global skills path |
|---|---|---|
| China | WorkBuddy | `~/.workbuddy/skills` |
| China | TraeCode CN | `~/.trae-cn/skills` |
| China | Trae | `~/.trae/skills` |
| China | Doubao | `~/.agents/skills` |
| Global | Claude Code | `~/.claude/skills` |
| Global | Codex | `~/.codex/skills` |
| Global | Gemini CLI | `~/.gemini/skills` |
| Global | Cursor | `~/.cursor/skills` |
| Global | Windsurf | `~/.codeium/windsurf/skills` |
| Global | Kiro | `~/.kiro/skills` |
| Global | OpenCode | `~/.opencode/skills` |
| Global | Continue | `~/.continue/skills` |
| Common | Cline / Roo Code, etc. | `~/.agents/skills` |

If no tools are detected, the skill is placed in `~/.agents/skills` and the current directory.

### Manual zip download

1. Download: <https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip>
2. Unzip
3. Rename `skill-source/` to `pm-ai-skill/`
4. Drop it into your tool's skills directory

### Copy the prompt

Don't want to install anything? Open [skill-source/system-prompt.md](skill-source/system-prompt.md), paste it into the system prompt of ChatGPT / Claude / Doubao, and you're good to go.

---

## What's inside

### Discovery & Prioritization

RICE, MoSCoW, Kano, Impact-Effort, JTBD, Working Backwards, requirement clarification, interview analysis.

### User Research

User segmentation, surveys, in-depth interviews, usability testing, A/B testing, NPS / CSAT / CES, focus groups, diary studies, card sorting, feedback clustering, behavioral analytics.

### Competitive & Market

Opportunity Solution Tree, competitor analysis, market gaps, switching drivers, TAM / SAM / SOM, feature breakdown, positioning, SWOT + PESTLE + Porter's Five Forces, vendor research.

### Strategy & Planning

Product vision, project initiation (8 steps), OKRs, roadmaps, sprint planning, bet sizing, north star metric, business model canvas.

### Solution Design

Product architecture, user stories, customer journey maps, mind maps, storyboards, diagramming guides, Excalidraw output.

### Documentation

PRDs, one-page business cases, release notes, functional specs, review prep.

### Collaboration

Meeting notes, stakeholder maps, pre-mortems, risk communication, issue tracking, sales enablement, growth loops, user personas, working with engineers.

### Data & Metrics

Data analysis, metric hierarchy, HEART framework, AI product metrics, RICE retrospectives, PMF, cost of delay.

### Monetization & Growth

Pricing strategy, AARRR, RARRA, unit economics, GTM, customer success, retrospectives.

### Self-Improvement

Feedback learning, personal case library, growth tracking, mistake retrospectives, prompt self-optimization.

---

## How to use

You don't need to memorize commands. Just talk normally:

```
Prioritize these requirements with RICE, then cut MVP scope with MoSCoW
```

```
Design a usability test for the checkout flow
```

```
Walk me through the project initiation process for a new product
```

---

## How it takes work

Modules are parts. This is how they get assembled.

| Type | Looks like | Gets you |
|---|---|---|
| Judgment | "should we build this", "is this a real need" | A verdict and the reasoning. No document. |
| Deliverable | "write a PRD", "rank these", "draft a roadmap" | The thing itself |
| Chain | "take it from idea to buildable" | Step by step, with handoffs |

Quick test when unsure: do they want a conclusion, or something they can hand to someone else?

### Six chains

| Chain | When | Steps |
|---|---|---|
| A Idea to buildable | New idea needs landing | Health check → PRD → review → revise → tracking spec |
| B Release planning | Too many requests, no order | Backlog → rank → roadmap |
| C Metric dropped | Retention or conversion sliding | Read data → hypothesize → experiment → track → retro |
| D Research round | Need to know what users actually think | Goal → fix questions → survey/interview → analyze → turn into requests |
| E Competitor-driven | A competitor shipped something | Teardown → decide whether to follow → join A |
| F Pre-launch check | Shipping tomorrow | Pre-mortem → walkthrough → tracking check → rollout plan |

One rule holds every chain together: the output of each step must be a legal input to the next. If it doesn't fit, that step isn't done.

### Four rules for running a chain

1. **Quote before starting** — how many steps, what each delivers, which ones need your call. You can cut steps.
2. **Handoff summary under 10 lines** — this step's conclusion plus what the next step needs.
3. **Every step stands alone** — stop anytime, what you have is usable.
4. **Never push** — one step when one step is all that's needed.

### Three strictness levels

| Level | When | How |
|---|---|---|
| Quick screen | Still diverging | Blockers and structural issues only |
| Standard (default) | Before the review meeting | Full pass |
| Final gate | Shipping tomorrow | Any compliance, rollback, or acceptance-criteria issue escalates to blocker |

---

## What you bring

Most people arrive holding a document, not a question. The document is usually clearer than the sentence.

| You bring | You get |
|---|---|
| Interview recordings or notes | Opportunity list plus the questions you forgot to ask |
| Competitor sites, screenshots, filings | Comparison table and a follow-or-not call |
| "I want to build X" | A do-or-don't judgment and the next step |
| A finished PRD | A score, not a rewrite |
| A long backlog | Ranking, plus the names it suggests you cut |
| Dashboards or event data | A read, a few candidate causes, how to test them |
| A launch plan or schedule | Risk list, blockers, fallback |
| Bad reviews or complaint screenshots | Classification, blast radius, fix-or-not |
| A business case | Gaps and whether it belongs in the review |
| Nothing but a deadline | The minimum shippable scope |

It reads before it asks. It won't open with "what do you want to build" — it opens with "here's what I see in this," and being wrong is faster to correct than answering five empty questions.

---

## Multi-role review

Six perspectives, each asking only what it should.

| Role | Watches for |
|---|---|
| Product | Clear goal, scope creep, worth doing |
| Engineering | Feasibility, interface definitions, effort |
| QA | Acceptance criteria, exception paths, boundaries |
| Design | Consistency, empty states, feedback |
| Ops | Tracking, rollout, rollback |
| Legal | Privacy, compliance, content moderation |

Output is graded blocker / important / suggestion, closing with one verdict: ships, ships with conditions, or doesn't ship.

The value isn't the verdict — it's the **disagreements**. Where two roles reach opposite conclusions, that gets pulled out separately. That's what the meeting is actually for.

---

## Grading what you have

When you hand over something finished and ask "is this good enough," it scores before it edits.

Different artifacts get different criteria:

| Artifact | Criteria (0-3 each) |
|---|---|
| PRD | Problem definition, goals and acceptance, scope boundaries, dependencies and risks, tracking |
| Competitive analysis | Conclusion first, verifiable evidence, quantified gap, recommended action |
| Data retro | Explicit hypothesis, consistent definitions, layered attribution, concrete next step |
| Business case | Market read, credible model, resourcing fit, risks and exit criteria |
| Interview notes | Sample described, verbatim evidence, defensible clustering, testable opportunities |
| Launch plan | Rollout rules, rollback conditions, named owners, metrics being watched |

One zero means it doesn't ship — the rest of the scores stop mattering. Three verdicts only: ships, fix two things first, rewrite.

The other half of the rule matters as much: if it's good, say it's good. Add at most two optional bonuses. Over-critiquing teaches people to stop asking.

Sample: `pm-ai-skill example grade`

---

## HTML output

Two single-file HTML report templates. Double-click to view, print straight to PDF.

```
pm-ai-skill asset report     # Status report: verdict, metrics, progress, risks
pm-ai-skill asset review     # Review report: six-role scores, graded issues, disagreements
```

---

## Project structure

```
pm-ai-skill/
├── install.ps1
├── install.sh
├── skill-source/
│   ├── skill.json
│   ├── system-prompt.md   # 76 modules + triage + multi-role review + grading
│   ├── manifest.json      # Machine-readable index: id / category / one-line definition
│   └── triggers.md
├── templates/             # 13 templates
├── docs/                  # capability, prompts, workflow, tools, ecosystem, FAQ
├── examples/              # 10 real output samples, the quality bar
├── assets/                # 2 HTML report templates
├── evals/                 # Behavior regression cases
└── bin/index.js           # install / template / example / doc / asset / manifest / info
```

13 ready-to-use templates and 4 anonymized examples are included.

---

## What it can't do

Better to know now.

- **No numeric verdicts.** Market size, growth rates, conversion lift — you calculate or look them up. It gives you the method.
- **Doesn't decide for you.** It gives reasoning and a risk list. You make the call.
- **Doesn't guarantee correctness.** AI can build a very plausible answer on a wrong premise. Anything touching money, legal, or safety needs human review.
- **Can't replace first-hand information.** How users feel, what customers actually said — it can't guess. Feed it interviews, or it marks things as assumptions.
- **Doesn't know your company.** Org politics, legacy baggage, who dislikes whom. If a plan won't land, consider those first.
- **Doesn't write production code.** Prototypes and interface contracts, yes. Code, no.
- **Out of scope:** pricing model implementation, ad buying, algorithm selection, China-specific regulatory compliance, complex B2B sales cycles.

---

## Things to know

- This is an assistant, not a replacement for your judgment. Verify numbers, competitor info, and user feedback yourself.
- User stories always include acceptance criteria. A/B tests always include stop conditions.
- Pricing recommendations include at least two options. TAM/SAM/SOM are given as ranges, not exact numbers.
- All examples and templates are anonymized. No sensitive data is stored.

Found a bug? Open an issue. Want to add something? Submit a PR.

---

<div align="center">

MIT License · itxinfei

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill)

</div>
