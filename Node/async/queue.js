const async = require("async");
const fs = require("fs");

// create a queue object with concurrency 2
let q = async.queue((task, callback) => {
  console.log('hello ' + task.name);
  callback();
}, 1);

// assign a callback
q.drain = function() {
  console.log('all items have been processed');
};

// add some items to the queue
q.push({name: 'foo'}, function(err) {
  console.log('finished processing foo');
});
q.push({name: 'bar'}, function (err) {
  console.log('finished processing bar');
});

// 同时加入多个任务到队列
q.push([{name: 'baz'}, {name: 'bay'}, {name: 'bax'}], function(err) {
  console.log('finished processing item');
});

// 加入到队列最前面
q.unshift({name: 'first'}, function (err) {
  console.log('finished processing bar');
});
