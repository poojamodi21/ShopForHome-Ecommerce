const app = express()

app.route('/register', (req, res) => {
    res.send("Register")
})

app.route('/login', (req, res) => {
    res.send("login")
})


app.listen(8081, (req, res) => {
    res.send("hello")
})


