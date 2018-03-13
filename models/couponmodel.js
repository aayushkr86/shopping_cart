var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('mongoose-type-email')

var CouponsSchema = new Schema({
    code: {
        type:String,
        required: true,
        unique: true,
        min : 5,
        max : 25
    },
    quantity: {
        type: Number,
        // default: 1,
    },
    discount: {
        type: Number,
        min: 1,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "expired"],
        default: "active",
        // required: true,
    },
    expiry: {
        type: Date,
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }  
})

var Coupons = mongoose.model('coupons', CouponsSchema)

module.exports = Coupons
