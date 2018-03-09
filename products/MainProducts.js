var OperationalComands = require('./OperationalComands')

exports.picupload = function (req, next, callback) { //console.log(req.file);
  req.checkBody('_id','_id is required').notEmpty();
  var errors = req.validationErrors();
  if(errors){
      var messages = [];
      errors.forEach(function(error){ 
          messages.push(error.msg);
      })
      return callback(true,messages)
  } 
  OperationalComands.picupload(req, next, function (err, photos) {
    callback(err, photos)
  })
}

exports.addproducts = function (req, next, callback) {
  OperationalComands.addproducts(req, next, function (err, products) {
    callback(err, products)
  })
}

exports.allproducts = function (req, next, callback) {
  OperationalComands.allproducts(req, next, function (err, products) {
    callback(err, products)
  })
}

exports.isproduct = function (req, next, callback) {
  OperationalComands.isproduct(req, next, function (err, products) {
    callback(err, products)
  })
}


