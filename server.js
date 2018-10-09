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

app.use(express.static("public"));

// Database stuff ***
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
let userNames = ["im_real", "user07", "User", "Bot", "Human", "NotBot", "!robot", "Chat_AI", "trickyBOT"];
// bot chat allow
let botToggle = true;

//This will pick a random name from the array and slice it out of the array.
generateUserName = (socketID) => {
  let name;
  name = userNames[Math.floor(Math.random() * userNames.length)];
  while (currentUserNames.includes(name)) {
    name = userNames[Math.floor(Math.random() * userNames.length)];
  }
  currentUserNames.push(name);
  return name;
}

// generates a bot name
generateBotName = () => {
  let name;
  name = userNames[Math.floor(Math.random() * userNames.length)];
  while (currentUserNames.includes(name)) {
    name = userNames[Math.floor(Math.random() * userNames.length)];
  }
  currentUserNames.push(name);
  return name;
}
// sets bot name
let botName = generateBotName();

// Setting up more socket.io stuff:
io.on('connection', (socket) => {

  // Assign player their name and send it over to socket
  if (currentUserNames.length < 4) {
    username = generateUserName(socket.id);
    io.emit('USER_NAME', {
      author: username
    });
  }

  //When that specific socket disconnects, what should we do?
  socket.on('disconnect', () => {
    //Search our allowedUsers array and remove anyone from it that disconnects
    for (let i = 0; i < allowedUsers.length; i++) {
      if (socket.id === allowedUsers[i]) {
        allowedUsers.splice(i, 1);
        currentUserNames.splice(i, 1);
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

  //This allows only the first 3 users to be able to type
  if (allowedUsers.length < 4) {
    socket.on('SEND_MESSAGE', function (data) {
      io.emit('RECEIVE_MESSAGE', data);
    });
  }


  if (allowedUsers.length === 3 && gameRunning === false) {
    // When there are the full amount of players we need in the game connected and joined.
    // ````````````````````````````timer stuff``````````````````
    let interval;

    //Send everybody the userlist for the game
    io.emit("SEND_USER", {
      userNames: currentUserNames
    });

    count = () => {
      let timer = 4;
      // sends bot name to user
      io.emit('BOT_NAME', {
        botname: botName
      });
      interval = setInterval(() => {
        timer--;
        io.emit("GAME_MESSAGE", {
          author: "SpotBot",
          message: timer
        });
        if (timer === 1) {
          return stop();
        }
      }, 1000);
    }

    stop = () => {
      io.emit("GAME_MESSAGE", {
        author: "SpotBot",
        message: "***GAME HAS BEGUN***"
      });
      io.emit("START_GAME", {
        chatActive: true,
        gameRunning: true
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
      message: "A third person has joined the session. Prepare yourself!"
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
    gameTime = 45;
    const gameInterval = setInterval(function () {
      gameTime--;
      io.emit('GAME_LOGIC', {
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
      message: "***GAME HAS ENDED***"
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
    let voteTimer = 10;
    io.emit("GAME_MESSAGE", {
      author: "SpotBot",
      message: `TIME TO VOTE. You have ${voteTimer} seconds.`
    });
    // send over voting timer
    const voteInterval = setInterval(function () {
      voteTimer--;
      io.emit('GAME_LOGIC', {
        timer: voteTimer
      });
      if (voteTimer === 0) { // this is when game stops
        //Run the end game function
        //clear the current usernames
        currentUserNames = [];
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
  }

  // BOT CHAT LOGIC ------
  socket.on('BOT_MESSAGE', (text) => {
    let resDelay = botDelay(text.message.length);
    if (botToggle) {
      setTimeout(() => {
        botChannel(text);
      }, resDelay);
    } else {
      botToggle = true;
    }
    botTimeout();
  });

  // bot receive/send function
  botChannel = (text) => {
    let apiaiReq = apiai.textRequest(text.message, {
      sessionId: APIAI_SESSION_ID
    });
    // Get a reply from API.ai
    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
      socket.emit('BOT_REPLY', aiText);
    });
    apiaiReq.on('error', (error) => {
      console.log(error);
    });
    apiaiReq.end();
    botToggle = false;
  }

  // END bot chat stuff -----

});


//Start the socket.io listener:
server.listen(PORT, () =>
  console.log(`Socket.io is listening on PORT ${PORT}`)
);

// bot-time functions *************************
botTimeout = () => {
  setTimeout(() => {
    botToggle = true;
  }, 4000);
}
// calculates the bot delay time
botDelay = (length) => {
  let timeout;
  if (length < 10) {
    timeout = length * 500;
  } else {
    timeout = length * 300;
  }
  console.log("milliseconds for timeout: ", timeout);
  return timeout;
}
// **********************************