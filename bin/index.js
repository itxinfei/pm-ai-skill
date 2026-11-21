#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const os = require('os');

const pkgRoot = path.resolve(__dirname, '..');
const skillSourceDir = path.join(pkgRoot, 'skill-source');
const templatesDir = path.join(pkgRoot, 'templates');
const docsDir = path.join(pkgRoot, 'docs');
const examplesDir = path.join(pkgRoot, 'examples');
const assetsDir = path.join(pkgRoot, 'assets');
const evalsFile = path.join(pkgRoot, 'evals', 'cases.json');

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirSync(s, d);
    else fs.copyFileSync(s, d);
  }
}

// 模板、文档、样例、HTML 报告不是可选的附件：system-prompt 里写着"手边有 14 个模板"，
// 目标目录里没有这些文件，AI 就只能凭记忆编。装 skill 时必须一起带过去。
const assetDirs = [
  ['templates', templatesDir],
  ['docs', docsDir],
  ['examples', examplesDir],
  ['assets', assetsDir],
];

function copyAssets(dest) {
  for (const [name, src] of assetDirs) {
    if (fs.existsSync(src)) copyDirSync(src, path.join(dest, name));
  }
}

// 所有支持的工具及其全局 skills 目录
function getToolDefs() {
  const home = os.homedir();
  const isWin = process.platform === 'win32';
  const isMac = process.platform === 'darwin';

  const tools = [
    // 国产
    { name: 'WorkBuddy', paths: isWin
      ? [path.join(process.env.APPDATA, 'WorkBuddy', 'skills'), path.join(home, '.workbuddy', 'skills')]
      : isMac
        ? [path.join(home, 'Library', 'Application Support', 'WorkBuddy', 'skills'), path.join(home, '.workbuddy', 'skills')]
        : [path.join(home, '.workbuddy', 'skills')]
    },
    { name: 'TraeCode CN', paths: [path.join(home, '.trae-cn', 'skills')] },
    { name: 'Trae', paths: [path.join(home, '.trae', 'skills')] },
    { name: '豆包', paths: isWin
      ? [path.join(home, 'Doubao', 'skills'), path.join(home, '.doubao', 'skills')]
      : isMac
        ? [path.join(home, 'Library', 'Application Support', 'Doubao', 'skills'), path.join(home, '.doubao', 'skills')]
        : [path.join(home, '.config', 'Doubao', 'skills'), path.join(home, '.doubao', 'skills')]
    },
    // 国外
    { name: 'Claude Code', paths: [path.join(home, '.claude', 'skills')] },
    { name: 'Codex', paths: [path.join(home, '.codex', 'skills')] },
    { name: 'Gemini CLI', paths: [path.join(home, '.gemini', 'skills')] },
    { name: 'Cursor', paths: [path.join(home, '.cursor', 'skills')] },
    { name: 'Windsurf', paths: [path.join(home, '.codeium', 'windsurf', 'skills')] },
    { name: 'Kiro', paths: [path.join(home, '.kiro', 'skills')] },
    { name: 'OpenCode', paths: [path.join(home, '.opencode', 'skills')] },
    { name: 'Continue', paths: [path.join(home, '.continue', 'skills')] },
    // 通用约定
    { name: '通用 .agents', paths: [path.join(home, '.agents', 'skills')] },
  ];

  return tools;
}

function readSkillMeta(dir) {
  const sj = path.join(dir, 'skill.json');
  if (!fs.existsSync(sj)) return null;
  try {
    const j = JSON.parse(fs.readFileSync(sj, 'utf8'));
    return { version: j.version || null, name: j.name || null };
  } catch (e) {
    return { version: null, name: null, broken: true };
  }
}

function countFiles(dir) {
  let n = 0;
  const walk = (p) => {
    for (const e of fs.readdirSync(p, { withFileTypes: true })) {
      const full = path.join(p, e.name);
      if (e.isDirectory()) walk(full);
      else n += 1;
    }
  };
  if (fs.existsSync(dir)) walk(dir);
  return n;
}

const shortenPath = (p) => p.replace(os.homedir(), '~');

// 覆盖前把旧版挪走一份。同一版本只备份一次，别每装一次就堆一层
function backupInstalled(dest, version) {
  const root = path.join(os.homedir(), '.pm-ai-skill-backup');
  const target = path.join(root, version || 'unknown');
  if (fs.existsSync(target)) return null;
  fs.mkdirSync(root, { recursive: true });
  copyDirSync(dest, target);
  return target;
}

