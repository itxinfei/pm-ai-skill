/**
 * 飞书文档交付：把一份 Markdown 转成飞书能直接导入的稿子，并先把会踩的坑挑出来。
 *
 * 为什么不是简单复制粘贴：
 * 飞书导入 Markdown 有几处硬限制，踩了整份文档会变形，而且不报错。
 *  - 表格每行列数不一致，整张表会塌成一段文字
 *  - 标题跳级（h1 直跳 h3）会让目录错位
 *  - 三层以上嵌套列表会被拍平
 *  - 本地图片路径导入后是空图
 * 所以先修，再校验，最后交。
 */

const fs = require('fs');
const path = require('path');

const isTableRow = (line) => /^\s*\|.*\|\s*$/.test(line);
const isSeparator = (line) => /^\s*\|[\s:|-]+\|\s*$/.test(line) && line.includes('-');
const isHeading = (line) => /^(#{1,6})\s+/.test(line);
const headingLevel = (line) => (line.match(/^(#{1,6})\s+/) || [, ''])[1].length;
const indentDepth = (line) => {
  const m = line.match(/^(\s*)(?:[-*+]|\d+\.)\s+/);
  if (!m) return 0;
  return Math.floor(m[1].replace(/\t/g, '  ').length / 2);
};

/** 按列数补齐或截断表格行，让飞书能吃下去 */
function splitCells(row) {
  const inner = row.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells = [];
  let buf = '';
  let escaped = false;
  for (const ch of inner) {
    if (escaped) { buf += ch; escaped = false; continue; }
    if (ch === '\\') { escaped = true; buf += ch; continue; }
    if (ch === '|') { cells.push(buf.trim()); buf = ''; continue; }
    buf += ch;
  }
  cells.push(buf.trim());
  return cells;
}

function alignTableBlock(block) {
  const rows = block.map(splitCells);
  const cols = Math.max(...rows.map((r) => r.length));
  const ragged = rows.some((r) => r.length !== cols);
  const fix = (cells) => {
    const out = cells.slice(0, cols);
    while (out.length < cols) out.push('');
    return '| ' + out.join(' | ') + ' |';
  };
  const head = fix(rows[0]);
  const sep = '| ' + Array.from({ length: cols }, () => '---').join(' | ') + ' |';
  const body = rows.slice(2).map(fix);
  return { lines: [head, sep, ...body], ragged, cols };
}

/**
 * 主转换：返回 { markdown, issues, stats }
 * issues 是"导入后一定会出问题"的清单，不是风格建议。
 */
function toFeishu(md, opts = {}) {
  const src = md.replace(/\r\n/g, '\n');
  const lines = src.split('\n');
  const issues = [];
  const out = [];
  const stats = { tables: 0, headings: 0, images: 0, todo: 0, words: 0 };

  let tableBuf = [];
  let inTable = false;
  let lastHeadingLevel = 0;
  let h1Count = 0;

  const flushTable = () => {
    if (!tableBuf.length) return;
    const aligned = alignTableBlock(tableBuf);
    if (aligned.ragged) {
      issues.push(`有一张表每行列数不一致，已按表头 ${aligned.cols} 列补齐：${tableBuf[0].trim().slice(0, 40)}`);
    }
    out.push(...aligned.lines);
    out.push('');
    stats.tables += 1;
    tableBuf = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (isTableRow(line)) {
      if (!inTable) { inTable = true; tableBuf = []; }
      tableBuf.push(line);
      continue;
    }
    if (inTable) flushTable();

    // 标题：查跳级与多主标题
    if (isHeading(line)) {
      const lv = headingLevel(line);
      stats.headings += 1;
      if (lv === 1) h1Count += 1;
      if (lastHeadingLevel && lv > lastHeadingLevel + 1 && lv > 1) {
        issues.push(`第 ${i + 1} 行标题从 h${lastHeadingLevel} 跳到 h${lv}，飞书目录会错位：${line.trim()}`);
      }
      lastHeadingLevel = lv;
      out.push(line.trimEnd());
      continue;
    }

    // 嵌套列表：三层起飞书会拍平
    const depth = indentDepth(line);
    if (depth >= 2) {
      issues.push(`第 ${i + 1} 行是第 ${depth + 1} 层嵌套列表，飞书导入会拍平成一级：${line.trim().slice(0, 40)}`);
    }

    // 待办
    if (/^\s*[-*+]\s+\[[ xX]\]\s+/.test(line)) stats.todo += 1;

    // 图片：本地路径导入后是空图
    const img = line.match(/!\[[^\]]*\]\(([^)]+)\)/g);
    if (img) {
      stats.images += img.length;
      for (const one of img) {
        const url = (one.match(/\(([^)]+)\)/) || [, ''])[1];
        if (url && !/^(https?:|data:)/.test(url)) {
          issues.push(`第 ${i + 1} 行是本地图片（${url}），导入飞书后是空图，换成图床链接或手动上传`);
        }
      }
    }

    out.push(line.trimEnd());
  }
  if (inTable) flushTable();

  if (h1Count > 1) issues.push(`全文有 ${h1Count} 个一级标题，飞书里只有一个文档标题，其余降为二级`);
  if (stats.headings === 0) issues.push('全文没有标题，导入后是一整块平文，读者没法定位');

  // 文档信息块：PRD 交付时对方第一眼看的就是版本和状态
  const hasH1 = /^#\s+\S/m.test(src);
  const meta = [];
  if (opts.title && !hasH1) meta.push(`> **${opts.title}**`);
  const info = [];
  if (opts.version) info.push(`版本 ${opts.version}`);
  if (opts.status) info.push(`状态 ${opts.status}`);
  if (opts.author) info.push(`作者 ${opts.author}`);
  info.push(`更新 ${opts.date || new Date().toISOString().slice(0, 10)}`);
  meta.push(`> ${info.join(' · ')}`);
  meta.push('');

  let body = out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  // 文里没有一级标题时，把标题补成标题，别让它只出现在信息块里
  if (opts.title && !hasH1) body = `# ${opts.title}\n\n${body}`;
  const markdown = meta.concat([body]).join('\n') + '\n';

  stats.words = (markdown.match(/[\u4e00-\u9fa5]/g) || []).length;

  return { markdown, issues, stats };
}

function buildDeliver(inputPath, opts = {}) {
  const abs = path.resolve(inputPath);
  if (!fs.existsSync(abs)) throw new Error(`找不到文件：${inputPath}`);
  const md = fs.readFileSync(abs, 'utf8');
  const base = path.basename(abs, path.extname(abs));
  const dir = path.dirname(abs);
  const titleGuess = (md.match(/^#\s+(.+)$/m) || [, ''])[1].trim();

  const result = toFeishu(md, {
    title: opts.title || titleGuess || base,
    version: opts.version || '',
    status: opts.status || '',
    author: opts.author || '',
    date: opts.date || '',
  });

  const outPath = opts.out || path.join(dir, `${base}-feishu.md`);
  fs.writeFileSync(outPath, result.markdown, 'utf8');
  return { outPath, ...result };
}

module.exports = { toFeishu, buildDeliver };
