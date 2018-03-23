var Coupons = require('../models/couponmodel')
var ObjectId = require('mongodb').ObjectID

// is coupon
exports.iscoupon = function (param, next, callback) {
  Coupons.findOne(param).then(function (coupon) { //console.log(coupon)
    if(coupon == null || coupon.length == 0 ){
      return  callback(true ,"no coupon found")
    }
      callback(false, coupon)
    }).catch(next)
}

// add coupon
exports.addcoupon = function (param, next, callback) {
  Coupons.create(param).then(function (coupons) { 
    callback(null, coupons)
  }).catch(next)
}
