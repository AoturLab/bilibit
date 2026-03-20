# 🎬 bilibit - Bilibili Video Downloader Expert

> Your expert Bilibili video downloader. Search, download, and manage videos with danmaku support.

[![npm version](https://img.shields.io/npm/v/bilibit.svg)](https://www.npmjs.com/package/bilibit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**[🇨🇳 中文文档](README_CN.md)**

---

## ✨ Features

- 🔍 **Search & Download** - Search by keyword, download in one click
- 🎯 **Bilibili Expert** - Optimized for Bilibili, supports 4K/8K
- 🎬 **Danmaku Support** - Download videos with danmaku (XML format)
- 🚀 **Easy to Use** - One command to get started
- 📦 **npm Package** - Install with one command
- 🤖 **AI Friendly** - OpenClaw Skill support

---

## 📦 Installation

### Option 1: npm (Recommended)

```bash
npm install -g bilibit
```

### Option 2: clawhub (OpenClaw Skill)

```bash
clawhub install bilibit
```

### Option 3: GitHub

```bash
git clone https://github.com/AoturLab/bilibit.git
cd bilibit
npm install && npm link
```

### System Dependencies

**bilibit will auto-install BBDown during installation**

If auto-install fails, manually install:

```bash
# macOS
brew install bbdown ffmpeg

# Linux
sudo apt install bbdown ffmpeg

# Windows
# Visit https://github.com/nilaoda/BBDown/releases to download
```

---

## 🚀 Quick Start

### Download Video

```bash
# Direct download
bilibit https://b23.tv/BV1xx

# With quality selection
bilibit https://b23.tv/BV1xx --quality 4K

# With danmaku
bilibit https://b23.tv/BV1xx --danmaku
```

### Search Videos

```bash
# Search
bilibit search "LOL highlights"

# Search with cookie (better results)
bilibit search "LOL" --cookie "SESSDATA=xxx"

# Search and download 1st result
bilibit search "LOL" --select 1
```

💡 **Tip**: Use Bilibili cookie for better search results. Get cookie from browser developer tools.

### View History

```bash
bilibit history
```

---

## 💬 Natural Language Examples

When using with AI assistants, you can say:

| You Say | AI Calls |
|---------|----------|
| "Download this Bilibili video" + URL | `bilibit <url>` |
| "Find a 3 minute LOL video" | `bilibit search "LOL" --duration short` |
| "Download with danmaku" | `bilibit <url> --danmaku` |
| "Search Bilibili tutorials" | `bilibit search "tutorial" --platform bilibili` |

---

## 📋 Command Reference

| Command | Description | Options |
|---------|-------------|---------|
| `bilibit <url>` | Download video | `--quality`, `--danmaku`, `--output` |
| `bilibit search <keyword>` | Search videos | `--platform`, `--duration`, `--select` |
| `bilibit history` | View history | `--limit` |
| `bilibit --help` | Show help | - |
| `bilibit --version` | Show version | - |

### Download Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--quality` | `-q` | Video quality (4K, 1080P, etc.) | best |
| `--danmaku` | `-d` | Download danmaku | false |
| `--output` | `-o` | Output directory | ./downloads |
| `--cookie` | `-c` | Cookie file path | - |

### Search Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--page` | - | Page number | 1 |
| `--limit` | `-l` | Results per page | 20 |
| `--select` | `-s` | Auto-download Nth result | - |

---

## ⚠️ Notes

- **Copyright**: For personal learning and research only
- **Premium Quality**: Requires Bilibili Premium cookie for 1080P+
- **Danmaku**: Saved as XML format, can be loaded in players

---

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/AoturLab/bilibit.git
cd bilibit

# Install dependencies
npm install

# Link to global
npm link

# Run tests
npm test
```

---

## 📊 Project Status

- [x] Project initialization
- [x] SKILL.md (OpenClaw Skill)
- [x] BBDown integration
- [x] Search functionality
- [x] CLI commands
- [x] Download history
- [x] Auto-install BBDown
- [ ] Unit tests
- [ ] E2E tests

---

## 🔗 Links

- **GitHub**: https://github.com/AoturLab/bilibit
- **npm**: https://www.npmjs.com/package/bilibit
- **Issues**: https://github.com/AoturLab/bilibit/issues

---

## 📄 License

MIT License

---

## 🙏 Credits

- [BBDown](https://github.com/nilaoda/BBDown) - Bilibili downloader core
- [OpenClaw](https://github.com/openclaw/openclaw) - AI Skill framework
