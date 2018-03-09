var OperationalComands = require('./OperationalComands')

exports.getallusers = function (req, next, callback) {
    OperationalComands.getallusers(req, next, function (err, users) {
      callback(err, users)
    })
}

exports.profileview = function (req, next, callback) {
  OperationalComands.profileview(req, next, function (err, users) {
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
  if((req.user.local.email || req.user.google.email || req.user.facebook.email) != req.body.email) {
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

exports.forgot = function (req, next, callback) {
  OperationalComands.forgot(req, next, function (err, users) {
    callback(err, users)
  })  
}

exports.checkreset = function (req, next, callback) {
  OperationalComands.checkreset(req, next, function (err, token) {
    callback(err, token)
  })  
}

exports.resetpassword = function (req, next, callback) {
  OperationalComands.resetpassword(req, next, function (err, token) {
    callback(err, token)
  })  
}