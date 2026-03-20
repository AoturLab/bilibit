/**
 * Bilibili search API wrapper
 * @module api/search
 */

const https = require('https');

/**
 * Search videos on Bilibili
 * @param {string} keyword - Search keyword
 * @param {Object} options - Search options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.pageSize - Results per page (default: 20)
 * @returns {Promise<{success: boolean, results?: Array, error?: string}>}
 */
async function search(keyword, options = {}) {
  const page = options.page || 1;
  const pageSize = options.pageSize || 20;
  
  const url = new URL('https://api.bilibili.com/x/web-interface/search/type');
  url.searchParams.set('search_type', 'video');
  url.searchParams.set('keyword', encodeURIComponent(keyword));
  url.searchParams.set('page', page.toString());
  url.searchParams.set('pagesize', pageSize.toString());
  
  return new Promise((resolve) => {
    const req = https.get(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com',
        'Accept': 'application/json',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Origin': 'https://www.bilibili.com'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.code !== 0) {
            resolve({
              success: false,
              error: response.message || 'Search API error'
            });
            return;
          }
          
          const results = (response.data.result || []).map(item => ({
            title: item.title.replace(/<[^>]*>/g, ''), // Remove HTML tags
            author: item.author,
            duration: formatDuration(item.duration),
            videoId: item.bvid || item.aid,
            cover: item.pic,
            url: `https://www.bilibili.com/video/${item.bvid || 'av' + item.aid}`,
            playCount: item.play,
            danmakuCount: item.video_review,
            pubDate: item.pubdate
          }));
          
          resolve({
            success: true,
            results,
            total: response.data.numResults || 0,
            page: response.data.page || 1
          });
        } catch (error) {
          resolve({
            success: false,
            error: 'Failed to parse search results: ' + error.message
          });
        }
      });
    });
    
    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });
    
    req.on('response', (res) => {
      if (res.statusCode === 412) {
        resolve({
          success: false,
          error: 'Request blocked by Bilibili. Please try again later or use a proxy.'
        });
      }
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

/**
 * Format duration from seconds to MM:SS or HH:MM:SS
 * @param {number|string} seconds - Duration in seconds
 * @returns {string}
 */
function formatDuration(seconds) {
  if (!seconds) return '0:00';
  
  const totalSeconds = typeof seconds === 'string' ? parseInt(seconds, 10) : seconds;
  
  if (isNaN(totalSeconds)) return '0:00';
  
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Get video info by BV/AV ID
 * @param {string} videoId - BV or AV ID
 * @returns {Promise<{success: boolean, info?: Object, error?: string}>}
 */
async function getVideoInfo(videoId) {
  const isBV = videoId.startsWith('BV');
  const url = new URL(
    isBV 
      ? 'https://api.bilibili.com/x/web-interface/view'
      : 'https://api.bilibili.com/x/web-interface/view'
  );
  url.searchParams.set(isBV ? 'bvid' : 'aid', videoId);
  
  return new Promise((resolve) => {
    const req = https.get(url.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          
          if (response.code !== 0) {
            resolve({
              success: false,
              error: response.message || 'Video info error'
            });
            return;
          }
          
          const info = response.data;
          resolve({
            success: true,
            info: {
              title: info.title,
              author: info.owner.name,
              duration: formatDuration(info.duration),
              videoId: info.bvid,
              cover: info.pic,
              url: `https://www.bilibili.com/video/${info.bvid}`,
              playCount: info.stat.view,
              danmakuCount: info.stat.danmaku,
              pubDate: info.pubdate,
              description: info.desc
            }
          });
        } catch (error) {
          resolve({
            success: false,
            error: 'Failed to parse video info: ' + error.message
          });
        }
      });
    });
    
    req.on('error', (error) => {
      resolve({
        success: false,
        error: error.message
      });
    });
  });
}

module.exports = {
  search,
  getVideoInfo,
  formatDuration
};
