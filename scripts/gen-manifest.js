// 从 system-prompt.md 生成机器可读清单 manifest.json
// 改了 prompt 里的模块，重跑一次就能同步

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const promptFile = path.join(root, 'skill-source', 'system-prompt.md');
const skillFile = path.join(root, 'skill-source', 'skill.json');
const outFile = path.join(root, 'skill-source', 'manifest.json');

const md = fs.readFileSync(promptFile, 'utf8');
const skill = JSON.parse(fs.readFileSync(skillFile, 'utf8'));

const CATEGORY = /^###\s+[一二三四五六七八九十]+、(.+?)（(\d+)\s*个）/;
const MODULE = /^(\d+)\.\s+\*\*(.+?)\*\*[^：:\n]{0,40}[：:]\s*(.*)$/;
const CHAIN = /^\*\*([A-F])\.\s+(.+?)\*\*/;
const clean = (s) =>
  s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim().replace(/[。：:]+$/, '');

const categories = [];
const modules = [];
const chains = [];
let section = '';
let current = null;
let pending = null;

for (const line of md.split(/\r?\n/)) {
  const s = line.match(/^##\s+(.+)$/);
  if (s) {
    section = s[1].trim();
    current = null;
    continue;
  }

  const ch = line.match(CHAIN);
  if (ch) {
    chains.push({ id: ch[1], title: ch[2].trim() });
    continue;
  }

  if (!section.includes('能力模块')) continue;

  const c = line.match(CATEGORY);
  if (c) {
    current = c[1].trim();
    categories.push({ name: current, count: 0, declared: Number(c[2]) });
    continue;
  }

  const m = line.match(MODULE);
  if (m && current) {
    const mod = {
      id: Number(m[1]),
      category: current,
      title: m[2].trim(),
      definition: clean(m[3]),
    };
    modules.push(mod);
    categories[categories.length - 1].count += 1;
    pending = mod.definition ? null : mod;
    continue;
  }

  // 定义写在下一行的缩进内容里
  if (pending && !pending.definition && /^\s+\S/.test(line)) {
    const text = clean(line.trim().replace(/^[-*]\s*/, ''));
    if (text) {
      pending.definition = text;
      pending = null;
    }
  }
}

const manifest = {
  id: skill.id,
  name: skill.name,
  version: skill.version,
  author: 'itxinfei（心飞为你飞）',
  repo: 'https://github.com/itxinfei/pm-ai-skill',
  license: 'MIT',
  totalModules: modules.length,
  categories: categories.map((c) => ({ name: c.name, count: c.count })),
  modules,
  chains,
};

if (modules.length !== 76) {
  console.error(`模块数不对：解析到 ${modules.length} 个，应该是 76 个`);
  process.exit(1);
}

const mixed = categories.filter((c) => c.count !== c.declared);
if (mixed.length) {
  console.error('分类下模块数和声明的数量对不上：' + mixed.map((c) => `${c.name} ${c.count}/${c.declared}`).join('、'));
  process.exit(1);
}

fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`已生成 manifest.json：${modules.length} 个模块，${categories.length} 个分类，${chains.length} 条链路`);
