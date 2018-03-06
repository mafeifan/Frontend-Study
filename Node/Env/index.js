var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send(process.env.NODE_ENV);
});

console.log('send')

app.listen(3000);
