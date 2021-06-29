const mqtt = require('mqtt')

// 使用官方提供的连接地址
const client = mqtt.connect('mqtt://test.mosquitto.org')

// 连接成功后定订阅topic
client.on('connect', () => {
  // 订阅topic
  client.subscribe('presence', err => {
    if (!err) {
      // 订阅成功后发送一个测试消息
      client.publish('presence', 'Hello mqtt')
    }
  })
})

// 接收消息, 可以自己给自己发，也可以用 MQTTX 模拟客户端发消息，注意填写正确的topic才能接收成功
client.on('message', (topic, message) => {
  // message is Buffer
  console.log(`topic: ${topic}`)
  console.log(message.toString())
  // client.end()
})