function sourceVersion() {
  const m = readSkillMeta(skillSourceDir);
  return (m && m.version) || null;
}

// SKILL.md 的 frontmatter 缺 name/description，工具会当普通文档，不加载成 skill
function checkSkillMd(dir) {
  const f = path.join(dir, 'SKILL.md');
  if (!fs.existsSync(f)) return '缺 SKILL.md';
  const t = fs.readFileSync(f, 'utf8');
  const hasFront = /^---/.test(t.trim());
  const hasName = /^\s*name\s*:\s*\S/m.test(t);
  const hasDesc = /^\s*description\s*:\s*\S/m.test(t);
  if (!hasFront) return 'SKILL.md 没有 frontmatter';
  if (!hasName) return 'SKILL.md 缺 name';
  if (!hasDesc) return 'SKILL.md 缺 description';
  return null;
}

function getAllToolPaths() {
  const tools = getToolDefs();
  const found = [];
  const seen = new Set();
  for (const tool of tools) {
    for (const p of tool.paths) {
      if (fs.existsSync(p) && !seen.has(p)) {
        seen.add(p);
        found.push({ name: tool.name, path: p });
      }
    }
  }
  return found;
}

program
  .name('pm-ai-skill')
  .description('产品经理全链路 AI Skill，支持 13+ AI 工具')
  .version(require('../package.json').version);

program
  .command('status')
  .alias('doctor')
  .description('看每个 AI 工具里装的是哪一版，跟源比落后多少')
  .action(() => {
    const version = sourceVersion();
    const rows = [];
    for (const t of getToolDefs()) {
      for (const p of t.paths) {
        if (!fs.existsSync(p)) continue;
        const dest = path.join(p, 'pm-ai-skill');
        if (!fs.existsSync(dest)) {
          rows.push({ tool: t.name, where: shortenPath(dest), state: '没装', kind: 'none' });
          continue;
        }
        const m = readSkillMeta(dest) || {};
        const mdProblem = checkSkillMd(dest);
        if (m.broken) {
          rows.push({ tool: t.name, where: shortenPath(dest), state: 'skill.json 读不出来', kind: 'bad' });
        } else if (!m.version) {
          rows.push({ tool: t.name, where: shortenPath(dest), state: '装了但没有版本号', kind: 'bad' });
        } else if (mdProblem) {
          rows.push({ tool: t.name, where: shortenPath(dest), state: mdProblem, kind: 'bad' });
        } else if (m.version === version) {
          rows.push({ tool: t.name, where: shortenPath(dest), state: `${m.version} 最新`, kind: 'ok' });
        } else {
          rows.push({ tool: t.name, where: shortenPath(dest), state: `${m.version} → ${version} 要更新`, kind: 'old' });
        }
      }
    }
    if (!rows.length) {
      console.log('一个工具目录都没找到。先装 AI 工具，或者用 pm-ai-skill export-zip 手动放。');
      return;
    }
    console.log(`源：${version}，skill 本体 ${countFiles(skillSourceDir)} 个文件 + 模板/文档/示例/报告资源`);
    console.log('');
    for (const r of rows) {
      console.log(`  ${r.tool.padEnd(13)} ${r.where.padEnd(36)} ${r.state}`);
    }
    const old = rows.filter((r) => r.kind === 'old' || r.kind === 'bad');
    const none = rows.filter((r) => r.kind === 'none');
    console.log('');
    if (!old.length && !none.length) {
      console.log(`${rows.length} 个位置都是 ${version}，没落下。`);
      return;
    }
    console.log(`${rows.length} 个位置：${old.length} 处旧版或损坏，${none.length} 处没装。`);
    if (old.length) {
      console.log('旧版不会自动更新——工具里跑的还是旧 prompt，新加的命令它不知道。');
      process.exitCode = 1;
    }
    console.log('跑 pm-ai-skill install 一次全更新，旧版会先备份到 ~/.pm-ai-skill-backup/。');
  });

