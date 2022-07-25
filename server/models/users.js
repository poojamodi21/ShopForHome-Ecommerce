const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
            type:String,
            required:true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },
    cart:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            
        },
        quantity:{
            type:Number,
        }
    }],
    wishlist:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
        },
        
    }],
    discount:{
        type:Number,
        default:0
    }

})

mongoose.model("Users",userSchema)