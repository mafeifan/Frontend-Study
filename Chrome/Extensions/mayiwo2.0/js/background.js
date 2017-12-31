// background权限比较高，常驻脚本，可以操作browserAction
// https://developer.chrome.com/extensions/webRequest
// 注意：测试的时候关闭翻墙程序

// 匹配歌曲地址
const MATCH_URL = 'http://mp3file'

function getDownLoadTitle(tags) {
  let str = ''
  if (tags.title && tags.artist) {
    return `${tags.title}-${tags.artist}.mp3`
  }
  if (tags.title) {
    return `${tags.title}.mp3`
  }
  if (tags.artist) {
    return `${tags.artist}.mp3`
  }
  return 'untitle.mp3'
}

function readMP3(url) {
  return new Promise ((resolve, reject) => {
    jsmediatags.read(url, {
      onSuccess: result => {
        if (result.tags) {
          // console.log(result.tags)
          const song = {
            info: buildMP3String(result.tags),
            link: url,
            downloadTitle: getDownLoadTitle(result.tags)
          }
          resolve(song)
        }
        else {
          reject('没有检测到音乐')
        }
      },
      onError: error => {
        reject(error)
      }
    })
  })
}

function sendNotify(song) {
  chrome.notifications.create(null, {
    type: 'basic',
    iconUrl: 'img/icon.png',
    title: '检测到歌曲',
    message: song.info,
  });
  return song
}

/**
 * 输出歌曲的基本ID3信息
 * @param  {[type]} tags [description]
 * @return string
 */
function buildMP3String(tags) {
  let arr = []
  if (tags.title) {
    arr.push(`歌曲名：${tags.title}`)
  }
  if (tags.artist) {
    arr.push(`艺术家：${tags.artist}`)
  }
  if (tags.album) {
    arr.push(`专辑：${tags.album}`)
  }
  if (tags.genre) {
    arr.push(`曲风：${tags.genre}`)
  }
  return arr.join('\r\n')
}

// https://developer.chrome.com/extensions/webRequest
// 拦截请求，需要webRequest和webRequestBlocking权限
chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  if (details.type === 'media' && details.url.startsWith(MATCH_URL)) {
    console.log(details)
    readMP3(details.url)
      .then(res => {
        sendNotify(res)
        return res
      })
      .then((song) => {
        // 添加右键菜单,需要contextMenus权限
        chrome.contextMenus.create({
          id: '77',
          title: "下载蚂蚁窝音乐",
          onclick: function(){
            chrome.downloads.download({
              url: song.link,
              filename: song.downloadTitle
            })

            // https://developer.chrome.com/extensions/tabs
            // 在tab页面执行脚本
            // chrome.tabs.executeScript(null, {
            //   code: 'var e = document.createElement(\'a\');e.download="demo";e.href = "' + song.link + '";document.body.appendChild(e);e.click()'
            // });
          }
        });
      })
      .catch(error => console.log(error))
  }
},{urls: [ "<all_urls>" ]}, ['requestHeaders','blocking']
)


