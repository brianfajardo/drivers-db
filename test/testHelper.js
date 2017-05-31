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
    .then(() => done())
    .catch(() => done())
})
