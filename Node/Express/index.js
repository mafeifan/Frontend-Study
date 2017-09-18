var express = require("express");
var logger = require("morgan");
var app = express();

// 一个流行的日志中间件
// https://www.npmjs.com/package/morgan
// 会输出类似 ::1 - GET /hello HTTP/1.1 - - 7.2 ms
app.use(logger("short")); 
// 简单的中间件
app.use(function(request, response, next) {
  console.log(request.ip)
  console.log("In comes a " + request.method + " to " + request.url);
  next();
});

app.use(function(request, response) { 
  response.send("Hello world33!");           
});                                  

app.listen(3000, function() {                       
  console.log("Express app started on port 3000."); 
});                                                