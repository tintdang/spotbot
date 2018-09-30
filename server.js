// import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");

// defining the Express app and port
const app = express();
const PORT = process.env.PORT || 3001;


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


//Start the server
app.listen(PORT, () => 
  console.log(`API server is now listening on PORT ${PORT}`)
);
