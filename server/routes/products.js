const express = require('express')
const router = express.Router()
const {
    addProduct,
    allProducts,
    updateProduct,
    deleteProduct,
    uploadProducts,
    addImage,
  
} = require('../controllers/products.controller')
const  isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/addProduct',isLoggedIn, addProduct)
router.get('/allProducts',allProducts)
router.put('/updateProduct/:id',isLoggedIn, updateProduct)
router.delete('/deleteProduct/:id',isLoggedIn, deleteProduct)
router.post('/uploadProducts',isLoggedIn, uploadProducts)
router.post('/addImage',isLoggedIn, addImage)



module.exports = router
