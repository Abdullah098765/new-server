"use strict";

var express = require('express');

var bodyParser = require("body-parser");

var cors = require('cors');

var mongoose = require('mongoose');

var app = express(); // const http = require("http").createServer(app)

var _require = require("socket.io"),
    Server = _require.Server; // app.listen(process.env.PORT ||4001 );
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://testdb:testdb12345@testdb.nuqjg.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
//   console.log('connected')
// });


app.use(bodyParser.json({
  limit: '500055kb'
}));
app.use(cors()); // app.get('/message', function (req,res ) {
//   console.log('data')
//   res.send('message')
// })

var io = new Server();
app.set('port', process.env.PORT || 4000);
var server = app.listen(app.get('port'), function () {
  console.log('Express ' + server.address().port);
});
io.attach(server);
io.on('connection', function (socket) {
  console.log('connected');
  socket.on('send', function (a) {
    console.log(a);
    socket.emit('receive', a);
  });
});