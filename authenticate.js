var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/User');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.verifyToken = (req,res,next)=>{
    // req.headers['x-access-token'] || req.headers['authorization']
      if(req.cookies['token']){
          let token = req.cookies.token;
          if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
          }
        
          if (token) {
            jwt.verify(token, config.secretKey, (err, decoded) => {
              if (err) {
                res.clearCookie('token');
                res.redirect('/login.html');
  
                
              } 
              else {
                req.decoded = decoded;
                next();
              }
            });
          } else {
  
            res.redirect('/login.html');
  
          }
  
      }
      else{
  
          res.redirect('/login.html');             
      }
      
  
  };

exports.verifyUser = ((req,res,next) => {
    console.log("req.user", req.user);
    User.findOne({_id: req.user._id})
    .then((user) => {
        if(user) {
            next();
        }
        else {
            err = new Error('You are not authorized to perform this operation!');
            err.statusCode = 403;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));

});

