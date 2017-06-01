const Driver = require('../models/drivers_model')

module.exports = {

  greet(req, res, next) {
    res.send({ message: 'Hello!' })
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then(driver => res.send(driver))
      .catch(next)
  },

  update(req, res, next) {
    const driveId = req.params.id

    Driver.findByIdAndUpdate({ _id: driveId }, req.body)
      .then(() => Driver.findById({ _id: driveId }))
      .then(driver => res.send(driver))
      .catch(next)
  },
}
