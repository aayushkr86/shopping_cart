var mongoose = require('mongoose')
var Schema = mongoose.Schema
require('mongoose-type-email')

var OrdersSchema = new Schema({
 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        },
    cart: {
        type: Object,
        required: true
        },
    address: {
        type: String,
        min:20,
        max:100,
        required: true
        },      
    name: {
        type: String,
        min:5,
        max:20,
        required: true
        },  
    createdAt : {
        type: Date,
        default: Date.now
    },
})

var Orders = mongoose.model('orders', OrdersSchema)

module.exports = Orders
