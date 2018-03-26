var express = require('express')
var router = express.Router()
var MainCart = require('./MainCart')
var passloginvalidator = require('../passport/pass_loginvalidator')

module.exports = router

// response handler
function response (res, statuscode, err, data) {
  if (statuscode === 200) {
    var data = data;
  }else if(statuscode === 400){
    if(data == [] || data.length == 0) {
      data = "Bad request";
    }
  }else{
    data = "something went wrong";
  }
  res.status(statuscode).json({ "message": data });
}

//add product to cart
router.get('/add-to-cart/:product_id',function(req, res, next) {
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

//shipping check
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

//reduce one product from cart
router.get('/reduce/:product_id',function(req, res, next) {
  MainCart.reduceone(req, next, function (err, data) {
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

//remove all particular product from cart
router.get('/remove/:product_id',function(req, res, next) { 
  MainCart.remove(req, next, function (err, data) {
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

//change order status //admin
router.post('/change-order-status', //passloginvalidator.isLoggedIn, admin should be loggedin
function(req, res, next) {
  MainCart.changestatus(req, next, function (err, data) { //console.log(err,data)
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

//all orders except delivered //admin
router.get('/all-pending-orders', //passloginvalidator.isLoggedIn, admin should be loggedin
function(req, res, next) {
  MainCart.allpendingorders(req, next, function (err, data) { //console.log(err,data)
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


//Clean cart
router.get('/clear-cart',function(req, res, next) { 
  MainCart.clearCart(req, next, function (err, data) {
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


//apply coupon
router.post('/apply-coupon',function(req, res, next) { 
  MainCart.applyCoupon(req, next, function (err, data) {
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