export function log(str) {
  // let G = console.log.bind(console);
  return console.log(str)
}

// 碰撞检测工具方法
export function rectIntersects(a, b) {
  // 检测必须有image属性
  let o = a
  if (b.y > o.y && b.y < o.y + o.image.height) {
    if (b.x > o.x && b.x < o.x + o.image.width) {
      return true
    }
  }
  return false
}

export function aInb(x, x1, x2) {
  return x >= x1 && x <= x2
}

export function loadImageAsync(url) {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = url
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Could not load image at ' + url))
  });
}
