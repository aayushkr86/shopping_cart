var Coupons = require('../models/couponmodel')
var ObjectId = require('mongodb').ObjectID

// is coupon
exports.iscoupon = function (req, param, next, callback) { //console.log(param.cart)
  var query = {'code' : param.code}
  Coupons.findOne(query).then(function (coupon) { //console.log(coupon)
   
    if(coupon == null || coupon.length == 0 ){
      return  callback(true ,"no coupon found")
    }
    else if(coupon.min > param.cart.subtotal || coupon.quantity < 1 ||coupon.status !='active') {
    return  callback(true ,"no coupon found")
    }
    else if(coupon.expiry < Date.now()) {
      return  callback(true ,"no coupon found")
    }

    var flag = 0;
    Object.keys(param.cart.totalitems).forEach(function(key) {
    // console.log(coupon.products.indexOf(key));
    if(coupon.products.indexOf(key) != -1) {                     //check if product is present in coupon products array
      flag = 1;
    }
    });
    if(flag ==1 ) { 
      return  callback(false , coupon)
    }else {
      callback(true ,"no coupon found")
    }
      
    }).catch(next)
}





// add coupon
exports.addcoupon = function (param, next, callback) {
  Coupons.create(param).then(function (coupons) { 
    callback(null, coupons)
  }).catch(next)
}
