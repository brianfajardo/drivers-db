const Driver = require('../models/drivers_model')

module.exports = {

  greet(req, res) {
    res.send({ message: 'Hello!' })
  },

  index(req, res, next) {
    // Ex. http://google.com?lng=25&lat=55
    // pull lng and lat from query
    const { lng, lat } = req.query

    // Pulling lng and lat values as strings for query.
    // Need to convert via parseFloat to number type.
    // Clears 'near field must be a point' error
    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
      .then(drivers => res.send(drivers))
      .catch(next)
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

  delete(req, res, next) {
    Driver.findByIdAndRemove({ _id: req.params.id })
      .then(driver => res.status(204).send(driver))
      .catch(next)
  },
}
