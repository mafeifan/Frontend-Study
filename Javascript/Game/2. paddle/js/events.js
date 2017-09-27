export let Events = {
  actions: {}, // 回调方法
  keydowns: {}, // {a: true, b: true}
  registerAction(name, callback) {
    this.actions[name] = callback
  },
  trigger() {
    let actions = Object.keys(this.actions)
    for (let i = 0; i < actions.length; i++) {
      let key = actions[i]
      if (this.keydowns[key]) {
        // 如果按键被按下, 调用注册的 action
        this.actions[key]()
      }
    }
  }
}
