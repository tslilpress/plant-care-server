const mongoose = require('mongoose')
// const moment = require('moment')
// //
// // const formatDate = new Date().toString().split(' ').slice(0, 4).join(' '),
// // const date = moment(formatDate).format('YYYY/MM/DD')
// const formatDate = new Date()
// const date = moment(formatDate).format('YYYY/MM/DD')

const plantSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true
  },
  plantType: {
    type: String
  },
  lastWatered: {
    type: Date,
    required: true
  },
  lastFertilized: {
    type: Date,
    required: true
  },
  wateringFrequency: {
    type: Number,
    required: true
  },
  fertilizingFrequency: {
    type: Number,
    required: true
  },
  nextWatering: {
    type: Date
  },
  nextFertilizing: {
    type: Date
  },
  // ingredients: [ingredientSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  note: {
    type: String,
    required: false
  }
}, {
  timestamps: true
})

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant
