const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        ],
        address: {
            type: String,
            required: true
        },
        payment: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }

);
mongoose.model('Order', orderSchema);