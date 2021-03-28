const dotenv = require('dotenv')
dotenv.config();

const express = require('express')
const app = express();

const path = require('path')
const PORT = process.env.PORT || 3000;

const Bot = require('./bot.js')

app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res) => {
    console.log(Date.now() + " Received Ping");
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.listen(PORT,() => {
    console.log(`> Server listening on http://localhost:3000/`)
})

Bot()