program
  .command('install')
  .description('安装到所有检测到的 AI 工具')
  .action(() => {
    const version = sourceVersion();
    const targets = getAllToolPaths();
    if (targets.length === 0) {
      // 兜底：装到 .agents/skills 和当前目录
      const fallback = path.join(os.homedir(), '.agents', 'skills');
      const dest = path.join(fallback, 'pm-ai-skill');
      copyDirSync(skillSourceDir, dest);
      copyAssets(dest);
      console.log(`未检测到已安装的工具，已安装到：${dest}`);
      const local = path.join(process.cwd(), 'pm-ai-skill');
      const alreadyHere = fs.existsSync(path.join(process.cwd(), 'skill-source', 'system-prompt.md'));
      if (alreadyHere || fs.existsSync(local)) {
        console.log('当前目录里已经是这份内容，不再复制一份。');
      } else {
        copyDirSync(skillSourceDir, local);
        copyAssets(local);
        console.log(`同时释放到当前目录：${local}`);
      }
      return;
    }
    console.log(`检测到 ${targets.length} 个工具，源版本 ${version}：`);
    const fresh = [];
    const updated = [];
    const same = [];
    const errors = [];
    for (const t of targets) {
      const dest = path.join(t.path, 'pm-ai-skill');
      const before = fs.existsSync(dest) ? readSkillMeta(dest) : null;
      let note;
      if (!before) {
        note = `新装 ${version}`;
        fresh.push(t.name);
      } else if (before.version && before.version !== version) {
        const bak = backupInstalled(dest, before.version);
        note = `${before.version} → ${version}${bak ? '（旧版备份到 ' + shortenPath(bak) + '）' : ''}`;
        updated.push(t.name);
      } else if (before.version === version) {
        note = `已是 ${version}，重写一遍保证一致`;
        same.push(t.name);
      } else {
        note = `装过但读不出版本，按 ${version} 覆盖`;
        updated.push(t.name);
      }
      copyDirSync(skillSourceDir, dest);
      copyAssets(dest);
      // 复制不报错不等于装对了，立刻读回来校验
      const after = readSkillMeta(dest) || {};
      if (after.version !== version) errors.push(`${t.name}：装完版本是 ${after.version || '读不出'}`);
      const mdProblem = checkSkillMd(dest);
      if (mdProblem) errors.push(`${t.name}：${mdProblem}`);
      console.log(`  ${t.name.padEnd(14)} ${shortenPath(dest)}  ${note}`);
    }
    const bad = targets.filter((t) => {
      const dest = path.join(t.path, 'pm-ai-skill');
      return countFiles(dest) < countFiles(skillSourceDir);
    });
    for (const t of bad) errors.push(`${t.name}：文件数少于源，可能没复制全`);

    console.log('');
    console.log(`安装完成：新装 ${fresh.length} 处，更新 ${updated.length} 处，已是新版 ${same.length} 处`);
    if (errors.length) {
      console.log(`校验没过 ${errors.length} 处：`);
      for (const e of errors) console.log(`  ${e}`);
      process.exitCode = 1;
      return;
    }
    console.log(`校验：${targets.length} 处 skill.json 版本都是 ${version}，文件齐了。重启对应工具后生效。`);
  });

program
  .command('export-zip')
  .description('导出 skill zip 包')
  .action(async () => {
    const archiver = require('archiver');
    const outPath = path.join(process.cwd(), 'pm-ai-skill.zip');
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => console.log(`导出成功：${outPath}（${archive.pointer()} bytes）`));
    archive.on('error', (err) => { throw err; });
    archive.pipe(output);
    archive.directory(skillSourceDir, false);
    for (const [name, src] of assetDirs) {
      if (fs.existsSync(src)) archive.directory(src, name);
    }
    await archive.finalize();
  });

program
  .command('template [name]')
  .description('查看模板：prd / prd-b2b / meeting / interview / bmc / competitor / roadmap / retrospective / initiation / okr / abtest / premortem / persona / metrics')
  .action((name) => {
    const map = {
      prd: 'prd-template.md',
      'prd-b2b': 'prd-b2b-template.md',
      meeting: 'meeting-minutes-template.md',
      interview: 'interview-script-sample.md',
      bmc: 'business-model-checklist.md',
      competitor: 'competitor-analysis-template.md',
      roadmap: 'roadmap-template.md',
      retrospective: 'retrospective-template.md',
      initiation: 'initiation-template.md',
      okr: 'okr-template.md',
      abtest: 'ab-test-plan-template.md',
      premortem: 'pre-mortem-checklist.md',
      persona: 'persona-card-template.md',
      metrics: 'metric-tree-template.md',
    };
    if (!name) {
      console.log('可用模板：' + Object.keys(map).join(', '));
      return;
    }
    const f = map[name];
    if (!f) {
      console.log('可用模板：' + Object.keys(map).join(', '));
      return;
    }
    console.log(fs.readFileSync(path.join(templatesDir, f), 'utf8'));
  });

