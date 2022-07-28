const mongoose = require('mongoose')
const User = mongoose.model("Users")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')
const Product = mongoose.model("Product")

const register = (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    User.findOne({ name: name })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        name,
                        password: hashedpassword,
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved successfully" })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
        })
        .catch(error => {
            console.log(error)
        })
}

const login = async (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(422).json({ error: "Please enter Name and Password" })
    }
    const savedUser = await User.findOne({ name: name })
    if (!savedUser) {
        return res.status(422).json({ error: "Invalid name or Password" })
    }
    const isValidPassword = await bcrypt.compare(password, savedUser.password)
    if (!isValidPassword) {
        return res.status(422).json({ error: "Invalid name or Password" })
    }
    const token = jwt.sign({ id: savedUser._id }, JWT_KEY)
    // const user = {
    //     name: savedUser.name,
    //     isAdmin: savedUser.isAdmin,
    //     cart: savedUser.cart
    // }
    User.findOne({ name: name })
        .populate('cart.productId').populate('wishlist.productId')
        .exec((error, user) => {
            if (error) {
                return res.status(422).json({ error: error })
            }
            res.json({
                token,
                user,
            })
        }
        )
}


const allUsers = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
        const users = await User.find({})
        res.json(users)

    }
    catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ error: "User not found" })
        await User.findByIdAndDelete(id).exec((error, result) => {
            if (error) {
                return res.status(422).json({ error: error })
            }
            else {
                User.find({})
                    .then(
                        (users) => {
                            res.json({ message: "User deleted successfully", users })
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
const convertAdmin = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    try {
        if (!req.user.isAdmin) return res.status(401).json({ error: "You must be admin" })
        const user = await User.findByIdAndUpdate(id, { name, isAdmin }, { new: true })
        if (!user) return res.status(404).json({ error: "User not found" })
        res.json({ message: "User updated successfully" })
    }
    catch (error) {
        console.log(error)
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { name, isAdmin,discount } = req.body
    try {
        const user = await User.findByIdAndUpdate(id, { name, isAdmin ,discount}, { new: true })
        User.find({})
            .then(
                (users) => {
                    res.json({ message: "User updated successfully", users })
                }
            ).catch
            (error => {
                console.log(error)
            }
            )

    }
    catch (error) {
        console.log(error)
    }
}
const addToCart = async (req, res) => {
    const { id } = req.params
    const user = req.user.name
    

    try {
        const userData = await User.findOne({ name: user })
        if (!userData) return res.status(404).json({ error: "User not found" })
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ error: "Product not found" })

        //     return res.status(422).json({ error: "Product already in cart" })
        // }
        if (userData.cart.some(item => item.productId.toString() === id)) {
            return res.status(422).json({ error: "Product already in cart" })
        }

        const result = await User.findOneAndUpdate({ name: user }, {
            $push: { cart: { productId: id, quantity: 1 } }
        }, {
            new: true
        }).populate('cart.productId').populate('wishlist.productId')
            .exec((error, result) => {
                if (error) {
                    return res.status(422).json({ error: error })
                }
                else {
                    res.json({ message: "Product added to cart successfully", result })
                }
            }
            )
    }

    // if (!result) return res.status(404).json({ error: "Something went wrong" })
    // res.json({ message: "Product added to cart successfully" , result})

    catch (error) {
        console.log(error)

    }

}

const addToWishlist = async (req, res) => {
    const { id } = req.params
    const user = req.user.name
    

    try {
        const userData = await User.findOne({ name: user })
        if (!userData) return res.status(404).json({ error: "User not found" })
        const product = await Product.findById(id)
        if (!product) return res.status(404).json({ error: "Product not found" })

        //     return res.status(422).json({ error: "Product already in cart" })
        // }
        if (userData.wishlist.some(item => item.productId.toString() === id)) {
            return res.status(422).json({ error: "Product already in cart" })
        }

        const result = await User.findOneAndUpdate({ name: user }, {
            $push: { wishlist: { productId: id } }
        }, {
            new: true
        }).populate('cart.productId').populate('wishlist.productId')
            .exec((error, result) => {
                if (error) {
                    return res.status(422).json({ error: error })
                }
                else {
                   
                    res.json({ message: "Product added to wishlist successfully", result })
                }
            }
            )
    }

    // if (!result) return res.status(404).json({ error: "Something went wrong" })
    // res.json({ message: "Product added to cart successfully" , result})

    catch (error) {
        console.log(error)

    }

}

// if (!result) return res.status(404).json({ error: "Something went wrong" })
// res.json({ message: "Product added to wishlist successfully", result })



const getUser = async (req, res) => {
    const user = req.user.name
    try {
        const userData = await User.findOne({ name: user }).populate('cart.productId').populate('wishlist.productId')
            .exec((error, result) => {
                if (error) {
                    return res.status(422).json({ error: error })
                }
                else {
                   if(result.isAdmin){
                    Product.find({countInStock:{$lt:10}}).then(products=>{
                        res.json({ message: "User found successfully", result, lowProducts:products}) })

                     }else{

                    res.json({ message: "User found successfully", result })

                     } 
                }
            }
            )

        // if (!userData) return res.status(404).json({ error: "User not found" })
        // const loggedInUser = {
        //     name: userData.name,
        //     isAdmin: userData.isAdmin,
        //     cart: userData.cart,
        //     wishlist: userData.wishlist
        // }
        // res.json(loggedInUser)
    }
    catch (error) {
        console.log(error)
    }
}

const removeProduct = async (req, res) => {
    const { id } = req.params
    const user = req.user.name
    try {
        const userData = await User.findOne({ name: user })
        if (!userData) return res.status(404).json({ error: "User not found" })
        const result = await User.findByIdAndUpdate(userData._id,
            {
                $pull:
                    { cart: { productId: id } }
            }, { new: true })
            .populate('cart.productId').populate('wishlist.productId')
            .exec((error, result) => {
                if (error) {
                    return res.status(422).json({ error: error })
                }
                else {
                    res.json({ message: "Product removed from cart successfully", result })
                }
            }
            )
        //     if (!result) return res.status(404).json({ error: "Product not found" })
        //     res.json({ message: "Product removed from cart successfully", result })
    }
    catch (error) {
        console.log(error)
    }
}

const removeFromWishlist = async (req, res) => {
    const { id } = req.params
    const user = req.user.name
    try {
        const userData = await User.findOne({ name: user })
        if (!userData) return res.status(404).json({ error: "User not found" })
        const result = await User.findByIdAndUpdate(userData._id,
            {
                $pull:
                    { wishlist: { productId: id } }
            }, { new: true })
            .populate('cart.productId').populate('wishlist.productId')
            .exec((error, result) => {
                if (error) {
                    return res.status(422).json({ error: error })
                }
                else {
                    res.json({ message: "Product removed from wishlist successfully", result })
                }
            }
            )
        //     if (!result) return res.status(404).json({ error: "Product not found" })
        //     res.json({ message: "Product removed from cart successfully", result })
    }
    catch (error) {
        console.log(error)
    }
}







module.exports = {
    register,
    login,
    allUsers,
    deleteUser,
    convertAdmin,
    updateUser,
    addToCart,
    getUser,
    addToWishlist,
    removeProduct,
    removeFromWishlist
}
