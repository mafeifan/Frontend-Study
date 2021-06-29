const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', () => {
  // 订阅topic
  client.subscribe('presence', err => {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

// 接收消息, 可以用 MQTTX 客户端发消息模拟
client.on('message', (topic, message) => {
  // message is Buffer
  console.log(`topic: ${topic}`)
  console.log(message.toString())
  // client.end()
})
