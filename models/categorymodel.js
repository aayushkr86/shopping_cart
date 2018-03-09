
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var CategorySchema = new Schema({
 
    name : {
        type:String,
        required: true,
        unique: true,
        min : 5,
        max : 25
    },
    description : {
        type: String,
        required: true,
        max : 200
    },
    products : {
        type: [ObjectId],
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }  
})

var Category = mongoose.model('categories', CategorySchema)

module.exports = Category
