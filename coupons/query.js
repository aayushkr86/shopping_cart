var Coupons = require('../models/couponmodel')
var ObjectId = require('mongodb').ObjectID

//is coupon
exports.iscoupon = function (param, next, callback) {
  Coupons.findOne(param).then(function (coupon) { //console.log(coupon)
    if(coupon == null){
      return  callback(true ,"no coupon found")
    }
      callback(false, coupon)
    }).catch(next)
}