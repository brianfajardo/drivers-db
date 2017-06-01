const assert = require('assert')
const request = require('supertest')
const app = require('../app')

describe('Express app', () => {

  it('should handle a GET request to /api/drivers', (done) => {
    request(app)
      .get('/api/drivers')
      .end((err, res) => {
        assert(res.body.message === 'Hello!')
        done()
      })
  })
})
