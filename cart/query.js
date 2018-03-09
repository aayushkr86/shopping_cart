
var ObjectId = require('mongodb').ObjectID
var product = require('../products/index')
var coupon = require('../coupons/index') 
var Orders = require('../models/ordermodel')


exports.isproduct = function (req, param, next, callback) {
  req.body['_id'] = param.product_id
  product.isproduct(req,next,function(err,product){ //console.log(err,product)
    if(product !='no product found' && !err){ 
      callback(false, product)
    }else{
      callback(true, "no product found")
    }
  })
}

exports.checkcoupon = function (req, param, next, callback) {
  req.body['code'] = param.code
  coupon.iscoupon(req,next,function(err,coupon){ //console.log(err,coupon)
    if(coupon !='no coupon found' && !err){ 
      callback(false, coupon)
    }else{
      callback(true, "no coupon found")
    }
  })
}

//place orders
exports.placeCodorder = function (req, param, next, callback) {
  Orders.create(param).then(function (order) { 
      req.session.cart = null;                    // reset the session after order placed
      callback(null, order)
    }).catch(next)
}