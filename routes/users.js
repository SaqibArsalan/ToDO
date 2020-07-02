var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/User');
var passport = require('passport');
var authenticate = require('../authenticate');
var router = express.Router();
const cors = require('./cors');
var jwt = require('jsonwebtoken');
var config = require('../config');
router.use(bodyParser.json());



/* GET users listing. */
router.get('/',authenticate.verifyToken, function(req, res, next) {
  User.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
  // res.send('respond with a resource');
});


router.post('/signup', function(req,res,next) {
    console.log("sign up is hit");
  User.register(new User({username: req.body.username}),
   req.body.password, (err,user) => {
     if(err) {
       res.statusCode = 500;
       res.setHeader('Content-Type', 'application/json');
       res.json({err: err});

     }
     else {
       if(req.body.username) {
         user.username = req.body.username;
       }
       if(req.body.password) {
         user.password = req.body.password;
       }
       user.save((err,user) => {
         if(err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
         }
        passport.authenticate('local')(req,res,() => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration successful!'});
      
       });
       

       });
     }
    });
  });

   
//user login
router.post('/login',(req,res) => {

  var userObj = {
    "username" : req.body.username,
    "password" : req.body.password
  }

  var token = jwt.sign(userObj, config.secretKey, {expiresIn: '1h'});//create token
  var now = new Date();
  now.setTime(now.getTime() + 1 * 3600 * 1000);
  res.cookie('token', token);
  console.log("token is ", token);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token: token, status: 'You are successfully Login!'});
 
  
  
});

//user logout
router.get('/logout',authenticate.verifyToken ,(req,res) => {
  console.log("logout is hit");
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.status(200).json({
      status: true
    });
  }
  else {
    var err = new Error('You are not logged in!');
    res.status(403).json({
      status: false,
      data: err
    });

  }

});


module.exports = router;
