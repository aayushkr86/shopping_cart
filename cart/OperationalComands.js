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
    // console.log(totalPrice)
    var param = {
      "code" : req.body.code
    } 
    query.checkcoupon(req, param, next, function (err, iscoupon) { //console.log(err,iscoupon)
      if(err) {
        coupon = {
          "code" : "Not applied",
          "discount" : 0
        } 
        return callback(true, details={totalPrice, coupon})
      }
      if(req.session.cart.coupon.code != "Coupon Applied") { //console.log('im here')
        totalPrice = totalPrice - iscoupon.discount  //minus discount
        cart.totalPrice = totalPrice
        req.session.cart.totalPrice = totalPrice  
        coupon = {
          "code" : "Coupon Applied",
          "discount" : iscoupon.discount
        }
        cart.coupon = coupon 
        req.session.cart.coupon = coupon
        // console.log(req.session.cart)
        return callback(false, details={totalPrice, coupon})
      }
      coupon = req.session.cart.coupon
    callback(false, details={totalPrice, coupon})
    })
}

exports.placeCodorder = function (req, next, callback) { //console.log(req.body)
  // var cart = new Cart(req.session.cart)
  var param = {
    'user'    : req.user,
    'cart'    : req.session.cart,
    'name'    : req.body.name,
    'billing_address' : {
      'name'    : req.body.billing_address.name,
      'street'  : req.body.billing_address.street,
      'city'    : req.body.billing_address.city,
      'state'   : req.body.billing_address.state,
      'pin'     : req.body.billing_address.pin,
      'country' : req.body.billing_address.country,
    },
    'shipping_address' : {
      'name'    : req.body.shipping_address.name,
      'street'  : req.body.shipping_address.street,
      'city'    : req.body.shipping_address.city,
      'state'   : req.body.shipping_address.state,
      'pin'     : req.body.shipping_address.pin,
      'country' : req.body.shipping_address.country,
    }, 
  }
  query.placeCodorder(req, param, next, function (err, order) {
  callback(err, order)
  })
}

exports.reduceone = function (req, next, callback) {  //console.log(req.session.cart)
  var cart = new Cart(req.session.cart)

  var product_id = req.params.product_id;
  
  cart.reduceByOne(product_id)// console.log(cart)
      
      req.session.cart = cart;

      callback(false,cart)
}

exports.remove = function (req, next, callback) {  //console.log(req.session.cart)
  var cart = new Cart(req.session.cart)

  var product_id = req.params.product_id;
  
  cart.removeItem(product_id)// console.log(cart)
      
      req.session.cart = cart;
      // req.session.cart = null;
      callback(false,cart)
}

exports.changestatus = function (req, next, callback) { //console.log(req.body)
  var param = {
    '_id'    : ObjectId(req.body._id),
    'status' : req.body.status
  }
  query.changestatus(req, param, next, function (err, status) {
  callback(err, status)
  })
}