/**
 * 可复现的行为评分。
 *
 * 27 条用例原本只有自然语言 checks，只能人看，不同人看不同结论。
 * 这里把能机检的部分固定成规则（evals/cases.json 的 auto 字段），
 * 同一份输出跑两次分数一样，换一版 skill 跑，分数可比。
 *
 * 规则覆盖不到的检查项不会假装覆盖：输出里会写明"机检覆盖 3/3 项"或"2/3 项"。
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CASES_FILE = path.join(ROOT, 'evals', 'cases.json');

const loadCases = () => JSON.parse(fs.readFileSync(CASES_FILE, 'utf8'));

/**
 * 规则指纹：用例 id + 每条 auto 规则的原文。
 * 分数能比的前提是尺子没变，尺子一变分数就没意义了，所以要比指纹。
 */
function fingerprint(cases) {
  const crypto = require('crypto');
  const payload = JSON.stringify(cases.map((c) => ({ id: c.id, auto: c.auto || [] })));
  return crypto.createHash('sha256').update(payload, 'utf8').digest('hex').slice(0, 16);
}

const uniq = (arr) => Array.from(new Set(arr));

/** 首段：跳过纯标题、引用块、署名/状态这类元信息行，取第一块真正在说事的内容 */
function firstBlock(text) {
  const blocks = text.trim().split(/\n\s*\n/);
  for (const raw of blocks) {
    const t = raw.trim();
    if (!t) continue;
    const lines = t.split('\n');
    if (lines.length <= 2 && /^(#{1,6}\s|>)/.test(t)) continue;
    // 单行、加粗开头、没有句末标点 —— 署名行、状态行、汇报人行
    if (lines.length === 1 && /^\*\*/.test(t) && !/[。！？.!?]/.test(t)) continue;
    return t;
  }
  return (blocks[0] || '').trim();
}

/** 命中时回一段上下文当证据，别只说"中了" */
function evidence(text, needle) {
  const i = text.indexOf(needle);
  if (i < 0) return '';
  const s = Math.max(0, i - 24);
  const e = Math.min(text.length, i + needle.length + 24);
  return '…' + text.slice(s, e).replace(/\s+/g, ' ') + '…';
}

function checkRule(rule, text) {
  const label = rule.label || rule.t;
  switch (rule.t) {
    case 'has': {
      const hit = text.includes(rule.v);
      return {
        ok: hit,
        label,
        note: hit ? evidence(text, rule.v) : `没出现：${rule.v}`,
      };
    }
    case 'hasAny': {
      const hit = rule.v.find((x) => text.includes(x));
      return {
        ok: !!hit,
        label,
        note: hit ? evidence(text, hit) : `一个都没有：${rule.v.join(' / ')}`,
      };
    }
    case 'not': {
      const re = new RegExp(rule.v, 'm');
      const m = text.match(re);
      return {
        ok: !m,
        label,
        note: m ? `出现了不该有的：${(m[0] || '').trim().slice(0, 40)}` : '没出现',
      };
    }
    case 'first': {
      const head = firstBlock(text);
      const hit = rule.v.find((x) => head.includes(x));
      return {
        ok: !!hit,
        label,
        note: hit ? `首段含「${hit}」` : `首段没有：${rule.v.join(' / ')}`,
      };
    }
    case 'firstRe': {
      const head = firstBlock(text);
      const re = new RegExp(rule.v, 'm');
      const m = head.match(re);
      return {
        ok: !!m,
        label,
        note: m ? `首段命中「${m[0]}」` : `首段没命中 ${rule.v}`,
      };
    }
    case 'maxChars': {
      const n = [...text].length;
      return { ok: n <= rule.n, label, note: `实际 ${n} 字，上限 ${rule.n}` };
    }
    case 'minChars': {
      const n = [...text].length;
      return { ok: n >= rule.n, label, note: `实际 ${n} 字，下限 ${rule.n}` };
    }
    case 'maxCount': {
      const m = text.match(new RegExp(rule.v, 'g')) || [];
      return { ok: m.length <= rule.n, label, note: `出现 ${m.length} 次，上限 ${rule.n}` };
    }
    default:
      return { ok: false, label, note: `未知规则类型：${rule.t}` };
  }
}

function verdict(ratio) {
  if (ratio >= 1) return '通过';
  if (ratio >= 0.7) return '勉强';
  return '不过';
}

function scoreCase(caseObj, output) {
  const rules = caseObj.auto || [];
  const results = rules.map((r) => checkRule(r, output));
  const passed = results.filter((r) => r.ok).length;
  const total = results.length;
  const ratio = total ? passed / total : 0;
  const checksCovered = uniq(results.map((r) => r.label)).length;
  return {
    id: caseObj.id,
    category: caseObj.category,
    passed,
    total,
    ratio: Math.round(ratio * 100) / 100,
    verdict: verdict(ratio),
    checksTotal: (caseObj.checks || []).length,
    checksCovered,
    results,
  };
}

function renderOne(r, caseObj) {
  const lines = [];
  lines.push(`${r.id}  ${r.passed}/${r.total}  ${Math.round(r.ratio * 100)}%  ${r.verdict}`);
  lines.push(`类别：${r.category}`);
  lines.push(`输入：${caseObj.input}`);
  if (r.checksCovered < r.checksTotal) {
    lines.push(`机检覆盖 ${r.checksCovered}/${r.checksTotal} 项人工判据，剩下 ${r.checksTotal - r.checksCovered} 项还得人看`);
  } else {
    lines.push(`机检覆盖全部 ${r.checksTotal} 项人工判据`);
  }
  lines.push('');
  for (const x of r.results) {
    lines.push(`  ${x.ok ? '✓' : '✗'} ${x.label}  —— ${x.note}`);
  }
  return lines.join('\n');
}

function readOutput(p) {
  if (p === '-') return fs.readFileSync(0, 'utf8');
  const abs = path.resolve(p);
  if (!fs.existsSync(abs)) throw new Error(`找不到输出文件：${p}`);
  return fs.readFileSync(abs, 'utf8');
}

/** 批量：目录里按 <case-id>.md / .txt 命名，没跑到的用例单独列出 */
function scoreDir(dir) {
  const abs = path.resolve(dir);
  if (!fs.existsSync(abs)) throw new Error(`找不到目录：${dir}`);
  const data = loadCases();
  const files = fs.readdirSync(abs);
  const byBase = new Map();
  for (const f of files) {
    const m = f.match(/^(.+)\.(md|txt)$/i);
    if (m) byBase.set(m[1], path.join(abs, f));
  }
  const scored = [];
  const missing = [];
  for (const c of data.cases) {
    const f = byBase.get(c.id);
    if (!f) { missing.push(c.id); continue; }
    scored.push(scoreCase(c, fs.readFileSync(f, 'utf8')));
  }
  const sum = scored.reduce((a, x) => a + x.ratio, 0);
  const avg = scored.length ? Math.round((sum / scored.length) * 100) / 100 : 0;
  const byCategory = {};
  for (const x of scored) {
    const g = (byCategory[x.category] = byCategory[x.category] || { n: 0, sum: 0 });
    g.n += 1;
    g.sum += x.ratio;
  }
  const summary = {
    scored: scored.length,
    total: data.cases.length,
    missing,
    avg,
    pass: scored.filter((x) => x.verdict === '通过').length,
    soSo: scored.filter((x) => x.verdict === '勉强').length,
    fail: scored.filter((x) => x.verdict === '不过').length,
    byCategory: Object.fromEntries(
      Object.entries(byCategory).map(([k, g]) => [k, { n: g.n, avg: Math.round((g.sum / g.n) * 100) / 100 }])
    ),
  };
  return { scored, summary, fingerprint: fingerprint(data.cases) };
}

function renderBatch({ scored, summary }) {
  const lines = [];
  lines.push(`跑了 ${summary.scored}/${summary.total} 条，平均 ${Math.round(summary.avg * 100)}%`);
  lines.push(`通过 ${summary.pass} · 勉强 ${summary.soSo} · 不过 ${summary.fail}`);
  lines.push('');
  for (const x of scored) {
    const bar = '█'.repeat(Math.round(x.ratio * 10)).padEnd(10, '·');
    lines.push(`${x.id.padEnd(14)} ${bar} ${String(Math.round(x.ratio * 100)).padStart(3)}%  ${x.verdict}`);
    const fails = x.results.filter((r) => !r.ok);
    for (const f of fails) lines.push(`               ✗ ${f.label} —— ${f.note}`);
  }
  if (summary.missing.length) {
    lines.push('');
    lines.push(`没跑到的 ${summary.missing.length} 条：${summary.missing.join(', ')}`);
    lines.push('目录里按 <case-id>.md 命名输出文件即可参与批量评分。');
  }
  lines.push('');
  lines.push('按类别：');
  for (const [k, g] of Object.entries(summary.byCategory)) {
    lines.push(`  ${k.padEnd(10)} ${g.n} 条，平均 ${Math.round(g.avg * 100)}%`);
  }
  return lines.join('\n');
}

/**
 * 和基线比：掉分的、规则变过的一条条列出来。
 *
 * 不比分高多少，只比有没有退。放宽规则能让分数涨，那不算进步，算改尺子。
 */
function compareBaseline(result, baseline, opts = {}) {
  const tol = opts.tolerance == null ? 0 : Number(opts.tolerance) / 100;
  const base = baseline.scored || [];
  const nowById = new Map((result.scored || []).map((x) => [x.id, x]));
  const baseIds = new Set(base.map((x) => x.id));

  const regressions = [];
  const improved = [];
  const rulesChanged = [];
  const lost = [];

  for (const b of base) {
    const n = nowById.get(b.id);
    if (!n) { lost.push(b.id); continue; }
    if (n.total !== b.total) {
      rulesChanged.push({ id: b.id, baseTotal: b.total, nowTotal: n.total, baseRatio: b.ratio, nowRatio: n.ratio });
      continue;
    }
    const d = Math.round((n.ratio - b.ratio) * 100) / 100;
    if (d < -tol) {
      regressions.push({
        id: b.id,
        base: b.ratio,
        now: n.ratio,
        delta: d,
        failed: n.results.filter((x) => !x.ok).map((x) => x.label),
      });
    } else if (d > tol) {
      improved.push({ id: b.id, base: b.ratio, now: n.ratio, delta: d });
    }
  }

  const added = (result.scored || []).filter((x) => !baseIds.has(x.id)).map((x) => x.id);
  const baseFp = baseline.fingerprint;
  const nowFp = opts.fingerprint || result.fingerprint;
  const fpMismatch = !!(baseFp && nowFp && baseFp !== nowFp);

  // 少跑几条不算退步（本地针对性复跑很常见），但门禁要全量时必须算，用 strict
  const missingFail = !!(opts.strict && lost.length);

  const ok = regressions.length === 0 && rulesChanged.length === 0 && !fpMismatch && !missingFail;

  return {
    ok,
    tolerance: tol,
    baselineAvg: baseline.summary ? baseline.summary.avg : null,
    basePass: baseline.summary ? baseline.summary.pass : null,
    baseSoSo: baseline.summary ? baseline.summary.soSo : null,
    baseFail: baseline.summary ? baseline.summary.fail : null,
    baseCount: base.length,
    nowAvg: result.summary ? result.summary.avg : null,
    nowPass: result.summary ? result.summary.pass : null,
    nowSoSo: result.summary ? result.summary.soSo : null,
    nowFail: result.summary ? result.summary.fail : null,
    nowCount: (result.scored || []).length,
    baseFingerprint: baseFp || null,
    nowFingerprint: nowFp || null,
    fpMismatch,
    regressions,
    improved,
    rulesChanged,
    lost,
    missingFail,
    added,
  };
}

const pct = (n) => `${Math.round((n || 0) * 100)}%`;

function renderCompare(cmp, baselinePath) {
  const lines = [];
  lines.push('');
  lines.push(`与基线对比  ${baselinePath}`);
  lines.push(
    `基线 ${cmp.baseCount} 条 · 平均 ${pct(cmp.baselineAvg)} · 通过 ${cmp.basePass}/勉强 ${cmp.baseSoSo}/不过 ${cmp.baseFail}` +
      `   →   本次 ${cmp.nowCount} 条 · 平均 ${pct(cmp.nowAvg)} · 通过 ${cmp.nowPass}/勉强 ${cmp.nowSoSo}/不过 ${cmp.nowFail}`
  );

  if (cmp.fpMismatch) {
    lines.push('');
    lines.push('规则指纹对不上：用例或 auto 规则被改过，分数不能直接比。');
    lines.push('  要么是修了规则（那就重跑一遍答案、重新出基线），要么是为了让分好看改的标准（那就改回去）。');
    lines.push(`  基线指纹 ${cmp.baseFingerprint || '(无)'} · 当前指纹 ${cmp.nowFingerprint || '(无)'}`);
  }

  if (cmp.regressions.length) {
    lines.push('');
    lines.push(`掉分 ${cmp.regressions.length} 条：`);
    for (const x of cmp.regressions) {
      lines.push(`  ${x.id.padEnd(14)} ${pct(x.base)} → ${pct(x.now)}  ${Math.round(x.delta * 100)}`);
      for (const f of x.failed) lines.push(`                 ✗ ${f}`);
    }
  }

  if (cmp.rulesChanged.length) {
    lines.push('');
    lines.push(`规则条数变过 ${cmp.rulesChanged.length} 条（分数不能直接比）：`);
    for (const x of cmp.rulesChanged) {
      lines.push(`  ${x.id.padEnd(14)} 规则 ${x.baseTotal} 条 → ${x.nowTotal} 条，${pct(x.baseRatio)} → ${pct(x.nowRatio)}`);
    }
  }

  if (cmp.lost.length) {
    lines.push('');
    lines.push(`比基线少跑 ${cmp.lost.length} 条：${cmp.lost.join(', ')}`);
    lines.push(cmp.missingFail ? '  门禁按全量算，少跑就算没通过。' : '  这几条这次没验证到，不算退步，但别忘了它们还没跑。');
  }

  if (cmp.improved.length) {
    lines.push('');
    lines.push(`变好 ${cmp.improved.length} 条：${cmp.improved.map((x) => `${x.id} ${Math.round(x.delta * 100)}`).join(' · ')}`);
  }

  if (cmp.added.length) {
    lines.push('');
    lines.push(`比基线多 ${cmp.added.length} 条（基线里没有，不计入对比）：${cmp.added.join(', ')}`);
  }

  lines.push('');
  if (cmp.ok) {
    lines.push('结论：没有退步。');
  } else if (cmp.regressions.length) {
    lines.push('结论：有退步，别急着发。');
  } else if (cmp.fpMismatch || cmp.rulesChanged.length) {
    lines.push('结论：尺子动过，分数不能直接比。');
  } else {
    lines.push('结论：没跑全，门禁不算过。');
  }
  return lines.join('\n');
}

module.exports = {
  loadCases,
  scoreCase,
  scoreDir,
  renderOne,
  renderBatch,
  readOutput,
  firstBlock,
  fingerprint,
  compareBaseline,
  renderCompare,
};
