const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const task = require('./routes/toDo');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/toDo', task);

app.get('/', (req, res) => {
    res.send("we are at home");
});



mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to db"))
.catch(err => console.log(`Could not Connected to db ${process.env.DB_CONNECTION} `, err));

app.listen(3000);
