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

db.on('error', function (err) {
  console.error(err)
})
db.on('open', (open) => {
  console.log(open)



})


app.use(bodyParser.json({
  limit: '500055kb'
}));
app.use(cors());








var md = []


app.post('/room', function (req, res) {

  md.push(req.body)
  res.send('SF Post ')


})


app.get('/room', function (req, res) {

  res.send(md)

})




app.post('/roomdata', function (req, res) {
  const found = md.find(element => element.id === req.body.id)
  res.send(found)
})


var id_For_delet = ''

console.log('Abdullah');
app.post('/deleteroom', function (req, res) {
 id_For_delet =req.body.id

})


app.get('/deleteroom', function (req, res) {

  res.send('id_For_delet')


})



const io = new Server();



app.set('port', process.env.PORT && 'https://check-app-d.herokuapp.com');
const server = app.listen(app.get('port'), () => { console.log(server.address().port) })
io.attach(server)

var list = []

io.on('connection', (socket) => {
  console.log('connected')
  socket.on('send', (a) => {
  socket.emit('receive', a)    
console.log(a);
    

  })

})








// const doc = new Model({
//   text: a.text,
//   timestamp: a.timestamp

// });
// doc.save((err, data) => {
//   console.log(data);
//   console.error(err)
// })



// Model.watch().on('change', (data) => {

//   if (!list.includes(data.fullDocument.text)) {
//     list.unshift(data.fullDocument)
//   }
//   else { console.log('same') }

//   console.log(list)
//   socket.emit('receive', list)

// });



