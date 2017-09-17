let G = console.log.bind(console);
// G = content => {
//   document.querySelector('#log').value += '\n' + content
// }


// 碰撞检测工具方法
function rectIntersects(a, b) {
  // 检测必须有image属性
  let o = a
  if (b.y > o.y && b.y < o.y + o.image.height) {
    if (b.x > o.x && b.x < o.x + o.image.width) {
      return true
    }
  }
  return false
}

function aInb(x, x1, x2) {
  return x >= x1 && x <= x2
}

function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not load image at ' + url));
  });
}
