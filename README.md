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
- 📝 **下载历史** - 自动记录下载历史

---

## 📦 安装

### 方式 1：npm（推荐）

```bash
npm install -g bilibit
```

### 方式 2：本地开发

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

# 验证安装
bbdown --version
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

# 指定输出目录
bilibit https://b23.tv/BV1xx --output ~/Videos

# 使用 Cookie（大会员画质）
bilibit https://b23.tv/BV1xx --cookie ~/.bilibit/cookies.json
```

### 搜索视频

```bash
# 搜索
bilibit search "LOL 集锦"

# 搜索并限制结果数
bilibit search "教程" --limit 10

# 搜索并下载第 1 个结果
bilibit search "LOL" --select 1

# 搜索并下载（带画质选项）
bilibit search "教程" --select 1 --quality 1080P
```

### 查看历史

```bash
# 查看最近 10 条
bilibit history

# 查看最近 20 条
bilibit history --limit 20
```

### 帮助信息

```bash
bilibit --help
bilibit --version
```

---

## 📋 完整命令

| 命令 | 说明 | 参数 |
|------|------|------|
| `bilibit <url>` | 下载视频 | `--quality`, `--danmaku`, `--cookie`, `--output` |
| `bilibit search <关键词>` | 搜索视频 | `--page`, `--limit`, `--select` |
| `bilibit history` | 查看历史 | `--limit` |
| `bilibit --help` | 帮助信息 | - |
| `bilibit --version` | 版本号 | - |

### 下载参数

| 参数 | 简写 | 说明 |
|------|------|------|
| `--quality` | `-q` | 画质选择 (4K, 1080P, 720P 等) |
| `--danmaku` | `-d` | 下载弹幕 |
| `--cookie` | `-c` | Cookie 文件路径 |
| `--output` | `-o` | 输出目录 |

### 搜索参数

| 参数 | 说明 |
|------|------|
| `--page` | 页码 (默认 1) |
| `--limit` | 每页结果数 (默认 20) |
| `--select` | 自动下载第 N 个结果 |

---

## 💡 使用示例

### 场景 1：下载单个视频

```bash
bilibit https://www.bilibili.com/video/BV1GJ411x7h7
```

### 场景 2：下载 4K 画质带弹幕

```bash
bilibit https://b23.tv/BV1xx --quality 4K --danmaku
```

### 场景 3：搜索并下载

```bash
# 先搜索看看
bilibit search "前端教程"

# 直接下载第 1 个结果
bilibit search "前端教程" --select 1
```

### 场景 4：大会员视频

```bash
# 先导出 Cookie（使用浏览器插件）
# 然后使用 Cookie 下载
bilibit https://b23.tv/BV1xx --cookie ~/.bilibit/cookies.json
```

---

## 📁 文件结构

```
bilibit/
├── bin/
│   └── bilibit.js          # CLI 入口
├── src/
│   ├── cli.js              # 命令解析
│   ├── api/
│   │   └── search.js       # B 站搜索 API
│   ├── downloader/
│   │   └── bbdown.js       # BBDown 封装
│   └── utils/
│       └── history.js      # 下载历史
├── tests/                  # 测试文件
├── package.json
├── README.md
└── .gitignore
```

---

## ⚠️ 注意事项

- **版权**：仅限个人学习和研究使用，请勿用于商业用途
- **大会员画质**：需要导入 Cookie 文件
- **弹幕**：保存为 XML 格式，可用播放器加载
- **系统依赖**：需要安装 BBDown 和 ffmpeg

---

## 🔧 开发

```bash
# 安装依赖
npm install

# 本地测试
npm link
bilibit --help

# 运行测试
npm test
```

---

## 📊 开发进度

- [x] 项目初始化
- [x] BBDown 封装
- [x] 搜索功能
- [x] CLI 命令解析
- [x] 下载历史
- [x] 文档完善
- [ ] 单元测试
- [ ] npm 发布

---

## 🔗 相关链接

- **GitHub**: https://github.com/chenlong1314/bilibit
- **npm**: https://www.npmjs.com/package/bilibit
- **BBDown**: https://github.com/nilaoda/BBDown
- **问题反馈**: https://github.com/chenlong1314/bilibit/issues

---

## 📄 许可证

MIT License

---

## 🙏 致谢

- [BBDown](https://github.com/nilaoda/BBDown) - B 站命令行下载工具
- [ffmpeg](https://ffmpeg.org/) - 音视频处理工具
