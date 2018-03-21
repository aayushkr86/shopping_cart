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

exports.isadmin = function (param, next, callback) { //console.log(param)
  var query = { 'email': param.email }
  Admins.find(query).then( function (admin) { //console.log(admin)
    if(admin.length == 0){
      return callback(true, "admin not found")
    }
    callback(null, admin)
  }).catch(next)
}

exports.filters = function (param, next, callback) { //console.log(param)

  var query = {
    $and:[
      {"createdAt" : { $gte: param.from, $lt: param.to }},
      {$text : { $search: param.category }},
      {"status" : { $in : param.status }}
    ]
  }

  // filter only date and status
  if(param.category == undefined || !param.category.trim()) { console.log('im 1')
      query = {
      $and:[
        {"createdAt" : { $gte: param.from, $lt: param.to }},
        {"status" : { $in : param.status }}
      ]
    }
  }

  // filter only date and category
  if(param.status == undefined || param.status.length == 0 ) { console.log('im 2')
      query = {
      $and:[
        {"createdAt" : { $gte: param.from, $lt: param.to }},
        {$text : { $search: param.category }},
      ]
    }
  }

  //filter only category and status
  if((param.from == "Invalid Date" || param.from == undefined) || (param.to == "Invalid Date" || param.to == undefined) ) 
  { console.log('im 3')
      query = {
      $and:[
        {$text : { $search: param.category }},
        {"status" : { $in : param.status }}
      ]
    }
  }

  // filter only date
  if((param.category == undefined || !param.category.trim()) && (param.status == undefined || param.status.length == 0)) { 
    console.log('im 4')
      query = {  
        "createdAt" : { $gte: param.from, $lt: param.to }    
    }
  }

  // filter only category
  if(((param.from == "Invalid Date" || param.from == undefined) || (param.to == "Invalid Date" || param.to == undefined))
                                            &&
    (param.status == undefined || param.status.length == 0)) { console.log('im 5') ;
      query = {
        $text : { $search: param.category } 
    }
  }

  // filter only status
  if(((param.from == "Invalid Date" || param.from == undefined) || (param.to == "Invalid Date" || param.to == undefined))
                                            &&
    (param.category == undefined || !param.category.trim())) { console.log('im 6')
      query = {  
        "status" : { $in : param.status }    
    }
  }

  Orders.find( query, { score : { $meta: "textScore" }})
  .sort({ score : { $meta : 'textScore' } })
    .then( function (orders) { console.log("total results",orders.length)
      if(orders.length == 0) {
        return callback(true, 'no order found')
      }
        callback(null, { "total results" : orders.length,orders })
    }).catch(next)
}