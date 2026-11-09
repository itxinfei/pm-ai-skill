#!/usr/bin/env bash
# PM-AI-Skill 一键安装脚本（macOS / Linux）
# 支持所有主流 AI CLI 和 IDE
# 用法：curl -fsSL https://gitee.com/itxinfei/pm-ai-skill/raw/main/install.sh | bash

set -e

SKILL_NAME="pm-ai-skill"
ZIP_URL="https://gitee.com/itxinfei/pm-ai-skill/repository/archive/main.zip"

echo "=== PM-AI-Skill 一键安装 ==="
echo ""

# 1. 下载并解压
TMP_DIR=$(mktemp -d)
TMP_ZIP="$TMP_DIR/pm-ai-skill.zip"

echo "[1/4] 下载中..."
curl -fsSL "$ZIP_URL" -o "$TMP_ZIP"

echo "[2/4] 解压中..."
unzip -q "$TMP_ZIP" -d "$TMP_DIR"

EXTRACTED_ROOT=$(find "$TMP_DIR" -maxdepth 1 -type d -name "*pm-ai-skill*" | head -1)
SKILL_SOURCE="$EXTRACTED_ROOT/skill-source"

if [ ! -d "$SKILL_SOURCE" ]; then
    SKILL_SOURCE=$(find "$TMP_DIR" -name "skill.json" -type f | head -1 | xargs dirname)
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
fi

# 清理
rm -rf "$TMP_DIR"

echo ""
echo "[4/4] 安装完成"
echo ""
echo "重启工具后直接说：用 RICE 模型评估一下这些需求"
