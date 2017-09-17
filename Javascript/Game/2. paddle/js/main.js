
let Paddle = game => {
  let paddle = game.imageByName('paddle')
  paddle.x = 100
  paddle.y = 250
  paddle.speed = 15
  // 限制挡板左右移动
  paddle.move = x => {
    if (x < 0) {
      x = 0
    }
    if (x > 400 - paddle.w) {
      x = 400 - paddle.w
    }
    paddle.x = x
  }

  paddle.moveLeft = () => {
    paddle.move(paddle.x - paddle.speed)
  }

  paddle.moveRight = () => {
    paddle.move(paddle.x + paddle.speed)
  }

  // 球和板子的碰撞
  paddle.collide = ball => {
    let a = paddle
    let b = ball
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
      if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
        return true
      }
    }
    return false
  }

  return paddle;
}

let Ball = game => {
  let ball = game.imageByName('ball')
  ball = Object.assign(ball, {
    x: 100,
    y: 200,
    speedX: 5,
    speedY: 5,
    fired: false,
  })

  // 按F
  ball.fire = () => {
    ball.fired = true
  }
  ball.move = () => {
    if (ball.fired) {
      // 反弹效果
      if (ball.x < 0 || ball.x > 400) {
        ball.speedX = -ball.speedX
      }
      if (ball.y < 0 || ball.y > 300) {
        ball.speedY = -ball.speedY
      }
      // move
      ball.x += ball.speedX
      ball.y += ball.speedY
    }
  }
  // 反弹
  ball.rebound = () => {
    ball.speedY *= -1
  }

  ball.hasPoint = function(x, y) {
    let xIn = x >= ball.x && x <= ball.x + ball.w
    let yIn = y >= ball.y && y <= ball.y + ball.h
    return xIn && yIn
  }

  return ball
}

/**
 * @param position
 * position 是坐标 [0,0] 格式
 */
let Block = (game, position) => {
  let img = game.imageByName('block')
  let block = {
    x: position[0],
    y: position[1],
    isAlive: true, // 是否出现
    lives: position[2] || 1, // 砖块生命值
    image: img.image,
    w: img.w,
    h: img.h
  }

  block.kill = () => {
    block.lives -= 1
    if (block.lives < 1) {
      block.isAlive = false
    }
  }

  // TODO if instanceOf ball
  // block存在的情况下才判断碰撞
  block.collide = ball => block.isAlive && (rectIntersects(block, ball) || rectIntersects(ball, block))

  return block
}

// function
let Events = {
  actions: {},
  keydowns: {}, // {a: true, b: true}
  registerAction(name, callback) {
    this.actions[name] = callback
  },
  trigger() {
    let actions = Object.keys(this.actions)
    // G(this.keydowns)
    for (let i = 0; i < actions.length; i++) {
      let key = actions[i]
      if (this.keydowns[key]) {
        // 如果按键被按下, 调用注册的 action
        this.actions[key]()
      }
    }
  }
}

// 左下角的分数
class Score {
  constructor() {
    this.step = 100 // 累加值
    this.initNumber = 0
  }
  up() {
    this.initNumber += this.step
  }
}

/**
 *
 * @param images  对象，要载入的图片
 * @param runCallback 载入完成后执行的回调
 * @returns {{scene: null, images: {}}}
 * @constructor
 */
let Game = (images, runCallback) => {
  // 载入图片
  // images 是一个对象, 里面是图片的引用名字和图片路径
  // 程序会在所有图片载入成功后才运行

  let g = {
    scene: null,
    images: {}
  }


  const canvas = document.querySelector('#canvas')
  const context = canvas.getContext('2d')

  g.canvas = canvas
  g.context = context

  g.drawImage = img => g.context.drawImage(img.image, img.x, img.y)
  g.clear = () => g.context.clearRect(0, 0, canvas.width, canvas.height)

  // 注册键盘事件
  window.addEventListener('keydown', () => {
    Events.keydowns[event.key] = true
  })

  window.addEventListener('keyup', () => {
    Events.keydowns[event.key] = false
  })

  g.update = function() {
    g.scene.update()
  }

  g.draw = function() {
    g.scene.draw()
  }

  // TODO
  // 轮询器
  window.fps = 30
  let runLoop = () => {
    Events.trigger()
    g.update()
    g.clear()
    g.draw()

    setTimeout(() => {
      runLoop()
    }, 1000 / window.fps)
  }

  // load all images
  let promises = Object.keys(images)
    .map(key => loadImageAsync(images[key])
      .then(img => g.images[key] = img))

  Promise.all(promises).then(() => {
    g.__start()
  })

  g.imageByName = name => {
    let img = g.images[name]
    return {
      w: img.width,
      h: img.height,
      image: img
    }
  }

  // 开跑
  g.runWithScene = scene => {
    g.scene = scene
    setTimeout(() => {
      runLoop()
    }, 1000 / window.fps)
  }

  g.replaceScene = scene => {
    g.scene = scene
  }

  g.__start = () => {
    runCallback(g)
  }

  return g;
}

