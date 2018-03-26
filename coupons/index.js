var ControllerCoupons = require('./ControllerCoupons')
var request = require('request')

module.exports = function (req, res, next) {
  ControllerCoupons(req, res, next)
}

module.exports.iscoupon = function (req, next, callback) {  
  request({
    url: `http://${req.headers.host}/coupons/is-coupon`,
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
  }, function(err, coupon){ 
    //  console.log(coupon.body)
    callback(err, coupon.body.message)
  });
}