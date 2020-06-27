const express = require('express')

const https = require("https"),
  fs = require("fs");

const options = {
    cert: fs.readFileSync("./server.crt"),
    key: fs.readFileSync("./server.key"),
};

const app = express()

app.use('/', express.static('public'))

https.createServer(options, app).listen(3443);
