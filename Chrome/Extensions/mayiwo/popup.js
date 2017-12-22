
document.addEventListener('DOMContentLoaded', function () {
  // 在popup中执行脚本
  // chrome.tabs.executeScript(null, {file: "content_script.js"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log(request, sender, sendResponse);
  // 调试的时候才走
  const result =  formatResult(request.song)
  document.querySelector('#songInfo').innerHTML = result
  document.querySelector('#link').setAttribute('href', request.link)
  sendResponse('我是popup，我已收到你的消息：' + JSON.stringify(request));

  chrome.browserAction.setBadgeText({text: ''})
});



/**
 * 输出歌曲的基本ID3信息
 * @param  {[type]} tags [description]
 * @return string
 */
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
  return arr.join('-')
}
