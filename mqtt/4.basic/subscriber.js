const mqtt = require('mqtt')
const subscriber = mqtt.connect('mqtt://localhost:1883')

subscriber.on('connect', () => {
  console.log(`connected success`)
  // 同时接收多个 topic 数据
  subscriber.subscribe(['presence', 'msg'], err => {
    // if (!err) {
    //   client.publish('presence', 'Hello mqtt')
    // }
  })
})

subscriber.on('message', (topic, message) => {
  // message is Buffer
  console.log(`topic: ${topic}`)
  console.log(message.toString())
  // client.end()
})
