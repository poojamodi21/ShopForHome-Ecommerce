const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("Users")

const isLoggedIn = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "You must be signed in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_KEY, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: "You must be signed in" })
        }
        const { id } = payload

        User.findById(id).then(userdata => {
            req.user = userdata
            console.log("from middleware", req.user)
            next()
        })
    })
}

module.exports = isLoggedIn