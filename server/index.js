// Get dependencies
const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

// import the routing file to handle the default (index) route
const routes = require("./routes");

const app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: false,
    })
  )
  .use(cookieParser())
  .use(logger("dev")) // Tell express to use the Morgan logger
  // Add support for CORS
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  })
  // Tell express to use the specified director as the
  // root directory for your web site
  .use(express.static(path.join(__dirname, "../dist/lyj-wedding")));

// Tell express to map the default route ('/') to the index route
// app.use("/", index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use("/api", routes);

// Tell express to map all other non-defined routes back to the index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/lyj-wedding/index.html"));
});

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
  res.sendFile(path.join(__dirname, "../dist/lyj-wedding/index.html"));
});
