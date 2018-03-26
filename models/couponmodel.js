var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CouponsSchema = new Schema({
    code: {
        type:String,
        required: true,
        unique: true,
        min : 5,
        max : 25
    },
    min: {
        type: Number,
    },
    max: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    discount: { 
            amount: {
                type: Number,
                required: true
            },
            ispercentage: {
                type: Boolean,
                required: true
            },
            upto: {
                type: Number,
                required: true
            },
    },
    products: {
            type: [Schema.Types.ObjectId],
            ref: 'products'
          
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'categories' 
    },
    user : {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    not_user : {
        type: [Schema.Types.ObjectId],
        ref: 'User'
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
