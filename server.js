const fs = require('fs')
const https = require('https')
const express = require('express')
const socketIo = require("socket.io")
const app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static('public'))

app.post('/paid', (req, res) => {

    const id = req.body.data.id;
    const amount = req.body.data.amount_satoshi;
    const paid = req.body.data.paid;
    const desc = req.body.data.description;
    console.log(`payment recieved for ${amount} satoshis`)
    confirmPayment();

})

const server = https.createServer({

    key: fs.readFileSync('/etc/letsencrypt/live/ln.zacharyrener.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/ln.zacharyrener.com/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/ln.zacharyrener.com/fullchain.pem')

}, app)

const io = socketIo(server)

const confirmPayment = () => {

    io.emit('paid', 'Thank you for your payment.');

}

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

server.listen(443, () => {

    console.log('Listening...')

})