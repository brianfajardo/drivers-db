const DriversController = require('../controllers/drivers_controller')

module.exports = (app) => {
  app.get('/api/drivers', DriversController.greet)
  app.post('/api/drivers', DriversController.create)
  app.put('/api/drivers/:id', DriversController.update)
}
