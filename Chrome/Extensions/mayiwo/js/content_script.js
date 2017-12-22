
function formatResult(tags) {
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
  return arr.join(',')
}

// 歌曲加载是异步的，所以要等一会儿
setTimeout(() => {
  main()
}, 1500)

function main() {
  let PAGE_MP3_URL = ''
  if (document.querySelector(".hd_audio")) {
    PAGE_MP3_URL = document.querySelector(".hd_audio").getAttribute('data-music')
    jsmediatags.read(PAGE_MP3_URL, {
      onSuccess: function(result) {
        console.log(result);
        // 发现歌曲，切换图标
        //
        chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
          console.log(response.farewell);
        });

        if (result.tags) {
          console.log(formatResult(result.tags))
        }
        else {
          console.log('没有元信息，哭脸')
        }
      },
      onError: function(error) {
        console.log(error);
      }
    });
  }
}

