var query = require('./query')
var ObjectId = require('mongodb').ObjectID
var notification = require('../notification/index')
var async = require('async')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var passport = require('passport')


exports.getalladmins = function (req, next, callback) {
  var param = {}
  query.alladmins(param, next, function (err, users) {
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


exports.isuser =function (req,next,callback) { //console.log(req.body)
  var param = {
        "email":req.body.email
  }
  query.isuser(param,next, function (err, users) {
    callback(err, users)
  })
}


exports.logintoken =function (req,next,callback) { //console.log(req.body)
  passport.authenticate('admin-login', function(err, user, info) { //console.log(user)
    if (err) 
    return callback(err, "no token")
    if (!user) {
        return callback(true, 'Login incorrect' );
    }
      req.logIn(user, function(err) { //console.log(err)
          if (err) {
            return callback(err, "error123")
          }   
          // var secretOrKey = jwtOptions.secretOrKey;
          var secretOrKey = "secret"
          var token = jwt.sign(user.toJSON(), secretOrKey, {
              expiresIn: 10800 // 3 hrs in seconds
          });
          // res.send({ user: user, jwtToken: "JWT " + token });
          callback(false, { user: user, jwtToken: token })
      });
  })(req, next)
}


exports.filters =function (req,next,callback) { //console.log(req.query)
  var param = {
        "from"     : new Date (req.body.from),
        "to"       : new Date (req.body.to),
        "category" : req.body.category,
        "status"   : req.body.status   
  }
  query.filters(param,next, function (err, orders) {
    callback(err, orders)
  })
}