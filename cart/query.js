
var ObjectId = require('mongodb').ObjectID
var product = require('../products/index')
var coupon = require('../coupons/index') 
var Orders = require('../models/ordermodel')
var notification = require('../notification/index')
var user = require('../users/index')


exports.isproduct = function (req, param, next, callback) {
  req.body['_id'] = param.product_id
  product.isproduct(req,next,function(err,product){ //console.log(err,product)
    if(product == undefined || product =='no product found') { 
      callback(true, "no product found")
    }else{
      callback(false, product)
    }
  })
}

exports.checkcoupon = function (req, param, next, callback) {
  req.body['code'] = param.code;
  req.body['cart'] = req.session.cart
  coupon.iscoupon(req, next, function(err,coupon) { //console.log(err,coupon)
    if(coupon !='no coupon found' || !err) { 
      callback(false, coupon)
    }else{
      callback(true, "no coupon found")
    }
  })
}

var Coupons = require('../models/couponmodel')
//place orders
exports.placeCodorder = function (req, param, next, callback) { //console.log(req.user)
  Orders.create(param).then(function (order) { 
    req.body['order'] = order;
    req.body['email'] = req.user.email || req.user.local.email || req.user.google.email
    notification.codorderPlaced(req, next, function(err, notification) { //email notification

      Coupons.findOneAndUpdate({"code" : param.cart.coupon.code},{ $inc:{ quantity: -1 }},     // decrement quantity in coupon
        {new: true, runValidators: true}).then(function (quantity) { //console.log(quantity)
        req.session.cart = null; // reset the session after order placed
        callback(null, order)
        }).catch(next)  
    })   
  }).catch(next)
}

//change order status
exports.changestatus = function (req, param, next, callback) {
  var query = {'_id':param._id}
  Orders.findByIdAndUpdate(query,{$set:{'status':param.status}},
  {new: true, runValidators: true}).then(function (status) { //console.log(status)
    if(!status) {
      return callback(true,"no order found");
    }
    req.body['_id'] = status.user;
    user.userdetail(req, next, function(err, detail){ //console.log(detail)
      if(!err || (detail == "no user found")) {
        return callback(true,"no user found");
      }
      req.body['order'] = status;
      req.body['email'] = detail.email;
      notification.changeOrderStatus(req, next, function(err, notification) { //email notification
            callback(null, status)
      })
    })  
  }).catch(next)
}

exports.allpendingorders = function (req, param, next, callback) {
  var query = {"status":{$ne:"delivered"}}
  Orders.find(query).sort({"createdAt" : -1}).then(function(orders) { //console.log(orders.length)
    if(!orders){
      return callback(true, "no orders found")
    }
      callback(false, orders)
  }).catch(next)
}