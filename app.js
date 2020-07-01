const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const task = require('./routes/toDo');
const bodyParser = require('body-parser');
require('dotenv').config();
var passport = require('passport');
const app = express();
const userRoute = require('./routes/users');
var logger = require('morgan');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(passport.initialize());


app.use('/toDo', task);

app.get('/', (req, res) => {
    res.send("we are at home");
});

app.use(logger('dev'));

app.use(express.static('static_files'));

app.use('/users', userRoute);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to db"))
.catch(err => console.log(`Could not Connected to db ${process.env.DB_CONNECTION} `, err));

app.listen(3000);
