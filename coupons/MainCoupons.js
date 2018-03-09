var OperationalComands = require('./OperationalComands')

exports.iscoupon = function (req, next, callback) {
  OperationalComands.iscoupon(req, next, function (err, coupon) {
    callback(err, coupon)
  })
}


