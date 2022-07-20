const express = require('express')
const router = express.Router()
const {
    register,
    login,
    allUsers,
    deleteUser,
    updateUser,
    convertAdmin
} = require('../controllers/users.controller')
const  isLoggedIn = require('../middlewares/isLoggedIn')


router.post('/register',register)
router.post('/login',login)
router.get('/allUsers',isLoggedIn,allUsers)
router.delete('/deleteUser/:id',isLoggedIn,deleteUser)
router.put('/updateUser/:id',isLoggedIn, updateUser)
router.put('/convertAdmin/:id',isLoggedIn, convertAdmin)



module.exports = router