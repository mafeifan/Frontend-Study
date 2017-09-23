// 练习
// 用nodes核心模块开启一个server
// express对核心的进行了封装

var http = require("http");

function requestHandler(request, response) {
  console.log("In comes a request to: " + request.url);
  response.end("Hello, world22!");
}

var server = http.createServer(requestHandler);
server.listen(3000);
