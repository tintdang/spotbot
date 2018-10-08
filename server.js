// import dependencies ***
require('dotenv').config()
//const axios = require('axios');
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

app.use(express.static("public"));

// Database stuff ***
//const db = require("./models");
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/SpotBot";
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});


// Set up connections for socket.io ***
// const http = require('http').Server(app); 
const server = require('http').createServer(app);
const io = require('socket.io')(server);


// Declaration for Dialogflow bot
const apiai = require('apiai')(APIAI_TOKEN);

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Use bodyParser to parse application/json content
app.use(bodyParser.urlencoded({
  extended: true
}));
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
// array of socket IDs
let allowedUsers = [];
// array of currently used User Names
let currentUserNames = [];
// checks if game has started
let gameRunning = false;
// Names array
let userNames = ["im_real", "user", "User", "bot", "Bot", "human", "Human", "NotBot", "!robot", "chat_ai", "Chat_AI", "trickyBOT"];

//This will pick a random name from the array and slice it out of the array.
generateUserName = (socketID) => {
  let name;
  name = userNames[Math.floor(Math.random() * userNames.length)];
  console.log("We picked " + name + " = " + socketID)
  while (currentUserNames.includes(name)) {
    console.log("found duplicate name");
    name = userNames[Math.floor(Math.random() * userNames.length)];
    console.log("We now picked " + name + " = " + socketID);
  }
  currentUserNames.push(name);
  return name;
}

// generates a bot name
generateBotName = () => {
  let name;
  name = userNames[Math.floor(Math.random() * userNames.length)];
  console.log("BOT picked " + name)
  while (currentUserNames.includes(name)) {
    console.log("found duplicate name");
    name = userNames[Math.floor(Math.random() * userNames.length)];
    console.log("BOT now picked " + name);
  }
  currentUserNames.push(name);
  return name;
}
// sets bot name
let botName = generateBotName();

