const mongoose = require('mongoose')
const Product = mongoose.model("Product")
const Order = mongoose.model("Order")
const User = mongoose.model("Users")

const createOrder = async (req, res) => {
    const { products, total } = req.body
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ error: "User not found" })
    products.forEach(product => {

        Product.findOneAndUpdate(
            {
                urlQuery: product.productId.urlQuery,
            },
            {
                $inc: {
                    countInStock: -product.quantity,
                },
            },
            { new: true },
            (err, doc) => {
                if (err) console.log(err)
            }

        )
    })
    const order = new Order({
        user: user._id,
        products: products,
        total: total,
        payment: 'Not paid',
        status: 'pending'
    })
    await order.save()
    res.json({ message: "Order created successfully" })
}

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.json(orders)
    }
    catch (error) {
        console.log(error)
    }
}



module.exports = {
    createOrder,
    allOrders
}