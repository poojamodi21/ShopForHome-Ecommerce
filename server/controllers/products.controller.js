const mongoose = require('mongoose')
const Product = mongoose.model("Product")
const csv = require('csvtojson')

const addImage = (req, res) => {

    if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
    if (req.files === null) {
        return res.status(400).json({ message: "No file was uploaded" })
    }
    const images = req.files.image
    const imageName = images.name
    images.mv(`C:/Users/Pooja/OneDrive/Desktop/PROJECTS/Great_learning_ecommerce/client/public/images/${imageName}`)
    console.log("image uploaded from add image route",imageName)
    res.json({ message: "file uploaded", image: `/images/${imageName}` })
}

const addProduct = async (req, res) => {
    if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
    const { name, price, category, description, image, countInStock } = req.body
    console.log("req.body", req.body)
    const product = new Product({
        name,
        price,
        category,
        description,
        image,
        countInStock
    })
 const savedProduct = await product.save()
    console.log("saved successfully from server",savedProduct)
    res.json({ message: "product added" })
}




    const allProducts = async (req, res) => {
        try {
            const products = await Product.find({})
            res.json(products)
        }
        catch (error) {
            console.log(error)
        }

    }

    const updateProduct = async (req, res) => {
        const { id } = req.params
        const { name, price, description, image, category, countInStock } = req.body
        try {
            const product = await Product.findById(id)
            if (!product) return res.status(404).json({ error: "Product not found" })
            if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
            Product.findByIdAndUpdate(id, {
                name,
                price,
                description,
                image,
                countInStock,
                category,

            }, {
                new: true
            }).exec((error, result) => {
                if (error) {
                    return res.status(422).json({ error: error })
                } else {
                    Product.find({})
                        .then(
                            (products) => {
                                res.json({ message: "Product updated successfully", products })
                            }
                        ).catch
                        (error => {
                            console.log(error)
                        }
                        )
                }
            }
            )
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteProduct = async (req, res) => {
        const { id } = req.params
        try {
            const product = await Product.findById(id)
            if (!product) return res.status(404).json({ error: "Product not found" })
            if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
            Product.findByIdAndDelete(id).exec((error, result) => {
                if (error) {
                    return res.status(422).json({ error: error })
                } else {
                    Product.find({})
                        .then(
                            (products) => {
                                res.json({ message: " deleted successfully", products })
                            }
                        ).catch
                        (error => {
                            console.log(error)
                        }
                        )
                }
            }
            )
        }
        catch (error) {
            console.log(error)
        }
    }

    const uploadProducts = async (req, res) => {
        if (req.files === null) {
            return res.status(400).json({ message: "No file was uploaded" })
        }
        const file = req.files.file;
        const name = file.name
        const path = `C:/Users/Pooja/OneDrive/Desktop/PROJECTS/Great_learning_ecommerce/client/uploads/${name}`
        file.mv(`C:/Users/Pooja/OneDrive/Desktop/PROJECTS/Great_learning_ecommerce/client/uploads/${name}`)


        csv()
            .fromFile(path)
            .then((jsonObj) => {
                jsonObj.map((item) => {
                    const { name, price, description, image, category, countInStock } = item
                    const product = new Product({
                        name,
                        price,
                        description,
                        image,
                        countInStock,
                        category,

                    })
                    product.save()
                        .then(product => {
                            console.log("saved successfully")
                        }
                        )
                        .catch(error => {
                            console.log(error)
                        }
                        )
                },
                    res.json({ message: "file uploaded" })

                )
            }
            )
    }








    module.exports = {
        addProduct,
        allProducts,
        updateProduct,
        deleteProduct,
        uploadProducts,
        addImage,
    }
