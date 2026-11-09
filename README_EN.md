<div align="center">

# pm-ai-skill

An AI assistant for product managers, not a textbook.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Author](https://img.shields.io/badge/Author-itxinfei-orange.svg?style=flat-square)](https://github.com/itxinfei)
[![npm version](https://img.shields.io/npm/v/@itxinfei/pm-ai-skill.svg?style=flat-square)](https://www.npmjs.com/package/@itxinfei/pm-ai-skill)
[![Platform](https://img.shields.io/badge/Platform-13%20%2B%20AI%20Tools-brightgreen.svg?style=flat-square)](#supported-tools)

[Gitee](https://gitee.com/itxinfei/pm-ai-skill) · [GitHub](https://github.com/itxinfei/pm-ai-skill)

Author: itxinfei

[中文文档](README.md)

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

Product architecture, user stories, customer journey maps, mind maps, storyboards, diagramming guides.

### Documentation

PRDs, one-page business cases, release notes, functional specs, review prep.

### Collaboration

Meeting notes, stakeholder maps, pre-mortems, risk communication, issue tracking, sales enablement, working with engineers.

### Data & Metrics

Data analysis, metric hierarchy, HEART framework, AI product metrics, RICE retrospectives, PMF, cost of delay.

### Monetization & Growth

Pricing strategy, AARRR, RARRA, growth loops, unit economics, GTM, customer success, retrospectives.

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

## Project structure

```
pm-ai-skill/
├── install.ps1
├── skill-source/
│   ├── skill.json
│   ├── system-prompt.md
│   └── triggers.md
├── templates/
├── docs/
└── examples/
```

7 ready-to-use templates and 4 anonymized examples are included.

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
