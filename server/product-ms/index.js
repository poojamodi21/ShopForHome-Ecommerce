const app = express()

app.route('/allProducts', (req, res) => {
    res.send("all products")
})

app.route('/uploadProducts', (req, res) => {
    res.send("Upload products")
})

app.route('/addProduct', (req, res) => {
    res.send("add product")
})

app.route('/updateProduct', (req, res) => {
    res.send("Update products")
})



app.route('/deleteProduct', (req, res) => {
    res.send("delete products")
})


app.listen(8081, (req, res) => {
    res.send("hello")
})


