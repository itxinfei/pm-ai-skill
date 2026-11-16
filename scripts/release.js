#!/usr/bin/env node
/**
 * 一键发版：打 tag、建 Release、上传发行包。
 *
 * 用法：
 *   node scripts/release.js --github        # 只建 GitHub Release
 *   node scripts/release.js --gitee         # 只建 Gitee Release
 *   node scripts/release.js --all           # 两边都建
 *   node scripts/release.js --tag-only      # 只打 tag 并推送，不建 Release
 *
 * 需要的环境变量：
 *   GITHUB_TOKEN   GitHub 个人访问令牌（repo 权限）
 *   GITEE_TOKEN    Gitee 私人令牌（projects 权限）
 *
 * 发版前会跑结构自检。自检不过直接退出。
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const wantGitHub = args.includes('--github') || args.includes('--all');
const wantGitee = args.includes('--gitee') || args.includes('--all');
const tagOnly = args.includes('--tag-only');

if (!wantGitHub && !wantGitee && !tagOnly) {
  console.log(`用法：
  node scripts/release.js --github       只建 GitHub Release
  node scripts/release.js --gitee        只建 Gitee Release
  node scripts/release.js --all          两边都建
  node scripts/release.js --tag-only     只打 tag 并推送`);
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const version = pkg.version;
const tag = `v${version}`;
const owner = 'itxinfei';
const repo = 'pm-ai-skill';
const notesPath = path.join(root, '.github', 'release-notes', `${tag}.md`);

if (!fs.existsSync(notesPath)) {
  console.error(`找不到发行说明：.github/release-notes/${tag}.md`);
  console.error(`先写一份，再发版。`);
  process.exit(1);
}
const notes = fs.readFileSync(notesPath, 'utf8');

// 1. 自检
console.log(`[1/5] 结构自检`);
try {
  execSync('node scripts/check.js', { cwd: root, stdio: 'inherit' });
} catch (e) {
  console.error('自检未通过，发版中止。');
  process.exit(1);
}

// 2. 打 tag
console.log(`[2/5] 打 tag ${tag}`);
try {
  execSync(`git rev-parse ${tag}`, { cwd: root, stdio: 'pipe' });
  console.log(`  tag ${tag} 已存在，跳过`);
} catch (e) {
  execSync(`git tag -a ${tag} -m "${tag} ${pkg.description}"`, { cwd: root, stdio: 'inherit' });
  console.log(`  已创建 ${tag}`);
}

// 3. 推送
console.log(`[3/5] 推送 main 和 tag`);
for (const remote of ['origin', 'gitee']) {
  try {
    execSync(`git push ${remote} main`, { cwd: root, stdio: 'pipe' });
    execSync(`git push ${remote} ${tag}`, { cwd: root, stdio: 'pipe' });
    console.log(`  ${remote} 推送完成`);
  } catch (e) {
    console.error(`  ${remote} 推送失败：${e.message.split('\n')[0]}`);
  }
}

if (tagOnly) {
  console.log(`\n完成。tag ${tag} 已推送，未创建 Release。`);
  process.exit(0);
}

// 4. 打发行包
console.log(`[4/5] 打包`);
const distDir = path.join(root, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
const zipPath = path.join(distDir, `pm-ai-skill-${tag}.zip`);
const stage = path.join(distDir, 'pm-ai-skill');
fs.rmSync(stage, { recursive: true, force: true });
fs.mkdirSync(stage, { recursive: true });
const include = [
  'bin', 'docs', 'examples', 'templates', 'skill-source', 'scripts',
  'README.md', 'README_EN.md', 'LICENSE', 'CHANGELOG.md', 'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md', 'SECURITY.md', 'package.json', 'package-lock.json',
  'install.ps1', 'install.sh',
  // 依赖一起打进去，下载解压就能跑，不用再 npm install
  'node_modules',
];
for (const item of include) {
  const src = path.join(root, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, path.join(stage, item), { recursive: true });
  }
}
if (process.platform === 'win32') {
  execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${stage}' -DestinationPath '${zipPath}' -Force"`, { cwd: root, stdio: 'pipe' });
} else {
  execSync(`cd "${distDir}" && zip -qr "${path.basename(zipPath)}" pm-ai-skill`, { stdio: 'pipe' });
}
fs.rmSync(stage, { recursive: true, force: true });
const zipSize = (fs.statSync(zipPath).size / 1024 / 1024).toFixed(1);
console.log(`  ${path.basename(zipPath)}（${zipSize} MB）`);

// 5. 建 Release
console.log(`[5/5] 创建 Release`);

async function createGitHub() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('  跳过：没设 GITHUB_TOKEN');
    console.error('  设置方法：$env:GITHUB_TOKEN="ghp_xxx" 或 export GITHUB_TOKEN=ghp_xxx');
    return;
  }
  const base = `https://api.github.com/repos/${owner}/${repo}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': 'pm-ai-skill-release',
  };

  let release;
  const existing = await fetch(`${base}/releases/tags/${tag}`, { headers }).catch(() => null);
  if (existing && existing.ok) {
    release = await existing.json();
    console.log(`  GitHub：${tag} 已有 Release，跳过创建`);
  } else {
    const res = await fetch(`${base}/releases`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ tag_name: tag, name: `${tag}`, body: notes, draft: false, prerelease: false }),
    });
    if (!res.ok) {
      console.error(`  GitHub 创建失败：${res.status} ${await res.text()}`);
      return;
    }
    release = await res.json();
    console.log(`  GitHub 已创建：${release.html_url}`);
  }

  // 上传发行包
  const assets = release.assets || [];
  const zipName = path.basename(zipPath);
  if (assets.some(a => a.name === zipName)) {
    console.log(`  GitHub：${zipName} 已存在，跳过上传`);
    return;
  }
  const uploadUrl = `https://uploads.github.com/repos/${owner}/${repo}/releases/${release.id}/assets?name=${zipName}`;
  const buf = fs.readFileSync(zipPath);
  const up = await fetch(uploadUrl, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/zip', 'User-Agent': 'pm-ai-skill-release' },
    body: buf,
  });
  if (up.ok) {
    const asset = await up.json();
    console.log(`  GitHub 已上传：${asset.browser_download_url}`);
  } else {
    console.error(`  GitHub 上传失败：${up.status} ${await up.text()}`);
  }
}

async function createGitee() {
  const token = process.env.GITEE_TOKEN;
  if (!token) {
    console.error('  跳过：没设 GITEE_TOKEN');
    console.error('  申请地址：https://gitee.com/profile/personal_access_tokens');
    console.error('  勾选 projects 权限，拿到令牌后：$env:GITEE_TOKEN="xxx"');
    return;
  }
  const res = await fetch(`https://gitee.com/api/v5/repos/${owner}/${repo}/releases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: token,
      tag_name: tag,
      name: tag,
      body: notes,
      target_commitish: 'main',
      prerelease: false,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    console.log(`  Gitee 已创建：https://gitee.com/${owner}/${repo}/releases/tag/${tag}`);
  } else {
    console.error(`  Gitee 创建失败：${res.status} ${await res.text()}`);
  }
}

(async () => {
  if (wantGitHub) await createGitHub();
  if (wantGitee) await createGitee();
})();
