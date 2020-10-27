const mongoose = require('mongoose')

// const ingredientSchema = require('./ingredient')

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
  fertilizngFrequency: {
    type: Number,
    required: true
  },
  nextWatering: {
    type: Date,
    required: true
  },
  nextFertilizing: {
    type: Date,
    required: true
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
