/**
 * CLI command parser and handler
 * @module cli
 */

const bbdown = require('./downloader/bbdown');
const search = require('./api/search');
const history = require('./utils/history');

/**
 * Parse command line arguments
 * @param {string[]} args - Command line arguments
 * @returns {Object}
 */
function parseArgs(args) {
  const command = args[0];
  const options = {};
  const positional = [];
  
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = args[i + 1];
      
      if (value && !value.startsWith('--')) {
        options[key] = value;
        i++;
      } else {
        options[key] = true;
      }
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1);
      const value = args[i + 1];
      
      if (value && !value.startsWith('-')) {
        options[key] = value;
        i++;
      } else {
        options[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  
  return { command, options, positional };
}

/**
 * Handle download command
 * @param {string} url - Video URL
 * @param {Object} options - Download options
 */
async function handleDownload(url, options) {
  console.log('🎬 Starting download...\n');
  
  const result = await bbdown.download(url, {
    quality: options.quality || options.q,
    danmaku: options.danmaku || options.d,
    cookieFile: options.cookie || options.c,
    outputDir: options.output || options.o
  });
  
  if (result.success) {
    console.log('\n✅ Download completed!');
    
    // Add to history
    const videoId = bbdown.extractVideoId(url);
    if (videoId) {
      const videoInfo = await search.getVideoInfo(videoId);
      if (videoInfo.success) {
        history.addRecord({
          videoId,
          url,
          title: videoInfo.info.title,
          author: videoInfo.info.author,
          downloadPath: result.output,
          quality: options.quality || options.q,
          danmaku: options.danmaku || options.d
        });
      }
    }
  } else {
    console.error('\n❌ Download failed:', result.error);
    process.exit(1);
  }
}

/**
 * Handle search command
 * @param {string} keyword - Search keyword
 * @param {Object} options - Search options
 */
async function handleSearch(keyword, options) {
  console.log(`🔍 Searching for "${keyword}"...\n`);
  
  const result = await search.search(keyword, {
    page: parseInt(options.page) || 1,
    pageSize: parseInt(options.limit) || parseInt(options.l) || 20,
    cookie: options.cookie || options.c
  });
    pageSize: options.limit || 20
  });
  
  if (result.success) {
    console.log(`Found ${result.total} results (Page ${result.page})\n`);
    
    if (result.results.length === 0) {
      console.log('No results found.');
      return;
    }
    
    result.results.forEach((video, index) => {
      console.log(`${(index + 1).toString().padStart(2)}. ${video.title}`);
      console.log(`   👤 ${video.author} | ⏱️ ${video.duration} | ▶️ ${formatCount(video.playCount)}`);
      console.log(`   🔗 ${video.url}\n`);
    });
    
    // Auto-select and download if specified
    if (options.select) {
      const selectedIndex = parseInt(options.select, 10) - 1;
      if (selectedIndex >= 0 && selectedIndex < result.results.length) {
        const selected = result.results[selectedIndex];
        console.log(`\n📥 Downloading: ${selected.title}`);
        await handleDownload(selected.url, options);
      } else {
        console.error('Invalid selection number.');
        process.exit(1);
      }
    }
  } else {
    console.error('❌ Search failed:', result.error);
    process.exit(1);
  }
}

/**
 * Handle history command
 * @param {Object} options - History options
 */
function handleHistory(options) {
  const limit = parseInt(options.limit || 10, 10);
  history.printHistory(limit);
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
🎬 bilibit - B 站视频下载专家

Usage:
  bilibit <url> [options]           Download video
  bilibit search <keyword> [opts]   Search videos
  bilibit history [options]         View download history
  bilibit --help                    Show this help
  bilibit --version                 Show version

Download Options:
  -q, --quality <quality>          Video quality (4K, 1080P, etc.)
  -d, --danmaku                    Download danmaku
  -c, --cookie <file>              Cookie file path
  -o, --output <dir>               Output directory

Search Options:
  --page <num>                     Page number (default: 1)
  --limit, -l <num>                Results per page (default: 20)
  --select, -s <num>               Auto-download Nth result

History Options:
  --limit <num>                    Number of records (default: 10)

Examples:
  bilibit https://b23.tv/BV1xx
  bilibit https://b23.tv/BV1xx --quality 4K --danmaku
  bilibit search "LOL 集锦"
  bilibit search "教程" --select 1
  bilibit history --limit 20
`);
}

/**
 * Show version
 */
function showVersion() {
  const pkg = require('../package.json');
  console.log(`bilibit v${pkg.version}`);
}

/**
 * Format count number (e.g., 12345 -> 1.2 万)
 * @param {number} count - Count number
 * @returns {string}
 */
function formatCount(count) {
  if (!count) return '0';
  
  const num = typeof count === 'string' ? parseInt(count, 10) : count;
  
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  
  return num.toString();
}

/**
 * Main CLI entry point
 * @param {string[]} args - Command line arguments
 */
async function main(args) {
  // Handle --help and --version first (even if first arg)
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  if (args.includes('--version') || args.includes('-v')) {
    showVersion();
    return;
  }
  
  const { command, options, positional } = parseArgs(args);
  
  // No command provided
  if (!command || command.startsWith('-')) {
    console.error('❌ Please provide a URL or command. Use --help for usage.');
    process.exit(1);
  }
  
  // Handle commands
  switch (command) {
    case 'search':
      if (positional.length === 0) {
        console.error('❌ Please provide a search keyword.');
        process.exit(1);
      }
      await handleSearch(positional.join(' '), options);
      break;
      
    case 'history':
      handleHistory(options);
      break;
      
    default:
      // Assume it's a URL for download
      await handleDownload(command, options);
      break;
  }
}

module.exports = {
  parseArgs,
  handleDownload,
  handleSearch,
  handleHistory,
  showHelp,
  showVersion,
  main
};
main
};
