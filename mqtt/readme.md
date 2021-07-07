1. 在MQTT通讯过程中，有三种身份，分别是发布者（publisher）、代理（broker）、和订阅者（subscriber）
2. MQTT传输的消息分为：主题（topic）和负载（payload）两部分：
   Topic，为消息的类型，是由客户端发布时指定的，当另外一个客户端订阅（subscribe）主题后，就会收到该主题的消息内容（payload）。
   payload当然就是内容了，它和主题一样都存在数据包（packet）中。
3. 当应用数据通过MQTT网络发送时，MQTT会把与之相关的服务质量（QoS）和主题名（Topic）相关连。

4. QoS在MQTT中有（摘自MQ 遥测传输 (MQTT) V3.1 协议规范）：

* qos 0 “至多一次”，由于消息发布完全依赖底层 TCP/IP 网络，会发生消息丢失或重复。这一级别可用于如下情况，环境传感器数据，丢失一次读记录无所谓，因为不久后还会有第二次发送。
* qos 1 “至少一次”，确保消息到达，但消息重复可能会发生。
* qos 2 “只有一次”，确保消息到达一次。这一级别可用于如下情况，在计费系统中，消息重复或丢失会导致不正确的结果

5.在MQTT客户端上干什么？

* 发布其他客户端会订阅的信息
* 订阅其它客户端发布的消息
* 退订或删除应用程序的消息
* 断开与服务器连接

6.MQTT服务器又干什么？
* 接受来自客户的网络连接
* 向订阅的客户转发应用程序消息

7.MQTT协议规定的方法（重要，无论在那个框架里这是通用的）
（1）Connect与服务器建立连接。
（2）Disconnect与服务器断开TCP/IP会话。
（3）Subscribe订阅。
（4）UnSubscribe取消订阅。
（5）Publish发送消息请求，发送完成后返回应用程序线程。

## 参考

https://github.com/moscajs/aedes/blob/main/docs/Examples.md