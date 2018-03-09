var query = require('./query')
var ObjectId = require('mongodb').ObjectID
var Cart = require('../models/cartmodel')


exports.addtocart = function (req, next, callback) { //console.log(req.params)
  var product_id = req.params.product_id;
  var param = {
    "product_id" : product_id
  } 
  var cart = new Cart(req.session.cart ? req.session.cart : {} )
  
  query.isproduct(req, param, next, function (err, product) { //console.log(err,product)
      if(err){
       return callback(true,product)
      }

    cart.add(product,product_id)
    req.session.cart = cart;
      
  callback(false,req.session.cart)
  }) 
}

exports.shoppingcart = function (req, next, callback) {   
  var cart = new Cart(req.session.cart)
      //console.log(cart)

      var cartdetails = {
        products : cart.generateArray(),
        totalPrice : cart.totalPrice
      }
  callback(false,cartdetails)
}

exports.checkout = function (req, next, callback) {   //console.log(req.body.code)
    var cart = new Cart(req.session.cart)
    totalPrice = cart.totalPrice
    //console.log(totalPrice)
    var param = {
      "code" : req.body.code
    } 
    query.checkcoupon(req, param, next, function (err, coupon) { //console.log(err,coupon)
      if(err){
        coupon_code = "Invalid Coupon"
        return callback(true, details={totalPrice, coupon_code})
      }

    totalPrice = totalPrice - coupon.discount
    coupon_code = "Coupon Applied"
    callback(false, details={totalPrice, coupon_code})
    })
}

exports.placeCodorder = function (req, next, callback) { //console.log(req.body)
  var cart = new Cart(req.session.cart)
  var param = {
    'user'    : req.user,
    'cart'    : cart,
    'address' : req.body.address,
    'name'    : req.body.name
  }
  query.placeCodorder(req, param, next, function (err, order) {
  callback(err, order)
  })
}