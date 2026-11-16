#!/usr/bin/env node
/**
 * 结构自检。CI 和本地都能跑：node scripts/check.js
 * 目的是防止后续改动把 76 个模块、文件清单、文档覆盖搞乱。
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const errors = [];
const warnings = [];

function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }
function read(p) { return fs.readFileSync(path.join(root, p), 'utf8'); }
function exists(p) { return fs.existsSync(path.join(root, p)); }

// 1. 必需文件
const required = [
  'README.md', 'README_EN.md', 'LICENSE', 'CHANGELOG.md', 'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md', 'SECURITY.md', 'package.json', '.gitignore', '.editorconfig',
  'install.ps1', 'install.sh', 'bin/index.js',
  'skill-source/skill.json', 'skill-source/system-prompt.md', 'skill-source/triggers.md',
  'docs/capability.md', 'docs/prompt-reference.md', 'docs/workflow-guide.md',
  'docs/faq.md', 'docs/tools.md',
  '.github/ISSUE_TEMPLATE/bug_report.md',
  '.github/ISSUE_TEMPLATE/feature_request.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
];
for (const f of required) {
  if (!exists(f)) fail(`缺少必需文件：${f}`);
}

// 2. JSON 合法性
for (const f of ['package.json', 'skill-source/skill.json']) {
  try {
    JSON.parse(read(f));
  } catch (e) {
    fail(`${f} 不是合法 JSON：${e.message}`);
  }
}

const skill = JSON.parse(read('skill-source/skill.json'));
for (const key of ['id', 'name', 'version', 'description', 'author', 'systemPromptFile']) {
  if (!skill[key]) fail(`skill.json 缺少字段：${key}`);
}
if (skill.systemPromptFile && !exists(`skill-source/${skill.systemPromptFile}`)) {
  fail(`skill.json 指向的 systemPromptFile 不存在：${skill.systemPromptFile}`);
}

const pkg = JSON.parse(read('package.json'));
if (pkg.version !== skill.version) {
  fail(`版本不一致：package.json=${pkg.version}，skill.json=${skill.version}`);
}

// 3. system-prompt 模块编号
const sp = read('skill-source/system-prompt.md');
const abilitySection = sp.split('## 能力模块')[1];
if (!abilitySection) {
  fail('system-prompt.md 找不到「## 能力模块」段落');
} else {
  const tillNextH2 = abilitySection.split(/\n## /)[0];
  const nums = [...tillNextH2.matchAll(/^\d+\.\s+\*\*/gm)].map(m => parseInt(m[0], 10));
  if (nums.length === 0) {
    fail('能力模块段落里没找到任何模块');
  } else {
    let bad = null;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== i + 1) { bad = `第 ${i + 1} 个模块编号是 ${nums[i]}`; break; }
    }
    if (bad) fail(`模块编号不连续：${bad}`);
    if (nums.length !== 76) warn(`模块数量是 ${nums.length}，预期 76`);
  }

  const catCount = (tillNextH2.match(/^### [一二三四五六七八九十]+、/gm) || []).length;
  if (catCount !== 10) warn(`大分类数量是 ${catCount}，预期 10`);
}

// 4. 文档覆盖
function countTableRows(file) {
  let n = 0;
  for (const line of read(file).split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    const first = line.split('|')[1].trim();
    if (!first || first === '模块' || first.startsWith('-')) continue;
    n++;
  }
  return n;
}
const capTotal = countTableRows('docs/capability.md');
if (capTotal !== 76) warn(`capability.md 模块表格行数 ${capTotal}，预期 76`);

const prCount = (read('docs/prompt-reference.md').match(/^### /gm) || []).length;
if (prCount !== 76) warn(`prompt-reference.md 提示词条数 ${prCount}，预期 76`);

const trigCount = (read('skill-source/triggers.md').match(/^> /gm) || []).length;
if (trigCount < 70) warn(`triggers.md 触发条数 ${trigCount}，偏少`);

// 5. templates / examples
const tpl = fs.readdirSync(path.join(root, 'templates')).filter(f => f.endsWith('.md'));
const ex = fs.readdirSync(path.join(root, 'examples')).filter(f => f.endsWith('.md'));
if (tpl.length !== 13) warn(`templates 有 ${tpl.length} 个，预期 13`);
if (ex.length !== 4) warn(`examples 有 ${ex.length} 个，预期 4`);

// 6. template 命令里的每个 key 都要能对应到真实模板文件
const binSrc = read('bin/index.js');
const tplBlock = binSrc.split("command('template [name]')")[1] || '';
const tplMapPart = tplBlock.split("command('doc [name]')")[0];
for (const m of tplMapPart.matchAll(/(\w+):\s*'([a-z\-]+\.md)'/g)) {
  const file = m[2];
  if (!exists(`templates/${file}`)) fail(`bin/index.js 的 template 命令引用了不存在的模板：${file}`);
}
const docBlock = binSrc.split("command('doc [name]')")[1] || '';
const docMapPart = docBlock.split("command('example [name]')")[0];
for (const m of docMapPart.matchAll(/(\w+):\s*'([a-z\-]+\.md)'/g)) {
  const file = m[2];
  if (!exists(`docs/${file}`)) fail(`bin/index.js 的 doc 命令引用了不存在的文档：${file}`);
}
const exBlock = binSrc.split("command('example [name]')")[1] || '';
for (const m of exBlock.split('program\n')[0].matchAll(/(\w+):\s*'([a-z\-]+\.md)'/g)) {
  const file = m[2];
  if (!exists(`examples/${file}`)) fail(`bin/index.js 的 example 命令引用了不存在的示例：${file}`);
}

// 7. 明显不该出现的残留
const allMd = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const rel = dir ? `${dir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) walk(rel);
    else if (entry.name.endsWith('.md')) allMd.push(rel);
  }
})('');

for (const f of allMd) {
  const text = read(f);
  if (/D:\\MyCode|C:\\Users\\itxinfei/.test(text)) {
    fail(`${f} 里写死了本机绝对路径`);
  }
  if (/localhost:\d{4}/.test(text)) {
    warn(`${f} 出现 localhost 地址`);
  }
}

// 输出
if (warnings.length) {
  console.log('\n警告：');
  for (const w of warnings) console.log('  - ' + w);
}
if (errors.length) {
  console.log('\n错误：');
  for (const e of errors) console.log('  - ' + e);
  console.log(`\n自检失败：${errors.length} 个错误，${warnings.length} 个警告\n`);
  process.exit(1);
} else {
  console.log(`\n自检通过：0 个错误，${warnings.length} 个警告\n`);
}
