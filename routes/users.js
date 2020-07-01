var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
var router = express.Router();
const cors = require('./cors');
router.use(bodyParser.json());



/* GET users listing. */
router.get('/',cors.corsWithOptions,authenticate.verifyUser, function(req, res, next) {
  User.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
  // res.send('respond with a resource');
});


router.post('/signup',cors.corsWithOptions, function(req,res,next) {
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

   

router.post('/login',cors.corsWithOptions,passport.authenticate('local'),(req,res) => {
    console.log("login is hit");

  var token = authenticate.getToken({_id: req.user._id});//create token
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true,token: token, status: 'You are successfully Login!'});
 
  
  
});


module.exports = router;
