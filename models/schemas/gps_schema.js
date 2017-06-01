const mongoose = require('mongoose')

const { Schema } = mongoose

const GpsSchema = new Schema({
  type: {
    String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
})

module.exports = GpsSchema
