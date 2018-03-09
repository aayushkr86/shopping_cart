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

exports.reduceone = function (req, next, callback) {
  if(!req.session.cart){
  return callback(true, "no item found in cart")
  }
  OperationalComands.reduceone(req, next, function (err, cart) {
    callback(err, cart)
  })
}

exports.remove = function (req, next, callback) {
  if(!req.session.cart){
  return callback(true, "no item found in cart")
  }
  OperationalComands.remove(req, next, function (err, cart) {
    callback(err, cart)
  })
}

