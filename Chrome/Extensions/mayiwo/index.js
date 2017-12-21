// 1. 获取mp3地址
// 2. 利用jsmediatags 获取mp3信息

document.addEventListener('DOMContentLoaded', function () {

  const MP3_URL = ''
  if (document.querySelector(".hd_audio")) {
    MP3_URL = document.querySelector(".hd_audio").getAttribute('data-music')
    console.log('read')
    jsmediatags.read(MP3_URL, {
      onSuccess: function(tag) {
        console.log(tag);
      },
      onError: function(error) {
        console.log(error);
      }
    });
  }

  console.log('end')
});

