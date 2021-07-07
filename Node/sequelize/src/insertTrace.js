/**
 * Created by WebStorm
 * Author Finley Ma <maf@shinetechsoftware.com>
 * Date: 2018/7/29
 * Time: 上午9:28
 */

const models = require('./models/index');
const Model = models.Trace;
const mqtt = require('mqtt')
const subscriber = mqtt.connect('ws://49.232.138.70:8083/mqtt')

subscriber.on('connect', () => {
  console.log(`connected success`)
  // 同时接收多个 topic 数据
  subscriber.subscribe(['bird'], err => {
    // if (!err) {
    //   client.publish('presence', 'Hello mqtt')
    // }
  })
})

subscriber.on('message', (topic, message) => {
  // message is Buffer
  console.log(`topic: ${topic}`)
  saveRadarTraceData(message)
})

function saveRadarTraceData(message) {
  // 从utf-8转成十六进制
  const data = Buffer.from(message, 'utf-8').toString('hex');
  // 从十六进制转成utf-8
  // Buffer.from(str, 'hex').toString('utf-8')
  console.log()
  // console.log(message.toString())
  // client.end()
  Model.create({
    data: data
  }).then(function (users) {
    // console.log(users);
  });
}


