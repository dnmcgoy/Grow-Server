var Grow = new require('./grow/grow.js');
var Tree = new require('./grow/tree.js');

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var port = process.env.PORT || 9000;

server.listen(80);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/public'));

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
  socket.on('plant', function(data)
  {
    var x = data.x;
    var y = data.y;
    //if(x < 10 && y < 10) game.grid[x][y] = new Tree((new Date).getTime());

    console.log("My x value: " + x);
    console.log("My y value: " + y);
    //Should return an error is x or y is >= 10
    socket.emit('plantSuccessful', "My plant");
  });


  socket.on('disconnect', function()
  {
    --playerCount;
    socket.broadcast.emit('playerCount', playerCount);
  });
});

