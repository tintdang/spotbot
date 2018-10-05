// import dependencies ***
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
const mongoose = require("mongoose");

// defining the Express app and port
const app = express();
const PORT = process.env.PORT || 3001;

// Database stuff ***
//const db = require("./models");
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/SpotBot";
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// Set up connections for socket.io ***
// const http = require('http').Server(app); 
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// io.on('connection', socket => {
//   console.log('a user connected');
//   // console.log("array of users below if working");
//   // console.log(io.sockets.sockets);
//   // console.log("array of users above if working");
//   console.log("length of sockets/how many users 888");
//   console.log(io.engine.clientsCount);
//   console.log("length of sockets/how many users 888");

//   io.clients((error, clients) => {
//     if (error) throw error;
//     console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
// });
//   socket.on('disconnect', () => {
//     console.log('a user disconnected...')
//   });
// });




// testing for providing user names


// var userNames = {};

// var getDefaultName = function(){
//   var cnt = 0;
//   for (user in names) {
//     cnt+=1;
//   }
//   return 'User' + String(cnt);
// // };
// io.sockets.on('connection', function(socket) {
//   name = getDefaultName();
//   userNames[name] = socket.id;
//   data = {name: name};
//   socket.emit('initName', data);
// });



// Declaration for Dialogflow bot
const apiai = require('apiai')(APIAI_TOKEN);


// Use bodyParser to parse application/json content
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Serve basic assets if on production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Add the routes from the routes folder ***
app.use(routes)

// log HTTP requests
app.use(morgan("combined"));


/// SOCKET.IO SERVER PIECES:

let allowedUsers = [];

// Setting up more socket.io stuff:
io.on('connection', (socket) => {

  //Did we connect? If so, on which socket?
  console.log(socket.id);

  //When that specific socket disconnects, what should we do?
  socket.on('disconnect', () => {
    //Search our allowedUsers array and remove anyone from it that disconnects
    for (let i = 0; i < allowedUsers.length; i++) {
      if (socket.id === allowedUsers[i]) {
        allowedUsers.splice(i, 1);
        console.log("Array state after user removed:", allowedUsers);
      }
    }
  });

  //When a user connects, if there is room for them, we mark it in our array.
  allowedUsers.push(socket.id)
  console.log("List of players by socket.id:", allowedUsers);

  if (allowedUsers.length < 4) {
    socket.on('SEND_MESSAGE', function (data) {
      console.log(data);
      io.emit('RECEIVE_MESSAGE', data);
    });
  } else {
    console.log("THIS IS THE LOGIC FLAG PLACE FOR TOO MANY PEOPLE");
  }


  if (allowedUsers.length === 3){
    //When there are the full amount of players we need in the game connected and joined.


    // ````````````````````````````timer stuff``````````````````
    let interval;
    let timer = 6

    count = () => {
      interval = setInterval(() => {
        timer--
        io.emit("RECEIVE_MESSAGE", { author: "SpotBot", message: timer})
        if(timer === 1){
          // io.emit("RECEIVE_MESSAGE",  { author: "SpotBot", message: "SPOTBOT!!!!"})
          // io.emit("StartGame", )
          return stop()
        }
      }, 1000)
    }

    stop = () => {
      io.emit("RECEIVE_MESSAGE", { author: "SpotBot", message: "SPOTBOT!!!!"})
      gameTimer();
      //Reset the timer and interval
      clearInterval(interval)
      timer = 6;
    }


    // ````````````````````````````````````````

    

    console.log("Game is ready")
    io.emit("RECEIVE_MESSAGE", { author: "SpotBot", message: "A Third person has joined the session."})
    //Wait 2 seconds before running the next message
    setTimeout(() => {
      io.emit("RECEIVE_MESSAGE", { author: "SpotBot", message: "The game will start in..."})
      //Wait 2 seconds then run the count function
      setTimeout(()=>{
        count()
      })
    }, 3000)
    
  }
  else if (allowedUsers.length < 3){
    //If there are less than 3 players, have spotbot send a message out
    console.log("Game is not ready")
    socket.broadcast.to(allowedUsers[0]).emit("RECEIVE_MESSAGE", { author: "SpotBot", message: "Please wait until 3 players are present and then the game will begin"})
  }

    // START GAME FUNCTIONs
    gameTimer = () => {
    gameTime = 15;
    setInterval(function() {
      gameTime--;
      io.emit('game_logic', { timer: gameTime })
    }, 1000);

  }
    // END GAME FUNCTIONS
  

  //COPY PASTE BOT LOGIC
  socket.on('chat message', (text) => {
    //console.log('Message: ' + text.message); 
    // Get a reply from API.ai
    let apiaiReq = apiai.textRequest(text.message, {
      sessionId: APIAI_SESSION_ID
    });
    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      //console.log('Bot reply: ' + aiText);
      socket.emit('bot reply', aiText);
    });
    apiaiReq.on('error', (error) => {
      console.log(error);
    });
    apiaiReq.end();
  });
  //END PASTE

  // START GAME FUNCTIONs
  socket.on('game logic', (info) => {

  });
  // END GAME FUNCTIONS

});


//Start the socket.io listener:
server.listen(PORT, () =>
  console.log(`Socket.io is listening on PORT ${PORT}`)
);



