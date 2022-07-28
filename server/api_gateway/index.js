const gateway = require('fast-gateway');
const server = gateway({
    routes: [
        {
            prefix: '/user/products',
            target: 'http://localhost:8081',
        },
        {
            prefix: '/authentication',
            target: 'http://localhost:8082',
        },
        {
            prefix: '/user',
            target: 'http://localhost:8083',
        },
        {
            prefix: '/admin',
            target: 'http://localhost:8084',
        },
    ],
})
server.get('/', (req, res) => {
    res.send('Main Gateway called')
})
server.start(5000)