program
  .command('doc [name]')
  .description('查看文档：capability / prompt / workflow / faq / tools / awesome / growth / deliver / flow / score')
  .action((name) => {
    const map = {
      capability: 'capability.md',
      prompt: 'prompt-reference.md',
      workflow: 'workflow-guide.md',
      faq: 'faq.md',
      tools: 'tools.md',
      awesome: 'awesome-pm-skills.md',
      growth: 'growth-path.md',
      deliver: 'deliver.md',
      flow: 'flow.md',
      score: 'score.md',
    };
    if (!name) {
      console.log('可用文档：' + Object.keys(map).join(', '));
      return;
    }
    const f = map[name];
    if (!f) {
      console.log('可用文档：' + Object.keys(map).join(', '));
      return;
    }
    console.log(fs.readFileSync(path.join(docsDir, f), 'utf8'));
  });

program
  .command('example [name]')
  .description('查看示例：prd / rice / competitor / mindmap / discovery / grade / launch / metrics / premortem / strategy / review / okr / roadmap / persona / gtm')
  .action((name) => {
    const map = {
      prd: 'prd-example.md',
      rice: 'rice-priority-example.md',
      competitor: 'competitor-analysis-sample.md',
      mindmap: 'mindmap-sample.md',
      discovery: 'discovery-synthesis-sample.md',
      grade: 'grade-sample.md',
      launch: 'launch-plan-sample.md',
      metrics: 'metric-tree-sample.md',
      premortem: 'pre-mortem-sample.md',
      strategy: 'strategy-one-pager-sample.md',
      review: 'review-sample.md',
      okr: 'okr-sample.md',
      roadmap: 'roadmap-sample.md',
      persona: 'persona-sample.md',
      gtm: 'gtm-sample.md',
    };
    if (!name) {
      console.log('可用示例：' + Object.keys(map).join(', '));
      return;
    }
    const f = map[name];
    if (!f) {
      console.log('可用示例：' + Object.keys(map).join(', '));
      return;
    }
    console.log(fs.readFileSync(path.join(examplesDir, f), 'utf8'));
  });

program
  .command('asset [name]')
  .description('导出 HTML 报告模板：report / review / grade')
  .action((name) => {
    const map = {
      report: 'report.html',
      review: 'review.html',
      grade: 'grade.html',
    };
    if (!name || !map[name]) {
      console.log('可用 HTML 模板：' + Object.keys(map).join(', '));
      console.log('导出后会放在当前目录，浏览器直接打开，也可以打印成 PDF。');
      return;
    }
    const dest = path.join(process.cwd(), map[name]);
    fs.copyFileSync(path.join(assetsDir, map[name]), dest);
    console.log(`已导出：${dest}`);
    console.log('浏览器打开，替换其中示例内容即可使用。');
  });

program
  .command('eval [id]')
  .description('查看行为回归用例：不带参数列全部，带 id 看单条')
  .action((id) => {
    const data = JSON.parse(fs.readFileSync(evalsFile, 'utf8'));
    const cases = data.cases || [];
    if (!id) {
      console.log(`共 ${cases.length} 条行为回归用例。用法：pm-ai-skill eval <id>`);
      const groups = {};
      for (const c of cases) {
        (groups[c.category] = groups[c.category] || []).push(c.id);
      }
      for (const [cat, ids] of Object.entries(groups)) {
        console.log(`\n${cat}`);
        for (const cid of ids) {
          const c = cases.find((x) => x.id === cid);
          console.log(`  ${cid}  ${c.input.slice(0, 40)}`);
        }
      }
      console.log('\n怎么跑：把 input 发给装了 skill 的 AI，对照 checks 逐条判断，见 evals/README.md');
      return;
    }
    const c = cases.find((x) => x.id === id);
    if (!c) {
      console.log(`没有这条用例：${id}。不带参数可以看全部 id。`);
      return;
    }
    console.log(`id：${c.id}\n类别：${c.category}`);
    console.log(`\n输入给 AI 的话：\n${c.input}`);
    console.log(`\n应当出现的行为：\n${c.expected}`);
    console.log(`\n逐条比对：\n${c.checks.map((x, i) => `${i + 1}. ${x}`).join('\n')}`);
  });

