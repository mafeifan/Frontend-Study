// background权限比较高，常驻脚本，可以操作browserAction'

// 接收来自content_script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('message from background')
  console.log(request, sender, sendResponse)
  sendResponse('我是background，我已收到你的消息：' + JSON.stringify(request))

  // 修改图标
  chrome.browserAction.setBadgeText({text: '1'})
});
