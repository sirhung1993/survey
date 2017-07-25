'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const form = require('multer')()
const app = express()

const DB = require('./model/database.js')
const db = new DB()
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

app.get('/countSurveyView', (req, res, next) => {
	db.countSurveyView().then((success) => {
		res.status(200).json({OK: {msg : success}})
	})
	.catch((err) => {
		res.status(200).json({err: {msg: "Internal server err!"}})
	})
})

app.post('/submit' , (req, res, next) => {
	var answers = req.body['answers[]']
	console.log(answers)
	db.insertASurvey(answers).then((success) => {
		res.status(200).json({OK: {msg: 'Insert suscessfully! ' + success}})
	})
	.catch((err) => {
		res.status(200).json({err: {msg: "Internal server error!"}})
	})
})

app.get('/thank' , function ( req , res , next) {
    res.status(200).render ('pages/thank')
})

app.get('(error_page|*)' , function ( req , res , next) {
    res.status(404).render ('pages/error_page')
})

app.listen(app.get('port'), () => {
  console.log('Server is running at this : ' + app.get('port'))
})
