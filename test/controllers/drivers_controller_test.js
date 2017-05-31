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
})
