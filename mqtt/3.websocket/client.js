const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', () => {
  console.log(`connected success`)
  // 同时接收多个 topic 数据
  client.subscribe(['presence', 'msg'], err => {
    // if (!err) {
    //   client.publish('presence', 'Hello mqtt')
    // }
  })
})

client.on('message', (topic, message) => {
  // message is Buffer
  console.log(`topic: ${topic}`)
  console.log(message.toString())
  // client.end()
})
