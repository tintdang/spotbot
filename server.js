// import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");

// defining the Express app and port
const app = express();
const PORT = process.env.PORT || 3001;


// Set up connections for socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Use bodyParser to parse application/json content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Serve basic assets if on production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Add the routes from the routes folder
app.use(routes)

// log HTTP requests
app.use(morgan("combined"));


// Setting up more socket.io stuff:



io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
      console.log(data);
      io.emit('RECEIVE_MESSAGE', data);
    })
});


// username test
            // socket.on('disconnect', function() {
            // console.log('user ' + username + ' disconnected');
            // count--;
            // io.sockets.emit('disconnected', {
            //     username: username,
            //     number: count
            // });
            // });


//Start the socket.io listener:
server.listen(PORT, () =>
  console.log(`Socket.io is listening on PORT ${PORT}`) 
);

//Start the server
// app.listen(PORT, () => 
//   console.log(`API server is now listening on PORT ${PORT}`)
// );



