const aedes = require('aedes')()
const httpServer = require('http').createServer()
const ws = require('websocket-stream')
const express = require('express')
const app = express()

const httpPort = 8080
const wsPort = 8888

// 启动本地HTTP服务器，用于打开静态页面 http://localhost:8008
app.use(express.static(__dirname + '/public'))
app.listen(httpPort, () => {
  console.log(`Example app listening at http://localhost:${httpPort}`)
})


// 启动一个websocket服务端
// ws://localhost:8888/mqtt
ws.createServer({ server: httpServer }, aedes.handle)

httpServer.listen(wsPort, function () {
  console.log(`WebSocket server listening at ws://localhost:${wsPort}/mqtt`)
})
