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