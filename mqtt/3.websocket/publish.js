let mqtt = require('mqtt')
let client = mqtt.connect('ws://localhost:8888/mqtt')

client.on('connect', () => {
  // 每隔 1s 发布主题为 presence 的消息
  setInterval(function () {
    let message = new Date().toLocaleString()
    client.publish('presence', message, {
      qos: 0,         // 至多一次 可以丢失
      retain: false   // 不保留
    })
  }, 1000)
})
