浏览器WebSocket接收消息，本地跑MTQQ服务端和模拟发送消息

依次运行

服务端代理（broker），中转消息
* node server.js

发布者（publisher），发送消息
* node publish.js

也可以使用MQTTX工具连接服务端发送消息

![](https://pek3b.qingstor.com/hexo-blog/hexo-blog/20210629135147.png