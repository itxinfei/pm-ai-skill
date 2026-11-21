/**
 * 一条链路的机械部分：需求体检 → PRD 骨架 → 飞书导入稿。
 *
 * 它不写内容。内容归 AI 和产品经理，这里只保证三件事：
 *  1. 三份文件一次生成，命名固定，不用每次重新想放哪
 *  2. PRD 骨架带填写进度，填到哪一目了然
 *  3. 飞书稿已经过结构校验，拿去导入不会变形
 */

const fs = require('fs');
const path = require('path');
const { toFeishu } = require('./feishu');

const ROOT = path.resolve(__dirname, '..');

const TYPES = {
  b2b: { file: 'prd-b2b-template.md', label: 'B 端 14 章' },
  light: { file: 'prd-template.md', label: '轻量版' },
};

const today = () => new Date().toISOString().slice(0, 10);

function slugify(s) {
  return (
    s
      .replace(/[\\/:*?"<>|\s]+/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 30) || 'prd'
  );
}

/** 从模板抽章节标题，生成可勾选的填写进度 */
function progressList(tpl) {
  const items = [];
  for (const line of tpl.split('\n')) {
    const m = line.match(/^##\s+(.+)$/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

/** 模板第一行的 h1 降一级，避免和文档标题撞车 */
function demoteH1(tpl) {
  const lines = tpl.replace(/\r\n/g, '\n').split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    if (/^#\s+/.test(lines[i])) {
      lines[i] = '## 模板说明';
    }
    break;
  }
  return lines.join('\n');
}

function buildFlow(subject, opts = {}) {
  const type = TYPES[opts.type || 'b2b'];
  if (!type) throw new Error(`不支持的 PRD 类型：${opts.type}，可用：${Object.keys(TYPES).join(' / ')}`);
  if (!subject || !subject.trim()) throw new Error('先说一句这个需求是什么，比如：会员积分体系');

  const dir = path.resolve(
    opts.out || path.join(process.cwd(), `flow-${slugify(subject)}`)
  );
  fs.mkdirSync(dir, { recursive: true });

  const date = today();

  // 1. 体检卡
  const intakeTpl = fs.readFileSync(path.join(ROOT, 'templates', 'intake-template.md'), 'utf8');
  const intake = intakeTpl
    .replace(/\{subject\}/g, subject.trim())
    .replace(/\{date\}/g, date);
  const intakePath = path.join(dir, '01-intake.md');
  fs.writeFileSync(intakePath, intake, 'utf8');

  // 2. PRD 骨架
  const prdTpl = fs.readFileSync(path.join(ROOT, 'templates', type.file), 'utf8');
  const chapters = progressList(prdTpl);
  const progress = chapters.map((c) => `- [ ] ${c}`).join('\n');
  const prd = [
    `# ${subject.trim()} PRD`,
    '',
    '填完一项勾一项。填不动的先跳过，跳过的地方就是会上会被问住的地方。',
    '',
    '## 填写进度',
    '',
    progress,
    '',
    '---',
    '',
    demoteH1(prdTpl).trim(),
    '',
  ].join('\n');
  const prdPath = path.join(dir, '02-prd.md');
  fs.writeFileSync(prdPath, prd, 'utf8');

  // 3. 飞书导入稿
  const res = toFeishu(prd, {
    title: `${subject.trim()} PRD`,
    version: opts.docVersion || '草稿',
    status: '骨架',
    author: opts.author || '',
    date,
  });
  const feishuPath = path.join(dir, '03-prd-feishu.md');
  fs.writeFileSync(feishuPath, res.markdown, 'utf8');

  return {
    dir,
    files: [
      { step: 1, name: '需求体检', path: intakePath },
      { step: 2, name: 'PRD 骨架', path: prdPath },
      { step: 3, name: '飞书导入稿', path: feishuPath },
    ],
    chapters: chapters.length,
    type: type.label,
    issues: res.issues,
    stats: res.stats,
  };
}

module.exports = { buildFlow, TYPES };
