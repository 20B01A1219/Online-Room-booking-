const mongoose = require('mongoose');
var url = 'mongodb+srv://sairamyasripallavi22:pallavi2002*@cluster123.dm7s018.mongodb.net/mern-bookurroom'
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
var connection = mongoose.connection
connection.on('error', ()=>{
    console.log('Mongodb Connection Failed');
})
connection.on('connected', ()=>{
    console.log("Connected Successfully");
})
module.exports = mongoose