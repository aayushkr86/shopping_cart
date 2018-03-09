var OperationalComands = require('./OperationalComands')

exports.addtocart = function (req, next, callback) {
  OperationalComands.addtocart(req, next, function (err, cart) {
    callback(err, cart)
  })
}

exports.shoppingcart = function (req, next, callback) {
  if(!req.session.cart){
  return callback(true, "no item found in cart")
  }
  OperationalComands.shoppingcart(req, next, function (err, cart) {
    callback(err, cart)
  })
}

exports.checkout = function (req, next, callback) {
  if(!req.session.cart){
  return callback(true, "no item found in cart")
  }
  OperationalComands.checkout(req, next, function (err, cart) {
    callback(err, cart)
  })
}

exports.placeCodorder = function (req, next, callback) {
  if(!req.session.cart){
  return callback(true, "no item found in cart")
  }
  OperationalComands.placeCodorder(req, next, function (err, order) {
    callback(err, order)
  })
}