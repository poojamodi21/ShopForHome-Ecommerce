const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        urlQuery: {
            type: String,
            
            
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        countInStock: {
            type: Number,
            required: true
        },

    },
);
mongoose.model('Product', productSchema);