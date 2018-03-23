var OperationalComands = require('./OperationalComands')

exports.getalladmins = function (req, next, callback) {
    OperationalComands.getalladmins(req, next, function (err, admins) {
      callback(err, admins)
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
  if(errors) {
      var messages = [];
      errors.forEach(function(error){
          messages.push(error.msg);
      })
      return callback(errors,messages)
  } 
  if(req.user.email != req.body.email) {
    return callback(true, "same user should be logged in !!!")
  }
  OperationalComands.updateuser(req, next, function (err, admin) {
    callback(err, admin)
  })
}

exports.isadmin = function (req, next, callback) {
  OperationalComands.isadmin(req, next, function (err, admin) {
    callback(err, admin)
  })
}

exports.logintoken = function (req, next, callback) {
  OperationalComands.logintoken(req, next, function (err, token) {
    callback(err, token)
  })
}

exports.filters = function (req, next, callback) {
  req.checkBody('from','Invalid Date-from').matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);
  req.checkBody('to', 'Invalid Date-to').matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/);
  // req.checkBody('category','Invalid category')
  req.checkBody('status', 'Invalid status').isArray();
  var errors = req.validationErrors();
  if(errors) {
      var messages = [];
      errors.forEach(function(error) {
          messages.push(error.msg);
      })
      return callback(errors,messages)
  } 
  OperationalComands.filters(req, next, function (err, orders) {
    callback(err, orders)
  })
}
