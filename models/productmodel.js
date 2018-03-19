var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('mongoose-type-email')

var ProductsSchema = new Schema({
 
    // _id: mongoose.Schema.Types.ObjectId,
    product_id: {
        type:Number,
        required: true,
        unique: true,
        // matches: /^[0-9]{10,}$/,
        validate: {
            validator: function (v) {
              return /^[0-9]{6}$/.test(v)   // must be 6 in length
            },
            message: '{VALUE} is not a valid product_id!'
          }
    },
    title: {
        type: String,
        max: 25,
        required: true
    },
    description: {
        type: String,
        max: 200,
        required: true
    },
    photos: {
        type: String,
        max: 100,
        default: null
    },  
    category: {
        type: String,
        required: true
    },
    sku: {
        type:Number,
        required: true,
        unique: true,
        // matches: /^[0-9]{10,}$/,
        validate: {
            validator: function (v) {
              return /^[0-9]{6}$/.test(v)   // must be 6 in length
            },
            message: '{VALUE} is not a valid sku!'
          }
    },
    price: {
        type: Number,
        max: 25,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
})

var Products = mongoose.model('products', ProductsSchema)

module.exports = Products
