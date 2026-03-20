# 🎬 bilibit - B 站视频下载专家

> Bilibili Video Downloader Expert

[![npm version](https://img.shields.io/npm/v/bilibit.svg)](https://www.npmjs.com/package/bilibit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ 特性

- 🔍 **搜索 + 下载一体化** - 关键词搜索，一键下载
- 🎯 **专注 B 站** - 深度优化，支持 4K/8K
- 🎬 **弹幕下载** - 独家功能，弹幕一起保存
- 🚀 **简单易用** - 一条命令搞定
- 📦 **npm 包** - 安装简单

---

## 📦 安装

### 方式 1：npm（推荐）

```bash
npm install -g bilibit
```

### 方式 2：clawhub（OpenClaw Skill）

```bash
clawhub install bilibit
```

### 方式 3：GitHub

```bash
git clone https://github.com/chenlong1314/bilibit.git
cd bilibit
npm install && npm link
```

### 系统依赖

```bash
# macOS
brew install bbdown ffmpeg

# Linux
sudo apt install bbdown ffmpeg
```

---

## 🚀 快速开始

### 下载视频

```bash
# 直接下载
bilibit https://b23.tv/BV1xx

# 指定画质
bilibit https://b23.tv/BV1xx --quality 4K

# 下载带弹幕
bilibit https://b23.tv/BV1xx --danmaku
```

### 搜索视频

```bash
# 搜索
bilibit search "LOL 集锦"

# 搜索并下载第 1 个
bilibit search "LOL" --select 1
```

### 查看历史

```bash
bilibit history
```

---

## 💬 自然语言示例

配合 AI 使用时，你可以说：

| 你说 | AI 调用 |
|------|--------|
| "下载这个 B 站视频" + URL | `bilibit <url>` |
| "找个 LOL 的 3 分钟视频" | `bilibit search "LOL" --duration short` |
| "下载带弹幕的视频" | `bilibit <url> --danmaku` |
| "找 B 站的教程" | `bilibit search "教程" --platform bilibili` |

---

## 📋 完整命令

| 命令 | 说明 | 参数 |
|------|------|------|
| `bilibit <url>` | 下载视频 | `--quality`, `--danmaku`, `--output` |
| `bilibit search <关键词>` | 搜索视频 | `--platform`, `--duration`, `--select` |
| `bilibit history` | 查看历史 | `--limit` |
| `bilibit --help` | 帮助信息 | - |

---

## ⚠️ 注意事项

- **版权**：仅限个人学习和研究使用
- **大会员画质**：需要导入 Cookie
- **弹幕**：保存为 XML 格式，可用播放器加载

---

## 📊 开发进度

- [x] 项目初始化
- [x] SKILL.md 创建
- [ ] BBDown 封装
- [ ] 弹幕下载
- [ ] 搜索功能
- [ ] 测试与文档

---

## 🔗 相关链接

- **GitHub**: https://github.com/chenlong1314/bilibit
- **npm**: https://www.npmjs.com/package/bilibit
- **问题反馈**: https://github.com/chenlong1314/bilibit/issues

---

## 📄 许可证

MIT License
