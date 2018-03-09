var query = require('./query')
var ObjectId = require('mongodb').ObjectID

exports.categories = function (req, next, callback) { //console.log(req.body)
  var param = {}
  query.categories(param, next, function (err, category) {
  callback(err, category)
  })
}