// 关卡
// 定义block的位置
let levels = [
  [
    [0, 0],
  ],
  [
    [50, 0],
    [100, 100, 2], // 这个砖块得打两次
  ],
  [
    [50, 30],
    [100, 100, 2],
    [200, 100, 2],
  ],
]

let loadLevel = (game, n) => {
  let level = levels[n - 1]
  let blocks = []
  for (let i = 0; i < level.length; i++) {
    let p = level[i]
    let b = Block(game, p);
    b.x = p[0]
    b.y = p[1]
    blocks.push(b)
  }
  return blocks
}

let enableDebugMode = (game, enable) => {
  if (!enable) return
  // 暂停功能和加载关卡
  window.addEventListener('keydown', e => {
    let key = e.key
    if (key === 'p') {
      window.paused = !window.paused
    } else if ('1234567'.includes(key)) {
      // 为了 debug 临时加的载入关卡功能
      blocks = loadLevel(game, Number(key))
    }
  })
  runSpeeder()
  function runSpeeder() {
    // 控制速度
    let speedValue = document.querySelector('#speedValue')
    document.querySelector('#speed').addEventListener('input', event => {
      let input = event.target
      // log(event, input.value)
      window.fps = Number(input.value)
      speedValue.value = Number(input.value)
    })
  }
}

// 执行流程
// 初始化game

let _main_ = () => {
  let images = {
    ball: 'images/ball.png',
    block: 'images/block.png',
    paddle: 'images/paddle.png',
  }

  // load Images


  let game = Game(images, g => {
    // 载入图片后要执行的东西
    // let scene = SceneStart(g)
    let scene = SceneGameStart.new(g)
    game.runWithScene(scene)
  });


  enableDebugMode(game, true)
}

class Scene {
  constructor(game) {
    this.game = game
  }
  draw() {

  }
  update() {

  }
  static new(game) {
    return new this(game)
  }
}

class SceneGameStart extends Scene {
  constructor(game) {
    super(game)
    Events.registerAction('k', () => game.replaceScene(GameScene(game)))
  }
  draw() {
    this.game.context.fillText('按 K 开始游戏', 100, 290)
  }

}

class SceneGameOver extends Scene {
  constructor(game) {
    super(game)
    Events.registerAction('r', () => game.replaceScene(new SceneGameStart(game)))
  }
  draw() {
    this.game.context.fillText('游戏结束，按R重玩', 100, 290)
  }
}

let GameScene = game => {
  // 初始化
  let paddle = Paddle(game)
  let ball = Ball(game)
  const score = new Score()
  let blocks = loadLevel(game, 1);
  let s = {
    game,
    draw() {
      // 绘制背景色，长宽
      game.context.fillStyle = '#554'
      game.context.fillRect(0, 0, 400, 300)
      // 绘制板子，球和块
      game.drawImage(paddle)
      game.drawImage(ball)
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].isAlive) {
          game.drawImage(blocks[i])
        }
      }
      game.context.strokeText('分数：' + score.initNumber, 10, 290)
    },
    update() {
      if (window.paused) return
      ball.move()
      // 判断游戏结束
      if (ball.y > paddle.y) {
        game.replaceScene(new SceneGameOver(game))
      }

      // 球和砖块相碰
      if (paddle.collide(ball)) {
        // 反弹
        ball.rebound()
      }

      // 球和板相碰
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].collide(ball)) {
          G('block 相撞')
          blocks[i].kill()
          // 反弹
          ball.rebound()
          score.up()
        }
      }
    }
  }

  Events.registerAction('a', () => {
    paddle.moveLeft()
  })
  Events.registerAction('d', () => {
    paddle.moveRight()
  })
  Events.registerAction('f', () => {
    ball.fire()
  })

  // 拖拽小球
  let enableDrag = false
  game.canvas.addEventListener('mousedown', event => {
    let x = event.offsetX
    let y = event.offsetY
    G(x, y, event)
    // 检查是否点中了 ball
    if (ball.hasPoint(x, y)) {
      // 设置拖拽状态
      enableDrag = true
    }
  })
  game.canvas.addEventListener('mousemove', event => {
    let x = event.offsetX
    let y = event.offsetY
    // log(x, y, 'move')
    if (enableDrag) {
      G(x, y, 'drag')
      ball.x = x
      ball.y = y
    }
  })
  game.canvas.addEventListener('mouseup', () => {
    enableDrag = false
  })

  return s
}

_main_()
