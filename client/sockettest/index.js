// Express initializes app to be a function handler that you can supply to 
//an HTTP server (as seen in line 2).
var express = require('express');
var app = express();
var http = require('http').Server(app);
// after npm install --save socket.io, a dependency is sent to json and we edit index.js
var io = require('socket.io')(http);
// the github had added this port var
var port = process.env.PORT || 8001;

// Added for username test
app.use(express.static('public'));

// ROUTE HANDLER -- We define a route handler / that gets called when we hit our website home.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Added for username test - Counter for disconnect
var count = 0;

// Connection event
io.on('connection', function(socket){
    // nicknam add
    count++;
    console.log("ip");
    console.dir(socket.request.connection.remoteAddress);
    console.dir(socket.request.socket.remoteAddress);
    console.dir(socket.request.socket._peername);
    var username = "";
    // console.log('a user connected');
    // Disconnect event - noted out for username test
    // socket.on('disconnect', function(){
    //     console.log('user disconnected');
    // });
    // username test -- Welcome the user
    if(count === 1) {
        socket.emit('welcome', 'Welcome to spotbot, you are the first to arrive here. Please add your username.');
    } else if(count === 2) {
        socket.emit('welcome', 'Welcome to spotbot, there is another user in the room. Please add your username.');
    } else {
        socket.emit('welcome', 'Welcome to spotbot, there are ' + (count - 1) + ' other users in the room. Please add your username.');
    }
    // username test -- Username
    socket.on('username', function(name){
        console.log('username: ' + name);
        username = name;
        socket.emit('username', 'Your username is set to ' + username);
    });
    // username test -- Broadcasting means sending a message to everyone else except for the starting socket.
    socket.broadcast.emit('connected', {
        number: count
    });
console.log('new user connected ' + socket.id);
socket.on('chat message', function(msg) {
    console.log(username + ' message; ' + msg);
    socket.broadcast.emit('chat message', {
        username: username,
        message: msg
    });
});

// username test -- noted out
// Print out the chat message event from index.html
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       console.log('message: ' + msg);
//     });
// });

// username test
socket.on('disconnect', function() {
    console.log('user ' + username + ' disconnected');
    count--;
    io.sockets.emit('disconnected', {
        username: username,
        number: count
    });
});

// Send an event to everyone with io.emit:
// io.emit('some event', { for: 'everyone' });

// username test -- noted out
// Send an event to everyone, including the sender:
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       io.emit('chat message', msg);
//     });
});

// If you want to send a message to everyone except for a certain socket, use 
// broadcast flag:
// io.on('connection', function(socket){
//     socket.broadcast.emit('hi');
// });

// Server listen
http.listen(8001, function(){
  console.log('listening on *:' + port);
});