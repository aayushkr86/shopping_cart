var Users = require('../models/usersmodel')
var ObjectId = require('mongodb').ObjectID
var bcrypt = require('bcrypt')

exports.users = function (param, next, callback) {
  Users.find(param , function (err, users) {
    if (err) {
      callback(err, users)
    } else {
      callback(null, users)
    }
  }).catch(next)
}

exports.view = function (param, next, callback) { 
  Users.findById(param,function (err, users) {
    if (err) {
      callback(err, users )
    } else {
      callback(null, users)
    }
  })
}

exports.update = function (req,param, next, callback) { //console.log(param)
  Users.findOne({'mobileno': param.mobileno}).exec(function (err,mobileno) {
    if(mobileno == null || (mobileno.mobileno == req.user.mobileno)) {
      var query = {$or: [{ 'google.email': param.email },{ 'facebook.email': param.email },{ 'local.email':param.email }]}
      Users.findOneAndUpdate(query,{$set:param}
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
  Users.findOne(query).then( function (users) { 
      callback(null, users)
  }).catch(next)
}

exports.islocaluser = function (param, next, callback) { 
  var query = { 'local.email': param.email }
  Users.findOne(query).then( function (users) { //console.log(users)
      callback(null, users)
  }).catch(next)
}

//resetPasswordToken insertion
exports.resetPasswordToken = function (param, next, callback) { 
  var query = { 'local.email': param.email }
  Users.findOneAndUpdate(query,{$set:param}
    ,{new: true, runValidators: true}).then(function (users) { //console.log(users)
      callback(null, users)  
  }).catch(next)
}

exports.checkreset = function (param, next, callback) { 
  Users.findOne(param).then( function (token) { //console.log(token)
      callback(null, token)
  }).catch(next)
}

exports.updatepassword = function (param, next, callback) { //console.log(param)
  var query = { 'local.email':param.email }
  Users.findOneAndUpdate(query,
    {$set:{
      'local.password': param.password,
      'resetPasswordExpires': param.resetPasswordExpires,
      'resetPasswordToken' : param.resetPasswordToken,
    }}
    ,{new: true, runValidators: true}).then(function (password) { //console.log(password)
      callback(null, password)  
  }).catch(next)
}

exports.detail = function (param, next, callback) { 
  Users.findById(param).then( function (detail) { //console.log(detail)
    if(!detail){
      return callback(true, "no user found")
    }
      callback(null, detail)
  }).catch(next)
}