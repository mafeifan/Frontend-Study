const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const app = express();

// express配置
require('./src/config')(app)

app.use(helmet())

// 设置用户表单提交动作信息的中间件，所有信息会保存在 req.body 里
app.use(bodyParser.urlencoded({ extended: false }));

// 一个流行的日志中间件
// https://www.npmjs.com/package/morgan
// 会输出类似 ::1 - GET /hello HTTP/1.1 - - 7.2 ms
app.use(logger('short'));

// 路由
require('./src/router')(app)

// 注意要放到router后面
// 渲染404页面，如果请求了未知资源
// 不用再执行next()
app.use(function(request, response) {
  response.status(404).render('404');
});

app.listen(3000, function() {
  console.log('Express app started on port 3000.');
});
