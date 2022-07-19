const mongoose = require('mongoose')
const Product = mongoose.model("Product")


const addProduct = (req, res) => {
    const { name, price, description, image,category,urlQuery,countInStock } = req.body

    if(!req.user.isAdmin) return res.status(401).json({error:"You must be admin"})
    
    const product = new Product({
        name,
        price,
        description,
        image,
        countInStock,
        category,
        urlQuery
    })
    product.save()
        .then(product => {
            res.json({ message: "saved successfully" })
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = {
    addProduct
}
