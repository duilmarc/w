const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// import the routing file to handle the default (index) route
const routes = require("./routes");

const app = express(); // create an instance of express

// Configure CORS to allow requests from specific origins
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Tell express to use the following parsers for POST data
app
  .use(cors(corsOptions)) // Add support for CORS
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: false,
    })
  )
  .use(cookieParser())
  .use(logger("dev")) // Tell express to use the Morgan logger
  // Tell express to use the specified director as the
  // root directory for your web site
  .use(express.static(path.join(__dirname, "../dist/lucero-franco-wedding")));

// Tell express to map the default route ('/') to the index route
// app.use("/", index);
app.use("/api", routes);

// Tell express to map all other non-defined routes back to the index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/lucero-franco-wedding/index.html"));
});

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

// Define the port address and tell express to use this port
const PORT = process.env.PORT || "3000";
app.set("port", PORT);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(PORT, function () {
  console.log("API running on http://localhost:" + PORT);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/lucero-franco-wedding/index.html"));
});