const mongoose = require('mongoose')
const User = mongoose.model("Users")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')

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

const login = async (req,res)=>{
    const { name,password } = req.body
    if( !name || !password ){
        return res.status(422).json({error:"Please enter Name and Password"})
    }
   const savedUser = await User.findOne({name:name})
    if(!savedUser){
        return res.status(422).json({error:"Invalid name or Password"})
    }
    const isValidPassword = await bcrypt.compare(password,savedUser.password)
    if(!isValidPassword){
        return res.status(422).json({error:"Invalid name or Password"})
    }
    const token = jwt.sign({id:savedUser._id},JWT_KEY)
    res.json({token:token})
}


   


module.exports = {
    register,
    login
}