// Setting up more socket.io stuff:
io.on('connection', (socket) => {
  // sends bot name to user
  io.emit('BOT_NAME', {
    botname: botName
  });

  // Assign player their name and send it over to socket
  username = generateUserName(socket.id);
  io.emit('USER_NAME', {
    author: username
  });


  //When that specific socket disconnects, what should we do?
  socket.on('disconnect', () => {
    //Search our allowedUsers array and remove anyone from it that disconnects
    for (let i = 0; i < allowedUsers.length; i++) {
      if (socket.id === allowedUsers[i]) {
        allowedUsers.splice(i, 1);
        console.log("username removed: " + currentUserNames[i])
        currentUserNames.splice(i, 1);
        console.log("usernames remaining: ", currentUserNames)
        console.log("Array state after user removed: ", allowedUsers);
      }
    }

    // This checks when everybody leaves the game and will reset the bot name
    if (allowedUsers.length === 0) {
      botName = generateBotName();
    }
  });


  //When a user connects, if there is room for them, we mark it in our array.
  allowedUsers.push(socket.id);
  console.log("List of players by socket.id:", allowedUsers);

  if (allowedUsers.length < 4) {
    socket.on('SEND_MESSAGE', function (data) {
      console.log(data);
      io.emit('RECEIVE_MESSAGE', data);
      /* store to database
      axios.post('/api/history', 
        data
      ).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log("Encountered error in database posting");
      });
      */
    });
  } else {
    console.log("THIS IS THE LOGIC FLAG PLACE FOR TOO MANY PEOPLE");
    //make code to kick users to 
  }


  if (allowedUsers.length === 3 && gameRunning === false) {
    // When there are the full amount of players we need in the game connected and joined.
    // ````````````````````````````timer stuff``````````````````
    let interval;
    let timer = 6;

    //Send everybody the userlist for the game
    io.emit("SEND_USER", {
      userNames: currentUserNames
    });

    count = () => {
      interval = setInterval(() => {
        timer--;
        io.emit("GAME_MESSAGE", {
          author: "SpotBot",
          message: timer
        });
        if (timer === 1) {
          // io.emit("RECEIVE_MESSAGE",  { author: "SpotBot", message: "SPOTBOT!!!!"})
          // io.emit("StartGame", )
          return stop();
        }
      }, 1000);
    }

    stop = () => {
      io.emit("GAME_MESSAGE", {
        author: "SpotBot",
        message: "SPOTBOT!!!!"
      });
      io.emit("START_GAME", {
        chatActive: true
      });
      gameTimer();
      //Reset the timer and interval
      clearInterval(interval);
      timer = 6;
      // set game running
      gameRunning = true;
    }


    // ````````````````````````````````````````


    console.log("Game is ready")
    io.emit("GAME_MESSAGE", {
      author: "SpotBot",
      message: "A Third person has joined the session."
    })
    //Wait 2 seconds before running the next message
    setTimeout(() => {
      io.emit("GAME_MESSAGE", {
        author: "SpotBot",
        message: "The game will start in..."
      });
      //Wait 2 seconds then run the count function
      setTimeout(() => {
        count();
      })
    }, 2000);
  } else if (allowedUsers.length < 3) {
    //If there are less than 3 players, have spotbot send a message out
    console.log("Game is not ready");
    socket.broadcast.to(allowedUsers[0]).emit("GAME_MESSAGE", {
      author: "SpotBot",
      message: "Please wait until 3 players are present and then the game will begin"
    });
  }

  // START GAME FUNCTIONs
  gameTimer = () => {
    gameTime = 15;
    const gameInterval = setInterval(function () {
      gameTime--;
      io.emit('game_logic', {
        timer: gameTime
      });
      if (gameTime === 0) { // this is when game stops
        //Run the end game function
        endGame(gameInterval);
      }
    }, 1000);

  }
  // END GAME LOGIC
  endGame = (gameInterval) => {
    clearInterval(gameInterval);
    // post-game logic
    // Spotbot will tell the game is over
    io.emit("GAME_MESSAGE", {
      author: "SpotBot",
      message: "GAME IS OVER!"
    });
    // This disables chat functionality to the users
 
    io.emit('END_GAME', {
      // send something
      message: '',
      chatActive: false,
      allowVoting: true,
    });
    // runs endResults after 3 seconds
    setTimeout(endResults, 3000);
  }

  // starts voting timer
  endResults = () => {
    let voteTimer = 15;
    io.emit("GAME_MESSAGE", {
      author: "SpotBot",
      message: "TIME TO VOTE. You have 15 seconds."
    });
    // send over voting timer
    const voteInterval = setInterval(function () {
      voteTimer--;
      io.emit('game_logic', {
        timer: voteTimer
      });
      if (voteTimer === 0) { // this is when game stops
        //Run the end game function
        //clear the current usernames
        currentUserNames = []
        console.log(currentUserNames)
        endVoting(voteInterval);
      }
    }, 1000);
  }

  // finalizes game and resets
  endVoting = (voteInterval) => {
    clearInterval(voteInterval);
    io.emit("GAME_MESSAGE", {
      author: "SpotBot",
      message: "TIME IS UP"
    });
    io.emit('FINAL', "finally");
    // clear the bot out of the current userNames and generate a new bot
    gameRunning = false;
    console.log(currentUserNames)
  }

  // calculates the bot delay time
  botDelay = (length) => {
    let timeout;
    if (length < 10) {
      timeout = length * 100;
    } else {
      timeout = length * 50;
    }
    console.log("milliseconds for timeout: ", timeout);
    return timeout;
  }

  // BOT CHAT LOGIC ------
  socket.on('CHAT_MESSAGE', (text) => {

    let apiaiReq = apiai.textRequest(text.message, {
      sessionId: APIAI_SESSION_ID
    });
    // Get a reply from API.ai
    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      //console.log('Bot reply: ' + aiText);
      socket.emit('BOT_REPLY', aiText);
    });
    apiaiReq.on('error', (error) => {
      console.log(error);
    });
    apiaiReq.end();
  });
  // END bot chat stuff -----

});


//Start the socket.io listener:
server.listen(PORT, () =>
  console.log(`Socket.io is listening on PORT ${PORT}`)
);