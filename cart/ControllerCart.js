var express = require('express')
var router = express.Router()
var MainCart = require('./MainCart')
var passloginvalidator = require('../passport/pass_loginvalidator')

module.exports = router

// response handler
function response (res,statuscode,err,data) {
  if (statuscode === 200) {
    var data = data;
  }else if(statuscode === 400){
    if(data == [] || data.length == 0){
      data = "Bad request";
    }
  }else{
    data = "something went wrong";
  }
  res.status(statuscode).json({ "message": data });
}

//add product to cart
router.get('/add-to-cart/:product_id',function(req,res,next){
  MainCart.addtocart(req, next, function (err, data) {
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if (err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})

//get total price and products id present in cart
router.get('/shopping-cart',function(req, res, next) {
  MainCart.shoppingcart(req, next, function (err, data) {
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if (err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})

//check total price after coupon(if any)
router.post('/checkout', passloginvalidator.isLoggedIn, function(req, res, next) {
  MainCart.checkout(req, next, function (err, data) {
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if (err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})

//place order cod
router.post('/place-order-cod', passloginvalidator.isLoggedIn, function(req, res, next) {
  MainCart.placeCodorder(req, next, function (err, data) {
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if (err) {
      response(res, 400, err, [])
    }
    else {
      response(res, 200, null, data)
    }
  })
})
