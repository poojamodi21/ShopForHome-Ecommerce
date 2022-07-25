const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products: [],
        total: {
            type: Number,
            required: true
        },
        payment: {
            type: String,
            default: 'Not paid',
            required: true
        },
        status: {
            type: String,
            default: 'pending',
            required: true

        }
    },
    {
        timestamps: true
    }

);
mongoose.model('Order', orderSchema);