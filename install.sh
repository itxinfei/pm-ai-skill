#!/usr/bin/env bash
# PM-AI-Skill 一键安装脚本（macOS / Linux）
# 支持所有主流 AI CLI 和 IDE
# 用法：curl -fsSL https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.sh | bash

set -e

SKILL_NAME="pm-ai-skill"

echo "=== PM-AI-Skill 一键安装 ==="
echo ""

if ! command -v unzip >/dev/null 2>&1; then
    echo "需要 unzip 才能解压，请先装：apt install unzip / brew install unzip"
    exit 1
fi

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT
TMP_ZIP="$TMP_DIR/pm-ai-skill.zip"

# 1. 下载。Gitee 的 archive 链接有时返回网页不是 zip，所以下回来先验一遍能不能解压
echo "[1/4] 下载中..."
SOURCES=(
    "https://github.com/itxinfei/pm-ai-skill/archive/refs/heads/main.zip"
    "https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip"
)
OK=0
for url in "${SOURCES[@]}"; do
    host=$(echo "$url" | awk -F/ '{print $3}')
    if curl -fsSL "$url" -o "$TMP_ZIP" 2>/dev/null; then
        if unzip -qt "$TMP_ZIP" >/dev/null 2>&1; then
            echo "  来源：$host"
            OK=1
            break
        fi
        echo "  $host 返回的不是有效 zip，换下一个源"
    else
        echo "  $host 连不上，换下一个源"
    fi
done

if [ "$OK" -eq 0 ]; then
    echo "两个源都没取到。手动下载后解压，运行 node bin/index.js install："
    echo "  https://github.com/itxinfei/pm-ai-skill/releases/latest"
    exit 1
fi

echo "[2/4] 解压中..."
unzip -q "$TMP_ZIP" -d "$TMP_DIR"

EXTRACTED_ROOT=$(find "$TMP_DIR" -maxdepth 1 -type d -name "*pm-ai-skill*" | head -1)
SKILL_SOURCE="$EXTRACTED_ROOT/skill-source"

if [ ! -d "$SKILL_SOURCE" ]; then
    SKILL_SOURCE=$(find "$TMP_DIR" -name "skill.json" -type f | head -1 | xargs dirname)
fi

if [ ! -d "$SKILL_SOURCE" ]; then
    echo "压缩包里没找到 skill-source，先别装了，去提个 issue"
    exit 1
fi

# 2. 所有支持的工具目录
TOOL_PATHS=(
    # 国产
    "WorkBuddy:$HOME/.workbuddy/skills"
    "TraeCode CN:$HOME/.trae-cn/skills"
    "Trae:$HOME/.trae/skills"
    # 国外
    "Claude Code:$HOME/.claude/skills"
    "Codex:$HOME/.codex/skills"
    "Gemini CLI:$HOME/.gemini/skills"
    "Cursor:$HOME/.cursor/skills"
    "Windsurf:$HOME/.codeium/windsurf/skills"
    "Kiro:$HOME/.kiro/skills"
    "OpenCode:$HOME/.opencode/skills"
    "Continue:$HOME/.continue/skills"
    # 通用约定（豆包、Cline、Roo Code 等）
    "通用 .agents:$HOME/.agents/skills"
)

# 3. 检测并安装
echo "[3/4] 检测已安装的工具..."
COUNT=0

for entry in "${TOOL_PATHS[@]}"; do
    tool="${entry%%:*}"
    path="${entry#*:}"

    if [ -d "$path" ]; then
        dest="$path/$SKILL_NAME"
        rm -rf "$dest"
        cp -r "$SKILL_SOURCE" "$dest"
        echo "  -> $tool: $dest"
        COUNT=$((COUNT + 1))
    fi
done

echo ""
echo "检测到 $COUNT 个工具"

if [ "$COUNT" -eq 0 ]; then
    # 一个都没找到，装到通用目录
    DEFAULT_DIR="$HOME/.agents/skills"
    mkdir -p "$DEFAULT_DIR"
    dest="$DEFAULT_DIR/$SKILL_NAME"
    cp -r "$SKILL_SOURCE" "$dest"
    echo "  -> 通用目录: $dest"
    echo ""
    echo "没检测到已安装的工具，文件已放到 $DEFAULT_DIR"

    # 当前目录里要是已经是这份内容，就别再拷一份
    if [ ! -f "./skill-source/system-prompt.md" ]; then
        cp -r "$SKILL_SOURCE" "./$SKILL_NAME"
        echo "  -> 当前目录: ./$SKILL_NAME"
    fi
fi

echo ""
echo "[4/4] 安装完成"
echo ""
echo "重启工具后直接说：用 RICE 模型评估一下这些需求"
echo "想用 HTML 报告模板和命令行，装 npm 版：npm i -g @itxinfei/pm-ai-skill"
