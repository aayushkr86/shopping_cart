var query = require('./query')
var ObjectId = require('mongodb').ObjectID

//pic upload
exports.picupload = function (req, next, callback) { //console.log(req.body)
  var param = {
    '_id' : req.body._id,
    'photos' :req.file.path
  }
  query.picupload(param, next, function (err, photos) {
  callback(err, photos)
  })
}

exports.addproducts = function (req, next, callback) { //console.log(req.body)
  var param = {
    'product_id' : req.body.product_id,
    'title' : req.body.title,
    'description' : req.body.description,
    'photos' : req.body.photos,
    'price' : req.body.price,
    'category' : req.body.category,
    'sku' : req.body.sku
  }
  query.addproducts(param, next, function (err, products) {
  callback(err, products)
  })
}

exports.allproducts = function (req, next, callback) {
  var param = {}
  query.allproducts(param, next, function (err, products) {
  callback(err, products)
  })
}

exports.isproduct = function (req, next, callback) { //console.log(req.body)
  var param = {
    "_id" : ObjectId(req.body._id)
  }
  query.isproduct(param, next, function (err, products) {
  callback(err, products)
  })
}