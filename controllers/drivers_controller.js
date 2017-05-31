const Driver = require('../models/drivers_model')

module.exports = {

  greet(req, res) {
    res.send({ message: 'Hello!' })
  },

  create(req, res) {
    Driver.create(req.body)
      .then(driver => res.send(driver))
  },
}
