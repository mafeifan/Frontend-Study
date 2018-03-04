const http = require('http');
//cluster核心模块, 用于解决多核CPU的利用率问题，同时也提供了较完善的API。用于处理进程的健壮性。
const cluster = require('cluster');
const numCPUs = require('os').cpus().length; //设定启动进程数为cpu个数

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);
  //启动子进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
    var express = require('express');
    var app = express();
    var fibo = function fibo (n) { //定义斐波那契数组算法
       return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
    }
    app.get('/', function(req, res){
      var n = fibo(~~req.query.n || 1); //接收参数
      res.send(n.toString());
    });
    app.listen(8124);
    console.log(`listen on 8124 -- 工作进程 ${process.pid} 已启动`);
}

/*
压力测试 -n 总执行次数 -c 并发数
ab -c 100 -n 100 http://localhost:8124/?n=35

参考：
https://www.cnblogs.com/chris-oil/p/5339305.html
http://blog.csdn.net/iamdingping123/article/details/46504803

建议使用pm2的cluster模式
http://pm2.keymetrics.io/docs/advanced/pm2-module-system/
https://keymetrics.io/2015/03/26/pm2-clustering-made-easy/
 */