program
  .command('deliver [target] [input]')
  .description('交付成指定载体的形状：deliver feishu <file.md>（转成飞书能直接导入的稿子，并列出会踩的坑）')
  .option('--title <title>', '文档标题，不填取文内第一个一级标题')
  .option('--doc-version <v>', '文档版本号，如 v1.0（不要用 --version，那是 CLI 自己的版本）')
  .option('--status <s>', '状态，如 草稿 / 评审中 / 已确认')
  .option('--author <a>', '作者')
  .option('--out <path>', '输出路径')
  .action((target, input, opts) => {
    if (!target || target !== 'feishu') {
      console.log('目前支持：pm-ai-skill deliver feishu <file.md>');
      console.log('它把 Markdown 改成飞书导入能吃的结构：表格列数对齐、标题不跳级、本地图片标出来。');
      return;
    }
    if (!input) {
      console.log('用法：pm-ai-skill deliver feishu <file.md> [--title 标题] [--version v1.0] [--status 草稿] [--author 你]');
      return;
    }
    const { buildDeliver } = require('./feishu');
    let r;
    try {
      r = buildDeliver(input, {
        title: opts.title,
        version: opts.docVersion,
        status: opts.status,
        author: opts.author,
        out: opts.out,
      });
    } catch (e) {
      console.log(e.message);
      return;
    }
    console.log(`已生成：${r.outPath}`);
    console.log(`${r.stats.words} 字 · ${r.stats.tables} 张表 · ${r.stats.headings} 个标题 · ${r.stats.todo} 条待办`);
    if (r.issues.length) {
      console.log(`\n导入前处理这 ${r.issues.length} 处，否则飞书里会变形：`);
      r.issues.forEach((x, i) => console.log(`  ${i + 1}. ${x}`));
    } else {
      console.log('\n没有查到会变形的结构，可以直接导入。');
    }
    console.log('\n导入方式：飞书云文档 → 新建 → 导入文档 → 选这份 .md。导入后检查表格和标题层级。');
  });

program
  .command('flow <subject>')
  .description('一条命令跑完半条链路：需求体检 → PRD 骨架 → 飞书导入稿（内容仍由你填）')
  .option('--out <dir>', '输出目录，默认当前目录下 flow-<需求名>')
  .option('--type <t>', 'PRD 类型：b2b（默认）或 light')
  .option('--author <a>', '作者')
  .action((subject, opts) => {
    const { buildFlow, TYPES } = require('./flow');
    let r;
    try {
      r = buildFlow(subject, opts);
    } catch (e) {
      console.log(e.message);
      if (!opts.type || !TYPES[opts.type]) {
        console.log('可用类型：' + Object.keys(TYPES).join(' / '));
      }
      return;
    }
    console.log(`已生成三份文件到：${r.dir}`);
    for (const f of r.files) {
      console.log(`  ${f.step}. ${f.name}：${path.basename(f.path)}`);
    }
    console.log(`\nPRD 骨架按「${r.type}」出，${r.chapters} 个待填章节。`);
    if (r.issues.length) {
      console.log(`飞书稿还有 ${r.issues.length} 处要处理：`);
      r.issues.forEach((x, i) => console.log(`  ${i + 1}. ${x}`));
    } else {
      console.log('飞书稿可以直接导入，不会变形。');
    }
    console.log('\n接着做：');
    console.log('  1. 把需求发给你装了 skill 的 AI，让它按 01-intake.md 逐条追问，答不上来的留着');
    console.log('  2. 结论写「做」之后，再让它按 02-prd.md 的章节填，填完勾掉进度');
    console.log('  3. 交出去前重跑一次：pm-ai-skill deliver feishu 02-prd.md');
  });

