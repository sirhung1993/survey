'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const form = require('multer')()
const app = express()

const Config = require('./config/Config.js')
const config = new Config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use('/src', express.static('./views/src'))
app.use('/layout', express.static('./views/layout'))
app.use('/views', express.static('./views'))
app.set('port', (process.env.PORT || 6969))

app.get('/', function (req, res, next) {
  res.render('pages/index')
})

app.get('/about', function (req, res, next) {
  // console.log("https://" + req.hostname + req.url)
  res.render('pages/about')
})

app.get('(error_page|*)' , function ( req , res , next) {
    res.status(404).render ('pages/error_page')
})

app.listen(app.get('port'), () => {
  console.log('Server is running at this : ' + app.get('port'))
})
