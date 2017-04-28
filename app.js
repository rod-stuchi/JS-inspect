var express = require('express');
var app = express();
var server = require('http').Server(app);
const path = require('path');
var io = require('socket.io')(server);
var bodyParser = require('body-parser')

let _socket = undefined;
let _clients = [];

app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '/react-log/build')));

server.listen(8080);

app.get('/', function (req, res) {
  // res.sendfile(__dirname + '/index.html');
  res.sendfile(__dirname + '/react-log/build/index.html');
});

app.get('/remotelog.ts', function(req, res) {
  res.sendfile(__dirname + '/remoteLog.ts');
});

app.get('/log', function (req, res) {
  _socket && _socket.emit('logflow', { datetime: new Date() });
  res.sendStatus(200);
});

app.post('/log', function (req, res) {
  console.log(req.body.socket_id, req.body.title);
  _socket && io.to(req.body.socket_id).emit('logflow', req.body);
  res.sendStatus(200);
});

io.on('connection', function (socket) {
  _socket = socket;
  _socket.emit('logflow', { init: 'logflow connected' });

  io.clients(function(error, clients){
    _clients = clients;
    // console.log(_clients);
  });
});
