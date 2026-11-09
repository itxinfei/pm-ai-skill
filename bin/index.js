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

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDirSync(s, d);
    else fs.copyFileSync(s, d);
  }
}

// 自动探测 WorkBuddy skill 目录（不同系统）
function getWorkBuddySkillPath() {
  const home = os.homedir();
  const candidates = process.platform === 'win32'
    ? [
        path.join(home, 'AppData', 'Roaming', 'WorkBuddy', 'skills'),
        path.join(home, '.workbuddy', 'skills'),
      ]
    : process.platform === 'darwin'
    ? [
        path.join(home, 'Library', 'Application Support', 'WorkBuddy', 'skills'),
        path.join(home, '.workbuddy', 'skills'),
      ]
    : [path.join(home, '.workbuddy', 'skills')];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

program
  .name('pm-ai-skill')
  .description('PM 全链路 WorkBuddy Skill 工具，npm 一键安装')
  .version(require('../package.json').version);

program
  .command('install')
  .description('安装 skill 到 WorkBuddy')
  .action(() => {
    const target = getWorkBuddySkillPath();
    const base = target || process.cwd();
    const destSkillFolder = path.join(base, 'pm-ai-skill');
    copyDirSync(skillSourceDir, destSkillFolder);
    console.log(`✅ 源目录：${skillSourceDir}`);
    console.log(`✅ 目标目录：${destSkillFolder}`);
    if (!target) {
      console.log('⚠️ 未自动找到 WorkBuddy skills 目录，已把文件释放到当前目录，请手动导入 WorkBuddy');
    } else {
      console.log('✅ 安装完成，重启 WorkBuddy 即可加载 pm-ai-skill');
    }
  });

program
  .command('export-zip')
  .description('导出兼容旧版的 skill zip 包')
  .action(async () => {
    const archiver = require('archiver');
    const outPath = path.join(process.cwd(), 'pm-all-in-one-skill.zip');
    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => console.log(`✅ 导出成功：${outPath}（${archive.pointer()} bytes）`));
    archive.on('error', (err) => { throw err; });
    archive.pipe(output);
    archive.directory(skillSourceDir, false);
    await archive.finalize();
  });

program
  .command('template <name>')
  .description('查看模板：prd / meeting / interview / bmc')
  .action((name) => {
    const map = {
      prd: 'prd-template.md',
      meeting: 'meeting-minutes-template.md',
      interview: 'interview-script-sample.md',
      bmc: 'business-model-checklist.md',
    };
    const f = map[name];
    if (!f) return console.log('可用：prd, meeting, interview, bmc');
    console.log(fs.readFileSync(path.join(templatesDir, f), 'utf8'));
  });

program
  .command('doc <name>')
  .description('查看文档：capability / prompt / workflow / faq')
  .action((name) => {
    const map = {
      capability: 'capability.md',
      prompt: 'prompt-reference.md',
      workflow: 'workflow-guide.md',
      faq: 'faq.md',
    };
    const f = map[name];
    if (!f) return console.log('可用：capability, prompt, workflow, faq');
    console.log(fs.readFileSync(path.join(docsDir, f), 'utf8'));
  });

program
  .command('example <name>')
  .description('查看示例：rice / competitor / mindmap')
  .action((name) => {
    const map = {
      rice: 'rice-priority-example.md',
      competitor: 'competitor-analysis-sample.md',
      mindmap: 'mindmap-sample.md',
    };
    const f = map[name];
    if (!f) return console.log('可用：rice, competitor, mindmap');
    console.log(fs.readFileSync(path.join(examplesDir, f), 'utf8'));
  });

program
  .command('info')
  .description('查看 skill 元信息')
  .action(() => {
    const skillMeta = readJson(path.join(skillSourceDir, 'skill.json'));
    console.log('=== PM-AI-Skill ===');
    console.log(`ID：${skillMeta.id}`);
    console.log(`名称：${skillMeta.name}`);
    console.log(`版本：${skillMeta.version}`);
    console.log(`描述：${skillMeta.description}`);
    console.log(`标签：${(skillMeta.tags || []).join(', ')}`);
  });

program.parse();
