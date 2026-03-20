# 🎬 bilibit - B 站视频下载专家

> 你的 B 站视频助手！支持搜索、下载、弹幕下载。

[![npm version](https://img.shields.io/npm/v/bilibit.svg)](https://www.npmjs.com/package/bilibit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**[🇺🇸 English Documentation](README.md)**

---

## ✨ 特性

- 🔍 **搜索 + 下载一体化** - 关键词搜索，一键下载
- 🎯 **专注 B 站** - 深度优化，支持 4K/8K
- 🎬 **弹幕下载** - 独家功能，弹幕一起保存
- 🚀 **简单易用** - 一条命令搞定
- 📦 **npm 包** - 安装简单
- 🤖 **AI 友好** - OpenClaw Skill 支持

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
git clone https://github.com/AoturLab/bilibit.git
cd bilibit
npm install && npm link
```

### 系统依赖

**安装 bilibit 时会自动检查并安装 BBDown**

如果自动安装失败，可以手动安装：

```bash
# macOS
brew install bbdown ffmpeg

# Linux
sudo apt install bbdown ffmpeg

# Windows
# 访问 https://github.com/nilaoda/BBDown/releases 下载安装
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
| `bilibit --version` | 版本号 | - |

### 下载选项

| 参数 | 简写 | 说明 | 默认值 |
|------|------|------|--------|
| `--quality` | `-q` | 视频画质（4K, 1080P 等） | best |
| `--danmaku` | `-d` | 下载弹幕 | false |
| `--output` | `-o` | 输出目录 | ./downloads |
| `--cookie` | `-c` | Cookie 文件路径 | - |

### 搜索选项

| 参数 | 简写 | 说明 | 默认值 |
|------|------|------|--------|
| `--page` | - | 页码 | 1 |
| `--limit` | `-l` | 每页结果数 | 20 |
| `--select` | `-s` | 自动下载第 N 个结果 | - |

---

## ⚠️ 注意事项

- **版权**：仅限个人学习和研究使用
- **大会员画质**：1080P+ 需要大会员 Cookie
- **弹幕**：保存为 XML 格式，可用播放器加载

---

## 🛠️ 开发

```bash
# 克隆仓库
git clone https://github.com/AoturLab/bilibit.git
cd bilibit

# 安装依赖
npm install

# 链接到全局
npm link

# 运行测试
npm test
```

---

## 📊 项目进度

- [x] 项目初始化
- [x] SKILL.md（OpenClaw Skill）
- [x] BBDown 集成
- [x] 搜索功能
- [x] CLI 命令
- [x] 下载历史
- [x] BBDown 自动安装
- [ ] 单元测试
- [ ] E2E 测试

---

## 🔗 相关链接

- **GitHub**: https://github.com/AoturLab/bilibit
- **npm**: https://www.npmjs.com/package/bilibit
- **问题反馈**: https://github.com/AoturLab/bilibit/issues

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- [BBDown](https://github.com/nilaoda/BBDown) - B 站下载核心
- [OpenClaw](https://github.com/openclaw/openclaw) - AI Skill 框架
