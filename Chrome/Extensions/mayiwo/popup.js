
document.addEventListener('DOMContentLoaded', function () {
  // 在popup中执行脚本
  // chrome.tabs.executeScript(null, {file: "content_script.js"});
  chrome.storage.sync.get(['songInfo', 'songLink'], function(data) {
    // Notify that we saved.
    console.log(data)
    if (data.songInfo.link) {
      document.querySelector('#songInfo').innerHTML = data.songInfo
      document.querySelector('#link').setAttribute('href', data.songLink)
      chrome.browserAction.setBadgeText({text: ''})
    }
  });


  // TODO 貌似接收不到
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log(request, sender, sendResponse);
    sendResponse('我是popup，我已收到你的消息：' + JSON.stringify(request));
    chrome.browserAction.setBadgeText({text: ''})
  });
});


