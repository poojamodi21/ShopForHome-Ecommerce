const express = require('express')
const router = express.Router()
const {
    addProduct,
} = require('../controllers/products')
const  isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/addProduct',isLoggedIn, addProduct)

module.exports = router