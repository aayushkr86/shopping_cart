var Products = require('../models/productmodel')
var Category = require('../models/categorymodel')
var Users   = require('../users/index')
var notification = require('../notification/index')
var ObjectId = require('mongodb').ObjectID

exports.picupload = function (param, next, callback) {
  {$or: [{ '_id':param._id},{'product_id':param.product_id}]}
  var query = {'_id':param._id}
  Products.findByIdAndUpdate(query,{$set:{'photos':param.photos}},
  {new: true, runValidators: true}).then(function (photos) { //console.log(photos)
    callback(null, photos)
  }).catch(next)
}

//add products
exports.addproducts = function (param, next, callback) {
  var query = {"name" : param.category}
  Category.findOne(query).then(function (category) { //console.log(category)
    if ( category == null){
      return callback(true,"no category found")
    }  
    Products.create(param).then(function (products) { 
      Category.findOneAndUpdate(query,{ $inc:{ count:1 }},     // increment count in category
          {new: true, runValidators: true}).then(function (category) { //console.log(category)
          }).catch(next)
      callback(null, products)
    }).catch(next)
  })
}

//all products
exports.allproducts = function (param, next, callback) {
  Products.find(param).then(function (products) { 
    callback(null, products)
  }).catch(next)
}

//is products
exports.isproduct = function (param, next, callback) {
  Products.findById(param).then(function (product) { 
    if(product == null){
      return  callback(true ,"no product found")
    }
      callback(false, product)
    }).catch(next)
}