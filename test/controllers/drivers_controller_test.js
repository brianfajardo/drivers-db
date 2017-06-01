const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')

// Mongoose, Mocha, Express issues arise when importing model
// via js file. This is a recommended work around.
const Driver = mongoose.model('driver')

describe('Drivers controller', () => {

  it('should create a new driver on POST request to /api/drivers', (done) => {
    // Taking initial count
    Driver.count()
      .then((count) => {
        // Create a new record
        request(app)
          .post('/api/drivers')
          .send({ email: 'driver@test.com' })
          .end(() => {
            // Recheck count again
            Driver.count()
              .then((updatedCount) => {
                assert(count + 1 === updatedCount)
                done()
              })
          })
      })
  })

  it('should update a driver by ID on PUT request to /api/drivers/:id', (done) => {
    const driver = new Driver({ email: 'driver@test.com', available: false })

    driver.save()
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ available: true })
          .end(() => {
            Driver.findOne({ email: 'driver@test.com' })
              .then((driver) => {
                assert(driver.available)
                done()
              })
          })
      })
  })
})
