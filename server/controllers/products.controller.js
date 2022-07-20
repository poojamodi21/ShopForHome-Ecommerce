const mongoose = require('mongoose')
const Product = mongoose.model("Product")
const csv = require('csvtojson')

const addProduct = (req, res) => {
    const { name, price, description, image, category, urlQuery, countInStock } = req.body

    if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })

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
    const { name, price, description, image, category, urlQuery, countInStock } = req.body
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
            urlQuery,
        }, {
            new: true
        }).exec((error, result) => {
            if (error) {
                return res.status(422).json({ error: error })
            } else {
                res.json({ message: "Marked Completed", result })
            }
        })

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
                res.json({ message: "Deleted Successfully", result })
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
    
    console.log("file uploaded")
    console.log(file)
    console.log(name)
  
    csv()
        .fromFile(path)
        .then((jsonObj) => {
            jsonObj.map((item) => {
                const { name, price, description, image, category, urlQuery, countInStock } = item
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
    uploadProducts
}
