var OperationalComands = require('./OperationalComands')

exports.categories = function (req, next, callback) {
  OperationalComands.categories(req, next, function (err, category) {
    callback(err, category)
  })
}

exports.addcategory = function (req, next, callback) {
  req.checkBody('name','Invalid name min 5 char required').notEmpty().isLength({min:5});
  req.checkBody('description','Invalid description min 5 char required').notEmpty().isLength({min:10});
  var errors = req.validationErrors();
  if(errors){
    var messages = [];
    errors.forEach(function(error){
        messages.push(error.msg);
    })
    return callback(errors,messages)
  }
  OperationalComands.addcategory(req, next, function (err, category) {
    callback(err, category)
  })
}


