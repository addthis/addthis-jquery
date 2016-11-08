var express = require('express');
var app = express();
var port = 3003;

var rootDir = __dirname;

app.get('*', function(req, res) {
  var path = rootDir + req.params[0];
  res.header("Access-Control-Allow-Origin", "*");
  res.sendFile(path);
});

var server=app.listen(port,function(){
  console.log("We have started our server on port " + port);
});
