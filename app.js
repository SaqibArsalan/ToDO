const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const task = require('./routes/toDo');
const bodyParser = require('body-parser');
require('dotenv').config();
var passport = require('passport');
var authenticate = require('./authenticate');
const app = express();
const userRoute = require('./routes/users');
var logger = require('morgan');
const cookieParser = require('cookie-parser');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(cookieParser());


app.use(logger('dev'));

app.use(express.static('static_files'));

app.use('/users', userRoute);
app.use('/toDo', task);
app.use('/', (req, res) => {
    res.redirect('./signUp.html');
})

app.get('/logout',authenticate.verifyToken,(req,res)=>{
    console.log("logout hit");

    res.clearCookie('token');
    res.status(200).json({
        status: true
    });
});

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to db"))
.catch(err => console.log(`Could not Connected to db ${process.env.DB_CONNECTION} `, err));

var port = process.env.PORT || 3000;

app.listen(port);
