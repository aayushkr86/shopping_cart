var mongoose = require('mongoose')
const textSearch = require('mongoose-text-search')
var Schema = mongoose.Schema
require('mongoose-type-email')


var OrdersSchema = new Schema({ 
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    cart: {
        type: Object,
        required: true
        },
    name : {
        type: String,
        min:5,
        max:20,
        required: true
        },
    shipping_address : {
        name : {
            type: String,
            max:15,
            required: true
        },
        street : {
            type: String,
            max:15,
            required: true
        },
        city : {
            type: String,
            max:15,
            required: true
        },
        state : {
            type: String,
            max:15,
            required: true
        },
        pin : {
            type: String,
            max:15,
            required: true
        },
        country : {
            type: String,
            max:15,
            required: true
        },
    },
    billing_address : {
        name : {
            type: String,
            max:15,
            required: true
        },
        street : {
            type: String,
            max:15,
            required: true
        },
        city : {
            type: String,
            max:15,
            required: true
        },
        state : {
            type: String,
            max:15,
            required: true
        },
        pin : {
            type: String,
            max:15,
            required: true
        },
        country : {
            type: String,
            max:15,
            required: true
        },
    },  
    createdAt : {
        type: Date,
        default: Date.now
        },
    status : {
        type: String,
        default: 'placed',
        enum:['placed','shipped','intransit','delivered'],    
        }
})

OrdersSchema.plugin(textSearch);
OrdersSchema.index({'$**': 'text'});
// OrdersSchema.index({"cart": 'text'})

var Orders = mongoose.model('orders', OrdersSchema)

module.exports = Orders
