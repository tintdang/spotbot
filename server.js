// import dependencies ***
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");
// const APIAI_TOKEN = process.env.APIAI_TOKEN;
// const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
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
 
const server = require('http').createServer(app);

// Bring over game
var io = require("./gamelogic/gamelogic").listen(server)


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



//Start the socket.io listener:
server.listen(PORT, () =>
  console.log(`Server is listening on PORT ${PORT}`)
);