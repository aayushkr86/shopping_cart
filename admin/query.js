var Admins = require('../models/adminmodel')
var Orders = require('../models/ordermodel')
var ObjectId = require('mongodb').ObjectID
var bcrypt = require('bcrypt')

exports.alladmins = function (param, next, callback) {
  Admins.find(param , function (err, admins) {
    if (!admins) {
      callback(true, "no admin found")
    } else {
      callback(null, admins)
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


exports.isuser = function (param, next, callback) { //console.log(param)
  var query = { 'email': param.email }
  Admins.find(query).then( function (users) { //console.log(users)
    if(users.length == 0){
      return callback(true, "admin not found")
    }
    callback(null, users)
  }).catch(next)
}










exports.filters = function (param, next, callback) { //console.log(param)


  // var query = {$or:[{ "createdAt": { $gte: new Date(param.from) , $lt:new Date(param.to)}},{"category":req.body.category}]}

  var query = {
    $and:[
      {"createdAt": { $gte: param.from, $lt: param.to}},
      // {$text: {$search: param.category}},
      {$text: {$search: param.status}}
    ]
  }
  // 

  Orders.find( query,{ score : { $meta: "textScore" } } )
  
  .sort({ score : { $meta : 'textScore' } })
  .then( function (orders) { console.log(orders.length)
    if(orders.length == 0) {
      return callback(true, 'no order found')
    }
      callback(null, orders)
  }).catch(next)
}