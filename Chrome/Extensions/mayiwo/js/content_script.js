
// 歌曲加载在蚂蚁窝页面是异步的，所以要等一会儿
setTimeout(() => {
  main()
}, 1500)

function getMusicLink() {
  if (document.querySelector('.hd_audio')) {
    return document.querySelector('.hd_audio').getAttribute('data-music')
  }
}

function main() {
  let MUSIC_URL = ''
  // 从network中获取
  MUSIC_URL = getMusicLink()
  if (MUSIC_URL) {
    jsmediatags.read(MUSIC_URL, {
      onSuccess: result => {
        if (result.tags) {
          let song = {songInfo: formatResultToString(result.tags), songLink: MUSIC_URL}
          chrome.storage.sync.set(song, function() {
            // Notify that we saved.
            console.log('storage saved');
          });
          chrome.runtime.sendMessage(song, function(response) {
            console.log(response);
          });
        }
        else {
          console.log('没有检测到音乐')
        }
      },
      onError: error => {
        console.log('请求失败')
        console.log(error)
      }
    })
  }
}


/**
 * 输出歌曲的基本ID3信息
 * @param  {[type]} tags [description]
 * @return string
 */
function formatResultToString(tags, link) {
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
  return arr.join('-')
}
