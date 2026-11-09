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

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirSync(s, d);
    else fs.copyFileSync(s, d);
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
      console.log(`未检测到已安装的工具，已安装到：${dest}`);
      const local = path.join(process.cwd(), 'pm-ai-skill');
      copyDirSync(skillSourceDir, local);
      console.log(`同时释放到当前目录：${local}`);
      return;
    }
    console.log(`检测到 ${targets.length} 个工具：`);
    for (const t of targets) {
      const dest = path.join(t.path, 'pm-ai-skill');
      copyDirSync(skillSourceDir, dest);
      console.log(`  -> ${t.name}: ${dest}`);
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
    await archive.finalize();
  });

program
  .command('template [name]')
  .description('查看模板：prd / meeting / interview / bmc / competitor / roadmap / retrospective')
  .action((name) => {
    const map = {
      prd: 'prd-template.md',
      meeting: 'meeting-minutes-template.md',
      interview: 'interview-script-sample.md',
      bmc: 'business-model-checklist.md',
      competitor: 'competitor-analysis-template.md',
      roadmap: 'roadmap-template.md',
      retrospective: 'retrospective-template.md',
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
  .description('查看文档：capability / prompt / workflow / faq')
  .action((name) => {
    const map = {
      capability: 'capability.md',
      prompt: 'prompt-reference.md',
      workflow: 'workflow-guide.md',
      faq: 'faq.md',
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
  .description('查看示例：prd / rice / competitor / mindmap')
  .action((name) => {
    const map = {
      prd: 'prd-example.md',
      rice: 'rice-priority-example.md',
      competitor: 'competitor-analysis-sample.md',
      mindmap: 'mindmap-sample.md',
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
