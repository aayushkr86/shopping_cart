var Coupons = require('../models/couponmodel')
var ObjectId = require('mongodb').ObjectID
var Category = require('../models/categorymodel')

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
    Object.values(param.cart.totalitems).forEach(function(key) { //console.log(key)
    // console.log(coupon.products.indexOf(key));
    if(coupon.products.indexOf(key.item._id) != -1) {                     //check if product is present in coupon products array
      flag = 1;
    }
    });
    // var temp = 0;
    // function abc(){

    //   Object.values(param.cart.totalitems).forEach(function(key) { //console.log(key)
      
    //   Category.findOne({"name" : key.item.category }).then(function(category){ console.log(category)
    //   //  console.log(coupon.categories.indexOf(category._id));
    //     if(coupon.categories.indexOf(category._id) != -1) {                     //check if product is present in coupon products array
    //       // console.log('fuck youu')    
    //        temp = 1;
    //       console.log("1",temp) 
      
    //   }
    //   console.log("2",temp)
    //   })
    //   console.log("3",temp)
      
    //   });
    // }
    // abc()
    
    //   console.log("4",temp)


    if(flag == 1 ) { 
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
