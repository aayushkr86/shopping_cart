var query = require('./query')
var ObjectId = require('mongodb').ObjectID

exports.categories = function (req, next, callback) { //console.log(req.body)
  var param = {}
  query.categories(param, next, function (err, category) {
  callback(err, category)
  })
}

exports.addcategory = function (req, next, callback) { console.log(req.body)
  var param = {
    "name" : req.body.name,
    "description" : req.body.description
  }
  query.addcategory(param, next, function (err, category) {
  callback(err, category)
  })
}