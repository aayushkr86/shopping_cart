var Category = require('../models/categorymodel')
var ObjectId = require('mongodb').ObjectID

//is coupon
exports.categories = function (param, next, callback) {
  Category.find(param).then(function (category) { //console.log(category)
    if(category.length == 0){
      return  callback(true ,"no category found")
    }
      callback(false, category)
    }).catch(next)
}