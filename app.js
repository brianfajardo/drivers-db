const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/drivers')

// Middleware
app.use(bodyParser.json())

// Note: middlewares should always be placed before routes
routes(app)

module.exports = app
