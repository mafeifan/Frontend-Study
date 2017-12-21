
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

setTimeout(() => {
  let PAGE_MP3_URL = ''
  if (document.querySelector(".hd_audio")) {
    PAGE_MP3_URL = document.querySelector(".hd_audio").getAttribute('data-music')
    jsmediatags.read(PAGE_MP3_URL, {
      onSuccess: function(result) {
        console.log(result);
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
}, 2000)

