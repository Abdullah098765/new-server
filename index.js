const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
// const http = require("http").createServer(app)
const { Server } = require("socket.io")
// app.listen(process.env.PORT ||4001 );





const { Schema } = mongoose;

const textSchema = new Schema({
  text: String,
  timestamp: Number
});

const Model = mongoose.model('testdb', textSchema);



const url = "mongodb+srv://testdb:testdb12345@testdb.nuqjg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url)
const db = mongoose.connection

db.on('error', function(err) {
  console.error(err)
})
db.on('open', (open)=>{
console.log(open)



})









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
io.attach(server)

var list = []

io.on('connection', (socket) => {
  console.log('connected')
  socket.on('send', (a) => {
    list.push(a)
    console.log(a)

    const doc = new Model({
      text: a.text,
      timestamp: a.timestamp
    
    });
    doc.save((err, data) => {
      console.log(data);
      console.error(err)
    })



Model.watch().on('change', data => {
  console.log(data)
  socket.emit('receive', data)

});





  })

})
console.log(365635635356)