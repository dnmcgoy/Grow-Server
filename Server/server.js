var Grow = new require('./grow/grow.js');
var Tree = new require('./grow/tree.js');

var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

/*
    Classes
*/
var game = new Grow();
var playerCount = 0;
/*
  Game server logic
*/
io.sockets.on('connection', function(socket)
{
  ++playerCount;
  socket.broadcast.emit('playerCount', playerCount);
  var playerId = null;
  /*
    When user wants to plant
  */
  socket.on('plant', function(x,y)
  {
    if(x < 10 && y < 10) game.grid[x][y] = new Tree((new Date).getTime());
    //Should return an error is x or y is >= 10
    socket.emit('plantSuccessful', "My plant");
  });


  socket.on('disconnect', function()
  {
    --playerCount;
    socket.broadcast.emit('playerCount', playerCount);
  });
});

