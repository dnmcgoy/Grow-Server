var Grow = new require('./grow/grow.js');
var Tree = new require('./grow/tree.js');
var io = require('socket.io').listen(9000);
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
  console.log("Hello");
  var playerId = null;
  /*
    When user wants to plant
  */
  socket.emit('plant', function(x,y)
  {
    if(x < 10 && y < 10) game.grid[x][y] = new Tree((new Date).getTime());
    //Should return an error is x or y is >= 10
  });
  socket.on('disconnect', function()
  {
    --playerCount;
    socket.broadcast.emit('playerCount', playerCount);
  });
});

