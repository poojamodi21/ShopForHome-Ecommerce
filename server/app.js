const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PORT = 5000
const { MONGOURI } = require('./keys')
const fileUpload = require('express-fileupload');

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

require('./models/users')
require('./models/products')
require('./models/orders')

app.use(express.json())
app.use(fileUpload())
app.use(require('./routes/users'))
app.use(require('./routes/products'))
app.use(require('./routes/orders.route'))

mongoose.connection.on('connected',()=>{
    console.log("successfully connected to the database")
})
mongoose.connection.on('error',(error)=>{
    console.log("There was an error while connecting to the database: ",error)
})

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})