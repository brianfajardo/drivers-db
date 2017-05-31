const express = require('express')

const app = express()

app.get('/api', (req, res) => {
  res.send({ message: 'Test message from server 🤖' })
})

module.exports = app
