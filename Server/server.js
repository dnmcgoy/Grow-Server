var Grow = new require('./grow/grow.js');
var Tree = new require('./grow/tree.js');

var util = require('util');

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var port = process.env.PORT || 9000;

server.listen(80);

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/public'));

/*
    Classes
*/
var playerCount = 0;

var trees = new Array();

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


app.get('/gamedata', function(req, res) {
    // treeData = new Array();
    // for (tree in trees) {
    // 	newTree = new Tree(tree.birthdate, tree.x, tree.y);
    // 	newTree.age = (new Date).getTime() - tree.birthdate;
	//treeData.push(newTree);
    //}
    res.json(trees);
});

app.get('/plantSeed', function(req, res){
    var x = req.query.x;
    var y = req.query.y;
    var z = req.query.z
    console.log(util.inspect(req.query, false, null));
    console.log("planting seed at x: " + x + " y: " + y + " z: " + z);

    trees.push(new Tree((new Date).getTime(), x, y, z));

    res.json(trees);
    console.log(util.inspect(trees, false, null));
});

app.get('/killTree', function(req, res){

    console.log("Before death");
    console.log(util.inspect(trees, false, null));
    var birthdate = req.query.birthdate;
    var length = trees.length,
	element = null;
    for (var i = 0; i < length; i++) {
	if (trees[i].birthdate == birthdate) {
	    index = i;
	}
    }
    
    var index = trees.indexOf(i);
    trees.splice(index, 1);
    console.log("After death");
    console.log(util.inspect(trees, false, null));
    res.json(trees);
});

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
    socket.broadcast.emit('treeCreated', {"x": x, "y" : y}); 
  });


  socket.on('disconnect', function()
  {
    --playerCount;
    socket.broadcast.emit('playerCount', playerCount);
  });
});

