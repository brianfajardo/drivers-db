const mongoose = require('mongoose')

before((done) => {
  mongoose.connect('mongodb://localhost/drivers_test')
  mongoose.connection
    .once('open', () => done())
    .on('error', err => console.warn(`Mocha before hook err: ${err}`))
})

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections
  drivers.drop()
    // ensureIndex makes sure before the tests are ran that an index is in place
    // over the geometry.coordinates prop in the driver collection.
    // Required to do when making geography queries.
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done())
})
