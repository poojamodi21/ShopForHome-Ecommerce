const app = express()

app.route('/addToCart', (req, res) => {
    res.send("add to cart")
})

app.route('/getUser', (req, res) => {
    res.send("get user")
})

app.route('/addToWishlist', (req, res) => {
    res.send("add to wishlist")
})

app.route('/removeProduct', (req, res) => {
    res.send("remove product")
})



app.route('/removeFromWishlist', (req, res) => {
    res.send("remove from wishlist")
})


app.listen(8081, (req, res) => {
    res.send("hello")
})


