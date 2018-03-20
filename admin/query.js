var Admins = require('../models/adminmodel')
var Orders = require('../models/ordermodel')
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

exports.filters = function (param, next, callback) { 


  // var query = {$or:[{ "createdAt": { $gte: new Date(param.from) , $lt:new Date(param.to)}},{"category":req.body.category}]}

  var query ={
    $and:[
      {"createdAt": { $gte: param.from, $lt: param.to}},
      
    ]
  }

   
  

  Orders.find( {$text: {$search: param.category}},{ score : { $meta: "textScore" } })
  .then( function (orders) { console.log(orders.length)
    if(orders.length == 0) {
      return callback(true, 'no order found')
    }
      callback(null, orders)
  }).catch(next)
}