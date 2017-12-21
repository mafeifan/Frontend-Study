// 1. 获取mp3地址
// 2. 利用jsmediatags 获取mp3信息

jsmediatags.read("http://mp3file1.mafengwo.net/201712221339/4717ea67076f6d094ef847fd29cbc1ac/s10/M00/2E/E1/wKgBZ1njcHWAEDioACmXUq2G7RQ744.mp3", {
  onSuccess: function(tag) {
    console.log(tag);
  },
  onError: function(error) {
    console.log(error);
  }
});
