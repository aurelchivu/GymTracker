const mongoose = require('mongoose');

const MeasurementSchema = new mongoose.Schema({
  value: {
    type: String,
    trim: true,
    required: [true, 'Please add a value']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  muscle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Muscle',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  slug: String,
});

module.exports = mongoose.model('Measurement', MeasurementSchema);
