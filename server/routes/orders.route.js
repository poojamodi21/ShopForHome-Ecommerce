const express = require('express')
const router = express.Router()
const {
    createOrder,
    allOrders,
    
  
} = require('../controllers/orders.controller')
const  isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/createOrder',isLoggedIn, createOrder)
router.get('/allOrders',isLoggedIn, allOrders)




module.exports = router
