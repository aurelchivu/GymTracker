const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const measurementSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  measurement: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Measurement', measurementSchema);
