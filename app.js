const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()

mongoose.Promise = global.Promise

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/drivers')
}

// Execution of middleware is important for use
app.use(bodyParser.json())
routes(app)

// Controllers will catch errors in `next`
// which will flow out into below

app.use((err, req, res, next) => {
  res.send({ error: err._message })
})

module.exports = app
