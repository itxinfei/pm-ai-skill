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
function getAllToolPaths() {
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
  .command('install')
  .description('安装到所有检测到的 AI 工具')
  .action(() => {
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
    console.log(`检测到 ${targets.length} 个工具：`);
    for (const t of targets) {
      const dest = path.join(t.path, 'pm-ai-skill');
      const existed = fs.existsSync(dest);
      copyDirSync(skillSourceDir, dest);
      copyAssets(dest);
      console.log(`  -> ${t.name}: ${dest}${existed ? '（已覆盖旧版本）' : ''}`);
    }
    console.log('安装完成，重启对应工具即可使用。');
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
  .description('查看文档：capability / prompt / workflow / faq / tools / awesome / growth / deliver')
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
