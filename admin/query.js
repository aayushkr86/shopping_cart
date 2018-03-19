var Admins = require('../models/adminmodel')
var ObjectId = require('mongodb').ObjectID
var bcrypt = require('bcrypt')

exports.users = function (param, next, callback) {
  Admins.find(param , function (err, users) {
    if (err) {
      callback(err, users)
    } else {
      callback(null, users)
    }
  }).catch(next)
}

exports.view = function (param, next, callback) { 
  Admins.findById(param,function (err, users) { //console.log(err,users)
    if (err) {
      callback(err, users )
    } else if(!users){
      callback(true, "Not loggedin!!!!" )
    }else {
      callback(null, users)
    }
  })
}

exports.update = function (req,param, next, callback) { //console.log(param)
  Admins.findOne({'mobileno': param.mobileno}).exec(function (err,mobileno) {
    if(mobileno == null || (mobileno.mobileno == req.user.mobileno)) {
      var query = { 'email':param.email }
      Admins.findOneAndUpdate(query,{$set:param}
        ,{new: true, runValidators: true}).then(function (users) { //console.log(users)
          callback(null, users)
      }).catch(next)

    }else{
      callback(true, "mobileno. already taken")
    }
})                              
}

exports.isuser = function (param, next, callback) { 
  var query = {$or: [{ 'google.email': param.email },{ 'facebook.email': param.email },{ 'local.email': param.email }]}
  Admins.findOne(query).then( function (users) { 
      callback(null, users)
  }).catch(next)
}