program
  .command('score [id] [output]')
  .description('给 AI 输出打分：score <case-id> <输出文件> 打一条，score all <目录> 批量打（目录内按 <case-id>.md 命名）')
  .option('--json', '输出 JSON，方便两次结果对比')
  .option('--baseline [file]', '和基线比，掉分就以非零码退出（省略路径则用 evals/baseline/claude/score.json）')
  .option('--tolerance <pct>', '允许掉几个百分点不算退步，默认 0', '0')
  .option('--strict', '门禁按全量算，比基线少跑也算没通过')
  .action((id, output, opts) => {
    const { loadCases, scoreCase, scoreDir, renderOne, renderBatch, readOutput, compareBaseline, renderCompare } = require('./score');
    const data = loadCases();

    if (!id) {
      console.log('用法：');
      console.log('  pm-ai-skill score route-001 我的输出.md   打一条，看逐条证据');
      console.log('  pm-ai-skill score all 输出目录            批量打，出通过率');
      console.log('  pm-ai-skill score all 输出目录 --json     出 JSON，和上一版对比');
      console.log('  pm-ai-skill score all 输出目录 --baseline 和基线比，掉分就非零退出（可挂 CI）');
      console.log(`\n共 ${data.cases.length} 条用例，机检规则 ${data.cases.reduce((a, c) => a + (c.auto || []).length, 0)} 条。`);
      console.log('先把用例的 input 发给装了 skill 的 AI，把回答存成 <case-id>.md。');
      return;
    }

    if (id === 'all') {
      if (!output) { console.log('批量评分需要给个目录：pm-ai-skill score all <目录>'); return; }
      let r;
      try { r = scoreDir(output); } catch (e) { console.log(e.message); return; }

      const basePath = opts.baseline === undefined
        ? null
        : (opts.baseline === true ? path.join(__dirname, '..', 'evals', 'baseline', 'claude', 'score.json') : opts.baseline);

      let cmp = null;
      if (basePath) {
        if (!fs.existsSync(basePath)) {
          console.log(`找不到基线文件：${basePath}`);
          process.exitCode = 1;
          return;
        }
        let baseline;
        try {
          baseline = JSON.parse(fs.readFileSync(basePath, 'utf8'));
        } catch (e) {
          console.log(`基线不是合法 JSON：${e.message}`);
          process.exitCode = 1;
          return;
        }
        cmp = compareBaseline(r, baseline, { tolerance: opts.tolerance, fingerprint: r.fingerprint, strict: opts.strict });
      }

      if (opts.json) {
        const out = { generatedAt: new Date().toISOString(), ...r };
        if (cmp) out.baseline = { path: basePath, ...cmp };
        console.log(JSON.stringify(out, null, 2));
      } else {
        console.log(renderBatch(r));
        if (cmp) console.log(renderCompare(cmp, basePath));
      }
      if (cmp && !cmp.ok) process.exitCode = 1;
      return;
    }

    const c = data.cases.find((x) => x.id === id);
    if (!c) { console.log(`没有这条用例：${id}。pm-ai-skill eval 可以看全部 id。`); return; }
    if (!output) {
      console.log(`用法：pm-ai-skill score ${id} <输出文件>`);
      console.log(`把这句话发给装了 skill 的 AI，回答存下来再打分：\n${c.input}`);
      return;
    }
    let text;
    try { text = readOutput(output); } catch (e) { console.log(e.message); return; }
    const r = scoreCase(c, text);
    if (opts.json) {
      console.log(JSON.stringify({ generatedAt: new Date().toISOString(), case: r }, null, 2));
    } else {
      console.log(renderOne(r, c));
    }
  });

program
  .command('manifest')
  .description('导出机器可读清单 manifest.json（模块、分类、链路，给工具和脚本用）')
  .action(() => {
    const src = path.join(skillSourceDir, 'manifest.json');
    const dest = path.join(process.cwd(), 'manifest.json');
    fs.copyFileSync(src, dest);
    const m = JSON.parse(fs.readFileSync(src, 'utf8'));
    console.log(`已导出：${dest}`);
    console.log(`${m.totalModules} 个模块，${m.categories.length} 个分类，${m.chains.length} 条链路，版本 ${m.version}`);
    console.log('字段：id / category / title / definition，可以直接给检索、网站或自己的脚本用。');
  });

program
  .command('info')
  .description('查看 skill 元信息')
  .action(() => {
    const meta = JSON.parse(fs.readFileSync(path.join(skillSourceDir, 'skill.json'), 'utf8'));
    console.log('=== PM-AI-Skill ===');
    console.log(`ID：${meta.id}`);
    console.log(`名称：${meta.name}`);
    console.log(`版本：${meta.version}`);
    console.log(`描述：${meta.description}`);
    console.log(`作者：${meta.author}`);
    console.log(`标签：${(meta.tags || []).join(', ')}`);
  });

program.parse();
