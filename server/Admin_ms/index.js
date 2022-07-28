const app = express()

app.route('/allUsers', (req, res) => {
    res.send("all users")
})

app.route('/deleteUser', (req, res) => {
    res.send("delete user")
})

app.route('/updateUser', (req, res) => {
    res.send("update user")
})

app.listen(8081, (req, res) => {
    res.send("hello")
})


// router.get('/allUsers', isLoggedIn, allUsers)
// router.delete('/deleteUser/:id', isLoggedIn, deleteUser)
// router.put('/updateUser/:id', isLoggedIn, updateUser)

// router.put('/convertAdmin/:id', isLoggedIn, convertAdmin)