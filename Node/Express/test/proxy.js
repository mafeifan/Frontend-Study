var express = require('express');
// https://github.com/chimurai/http-proxy-middleware
var proxy = require('http-proxy-middleware');

var app = express();


// 访问 http://localhost:8080/api/topics 等于访问 http://zhihu.finley.com/api/topics

app.use('/api', proxy({target: 'http://zhihu.finley.com', changeOrigin: true}));
app.listen(8080);
