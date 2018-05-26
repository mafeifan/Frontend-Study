const async = require("async");
const fs = require("fs");

// 按顺序读取文件
// 如果改为 async.each 就不能保证顺序了
let tasks = ['a.txt', 'b.txt',];

async.each(tasks, (item, callback) => {
  fs.readFile(item, (err, data) => {
    if(err){
      console.log(err);
    }
    console.log(`读取:${item} 完成,内容是:${data}`);
    callback();
  });
}, err => {
  // console.log("err: " + err);
});
