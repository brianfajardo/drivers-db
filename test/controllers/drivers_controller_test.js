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

  it('should delete a driver by ID on DELETE request to /api/drivers/:id', (done) => {
    const driver = new Driver({ email: 'driver@test.com' })

    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
            Driver.findOne({ email: 'driver@test.com' })
              .then((driver) => {
                assert(driver === null)
                done()
              })
          })
      })
  })

  it('should find drivers in a location on GET request to /api/drivers', (done) => {
    const torontoDriver = new Driver({
      email: 'driver1@test.com',
      geometry: {
        type: 'Point',
        coordinates: [79.3832, 43.6532]
      }
    })
    const miamiDriver = new Driver({
      email: 'driver2@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791]
      }
    })

    Promise.all([torontoDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1)
            assert(response.body[0].obj.email === 'driver2@test.com')
            done()
          })
      })
  })
})
