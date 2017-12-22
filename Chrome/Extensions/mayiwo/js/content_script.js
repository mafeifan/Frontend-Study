
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
          chrome.runtime.sendMessage({song: result.tags, link: MUSIC_URL}, function(response) {
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


