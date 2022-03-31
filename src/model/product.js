const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    expiryDate: {
        type: Date,
        required: true
    }

}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product