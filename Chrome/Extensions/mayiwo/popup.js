// 1. 获取mp3地址
// 2. 利用jsmediatags 获取mp3信息

document.addEventListener('DOMContentLoaded', function () {
  // 在tab中执行脚本
  // console.log('1')
  // chrome.tabs.executeScript(null, {file: "content_script.js"});

});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello") {
      sendResponse({farewell: "goodbye"});
      chrome.browserAction.setIcon({path: 'icons/icon16_active.png'})
    }
    else {
      console.log('res end')
      sendResponse({}); // snub them.
    }
  });
