const mongoose = require('mongoose')
const GpsLocationSchema = require('./schemas/gps_location_schema')

const { Schema } = mongoose

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GpsLocationSchema
})

const Driver = mongoose.model('driver', DriverSchema)

module.exports = Driver
