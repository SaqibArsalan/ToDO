const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const task = require('./routes/toDo');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/toDo', task);

app.get('/', (req, res) => {
    res.send("we are at home");
});



mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology: true, useNewUrlParser: true}, () => 
console.log("connected to db1")
);


app.listen(3000);
