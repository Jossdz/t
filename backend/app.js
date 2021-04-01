require('dotenv').config()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
mongoose
  .connect('mongodb://localhost/db', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

const app = express()

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3001'
  })
)

const index = require('./routes/index')
app.use('/', index)
const productRouter = require('./routes/productRoutes')
// Aqui podriamos poner un prefijo
app.use('/api', productRouter)

module.exports = app
