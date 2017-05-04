var express = require('express');
var app = express();
var server = require('http').Server(app);
const path = require('path');
var io = require('socket.io')(server);
var bodyParser = require('body-parser')

let _clients = [];
let sockets = [];

app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '/react-log/build')));

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + 'build/index.html');
});

app.get('/remotelog.ts', function(req, res) {
  res.sendfile(__dirname + '/remoteLog.ts');
});

//✘❴❵✚
app.post('/log', function (req, res) {
  console.log('/LOG', [req.body.user, req.body.socket_id, req.body.title]);
  _socket && io.to(req.body.socket_id).emit('logflow', req.body);
  res.sendStatus(200);
});

io.on('connection', function (socket) {
  console.log(' ✚ ', socket.conn.id + "\n");
  sockets.push(socket);
  console.log(' ❴ ' + sockets.map(x => x.conn.id).join(',\n   ') + ' ❵\n');
  
  io.sockets.emit('count', {
    user_count: sockets.length
  });

  socket.on('disconnect', function () {
    let idx = sockets.indexOf(socket);
    sockets.splice(idx, 1);

    console.log(' ✘ ', socket.conn.id + "\n");
    console.log(' ❴ ' + sockets.map(x => x.conn.id).join(',\n   ') + ' ❵\n');
    io.sockets.emit('count', {
      user_count: sockets.length
    });
  });
});
