var query = require('./query')
var ObjectId = require('mongodb').ObjectID
var notification = require('../notification/index')
var async = require('async')
var bcrypt = require('bcrypt')


exports.getallusers = function (req, next, callback) {
  var param = {}
  query.users(param, next, function (err, users) {
    callback(err, users)
  })
}

exports.profileview = function (req, next, callback) { 
  // console.log(req.admin)
  // console.log(req.user)
  // console.log(req.session.passport)
  var param = req.user
  //req.session.userId
  query.view(param, next, function (err, users) {
    callback(err, users)
  })
}

exports.updateuser = function (req, next, callback) {  //console.log(req.body)
  var param = {
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'email': req.body.email,
    'mobileno': req.body.mobileno,
    'state': req.body.state,
    'city': req.body.city,
    'pin': req.body.pin,
    'gender': req.body.gender,
    'permissions':{
              'category':  req.body.permissions.category, 
              'products':  req.body.permissions.products, 
      }

  }
  query.update(req, param, next, function (err, users) {
    callback(err, users)
  })
}


exports.isuser =function (req,next,callback) { 
  var param = {
        "email":req.body.email
  }
  query.isuser(param,next, function (err, users) {
    callback(err, users)
  })
}

var jwt = require('jsonwebtoken');
// var passport_admin = require('./passport/passport_admin').passport
var passport = require('passport')
exports.logintoken =function (req,next,callback) { //console.log(req.body)
  passport.authenticate('admin-login', function(err, user, info) { //console.log(user)
    if (err) 
    return callback(err, "no token")
    if (!user) {
        return callback(true, 'Login incorrect' );
    }
    req.logIn(user, function(err) { console.log(err)
        if (err) {
          return callback(err, "error123")
        }   
        // var secretOrKey = jwtOptions.secretOrKey;
        var secretOrKey = "secret"
        var token = jwt.sign(user.toJSON(), secretOrKey, {
            expiresIn: 631139040 // 20 years in seconds
        });
        // res.send({ user: user, jwtToken: "JWT " + token });
        callback(false, { user: user, jwtToken: token })
    });
  })(req, next)
}