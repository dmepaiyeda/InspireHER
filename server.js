//Load HTTP module
var http = require("http");
var app = require('./app');

//Create HTTP server and listen on port 8000 for requests
http.createServer(app.handleRequest).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/')
