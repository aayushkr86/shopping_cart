var query = require('./query')
var ObjectId = require('mongodb').ObjectID

exports.iscoupon = function (req, next, callback) { //console.log(req.body)
  var param = {
     "code" : req.body.code
  }
  query.iscoupon(param, next, function (err, coupon) {
  callback(err, coupon)
  })
}

exports.addcoupon = function (req, next, callback) { //console.log(req.body)
  var param = {
      "code"     : req.body.code,
      "min"      : req.body.min,
      "max"      : req.body.max,
      "quantity" : req.body.quantity,
      "discount" : {
                "flat"         : req.body.discount.flat,
                "ispercentage" : req.body.discount.ispercentage,
                "upto"         : req.body.discount.upto,
                },
      "products"   : req.body.products,
      "categories" : req.body.categories,
      "user"       : req.body.user,
      "not_user"   : req.body.user,
      "status"     : req.body.status,
      "expiry"     : new Date(req.body.expiry),
  }
  query.addcoupon(param, next, function (err, coupon) {
  callback(err, coupon)
  })
}