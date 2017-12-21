// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function clickDiv(e) {
  chrome.tabs.executeScript(null,
      {code: "document.body.style.backgroundColor='" + e.target.value + "'"});
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  // 获取 type:color
  const colorElement = document.querySelector('#color')
  // 获取color value
  colorElement.addEventListener('change', clickDiv)


  // 改成用事件委托
  // document.body.addEventListener('click', clickDiv)
  // var divs = document.querySelectorAll('div');
  // for (var i = 0; i < divs.length; i++) {
  //   divs[i].addEventListener('click', click);
  // }
});
