const mongoose = require('mongoose')
const GpsSchema = require('./schemas/gps_schema')

const { Schema } = mongoose

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  geometry: GpsSchema,
})

const Driver = mongoose.model('driver', DriverSchema)

module.exports = Driver
