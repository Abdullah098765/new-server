const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
// const http = require("http").createServer(app)
const { Server } = require("socket.io")
// app.listen(process.env.PORT ||4001 );

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
app.use(cors());

var md = ''
app.post('/message', function (req, res) {

  console.log(req.body)
  md = req.body
  res.send('SF Post ')


})


app.get('/message', function (req, res) {

  console.log('data')
  res.send(md)

})



const io = new Server();



app.set('port', process.env.PORT || 4000);
const server = app.listen(app.get('port'), () => { console.log('Express ' + server.address().port) })
// io.attach(server)

// io.on('connection',(socket)=>{
//   console.log('connected')
//   socket.on('send', (a)=>{
// console.log(a)
// socket.emit('receive', a)
//   })

// })