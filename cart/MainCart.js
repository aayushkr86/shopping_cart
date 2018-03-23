var OperationalComands = require('./OperationalComands')

exports.addtocart = function (req, next, callback) {
  OperationalComands.addtocart(req, next, function (err, cart) {
    callback(err, cart)
  })
}

exports.shoppingcart = function (req, next, callback) {
  if(!req.session.cart) {
  return callback(true, "no item found in cart")
  }
  OperationalComands.shoppingcart(req, next, function (err, cart) {
    callback(err, cart)
  })
}

// exports.checkout = function (req, next, callback) {
//   if(!req.session.cart) {
//   return callback(true, "no item found in cart")
//   }
//   OperationalComands.checkout(req, next, function (err, cart) {
//     // console.log(req.session.cart)
//   // console.log(cart)
  
//   if(cart.subtotal >= 300 && req.session.cart.shipping.status == "Applied") {
//     req.session.cart['shipping'] = {
//             status : "Not applied",
//             amount : 0
//         };
//         req.session.cart.totalPrice  = cart.subtotal - 40;
//         // console.log("req.session.cart")
//   }


//   if(cart.subtotal < 300  && req.session.cart.shipping.status != "Applied") { //add shipping charge
   
//     req.session.cart['shipping'] = { 
//                                     status : "Applied",
//                                     amount : 40
//                                     };
//     req.session.cart.totalPrice  = cart.subtotal + 40;
//   }
//     callback(err, req.session.cart)
//   })
// }

exports.placeCodorder = function (req, next, callback) {
  if(!req.session.cart) {
  return callback(true, "no item found in cart")
  }
  OperationalComands.placeCodorder(req, next, function (err, order) {
    callback(err, order)
  })
}

exports.reduceone = function (req, next, callback) { //console.log(req.session.cart)
  if(!req.session.cart) {
  return callback(true, "no item found in cart")
  }
  OperationalComands.reduceone(req, next, function (err, cart) {  //console.log(cart)
    if(Object.keys(cart.totalitems).length == 0){ 
    req.session.cart = null;
    return callback(true, "no item found")
    }
    callback(err, cart)
  })
}

exports.remove = function (req, next, callback) { //console.log(req.session.cart)
  if(!req.session.cart) {
  return callback(true, "no item found in cart")
  }
  OperationalComands.remove(req, next, function (err, cart) { //console.log(cart)
    if(Object.keys(cart.totalitems).length == 0){ 
      req.session.cart = null;
      return callback(true, "no item found")
      }
      callback(err, cart)
  })
}

exports.changestatus = function (req, next, callback) {
  req.checkBody('_id', 'Invalid _id').notEmpty().isMongoId();
  req.checkBody('status', 'Invalid status').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
        messages.push(error.msg);
    })
    return callback(errors,messages)
}
  OperationalComands.changestatus(req, next, function (err, status) {
    callback(err, status)
  })
}

exports.allpendingorders = function (req, next, callback) {
  OperationalComands.allpendingorders(req, next, function (err, orders) {
    callback(err, orders)
  })
}

exports.clearCart = function (req, next, callback) {
  if(!req.session.cart) {
  return callback(true, "no item found in cart")
  }
  OperationalComands.clearCart(req, next, function (err, cart) {
    callback(err, cart)
  })
}





exports.checkout = function (req, next, callback) {
  if(!req.session.cart) {
  return callback(true, "no item found in cart")
  }
  OperationalComands.checkout(req, next, function (err, cart) { 
    callback(err, req.session.cart)
  })
}