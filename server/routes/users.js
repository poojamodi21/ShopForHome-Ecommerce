const express = require('express')
const router = express.Router()
const {
    register,
    login,
    allUsers,
    deleteUser,
    updateUser,
    convertAdmin,
    addToCart,
    getUser,
    addToWishlist,
    removeProduct,
    removeFromWishlist
} = require('../controllers/users.controller')
const isLoggedIn = require('../middlewares/isLoggedIn')



router.post('/register', register)
router.post('/login', login)


router.get('/allUsers', isLoggedIn, allUsers)
router.delete('/deleteUser/:id', isLoggedIn, deleteUser)
router.put('/updateUser/:id', isLoggedIn, updateUser)

router.put('/convertAdmin/:id', isLoggedIn, convertAdmin)

router.put('/addToCart/:id', isLoggedIn, addToCart)
router.get('/getUser', isLoggedIn, getUser)

router.put('/addToWishlist/:id', isLoggedIn, addToWishlist)
router.put('/removeProduct/:id', isLoggedIn, removeProduct)
router.put('/removeFromWishlist/:id', isLoggedIn, removeFromWishlist)



module.exports = router