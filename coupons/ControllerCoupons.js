var express = require('express')
var router = express.Router()
var MainCoupons = require('./MainCoupons')

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

router.post('/is-coupon', function (req, res, next) {  
  MainCoupons.iscoupon(req, next, function (err, data) { //console.log(err,data)
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

router.post('/add-coupon', function (req, res, next) {  
  MainCoupons.addcoupon(req, next, function (err, data) { //console.log(err,data)
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

