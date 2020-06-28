const fs = require('fs')
const https = require('https')
const express = require('express')


const app = express()

app.use('/', express.static('public'))

app.get('/send', (req, res) => {

   

    res.send('sent')

})

https.createServer({

    key: fs.readFileSync('/etc/letsencrypt/live/ln.zacharyrener.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/ln.zacharyrener.com/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/ln.zacharyrener.com/fullchain.pem')

}, app).listen(443, () => {

    console.log('Listening...')

})