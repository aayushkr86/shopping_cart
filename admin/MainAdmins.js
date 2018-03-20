var OperationalComands = require('./OperationalComands')

exports.getallusers = function (req, next, callback) {
    OperationalComands.getallusers(req, next, function (err, users) {
      callback(err, users)
    })
}

exports.updateuser = function (req, next, callback) { 
  req.checkBody('firstname', 'Invalid firstname').notEmpty().isAlpha();
  req.checkBody('email','Invalid email').notEmpty().isEmail();
  req.checkBody('mobileno','Invalid mobileno').notEmpty().matches(/^[0-9]{10}$/);
  req.checkBody('state', 'Invalid state').notEmpty().isAlpha();
  req.checkBody('city', 'Invalid city').notEmpty().isAlpha();
  req.checkBody('pin', 'Invalid pin').notEmpty().isNumeric();
  var errors = req.validationErrors();
  if(errors){
      var messages = [];
      errors.forEach(function(error){
          messages.push(error.msg);
      })
      return callback(errors,messages)
  } 
  if((req.user.email ) != req.body.email) {
    return callback(true, "same user should be logged in !!!")
  }
  OperationalComands.updateuser(req, next, function (err, users) {
    callback(err, users)
  })
}

exports.isuser = function (req, next, callback) {
  OperationalComands.isuser(req, next, function (err, users) {
    callback(err, users)
  })
}

exports.logintoken = function (req, next, callback) {
  OperationalComands.logintoken(req, next, function (err, token) {
    callback(err, token)
  })
}

exports.filters = function (req, next, callback) {
  OperationalComands.filters(req, next, function (err, orders) {
    callback(err, orders)
  })
}