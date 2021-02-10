const mongoose = require('mongoose');
// const timeZone = require('mongoose-timezone');

const MeasurementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  bodyPart: {
    type: String,
    required: [true, 'Please add a body part'],
  },
  measure: {
    type: Number,
    required: [true, 'Please add a value'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: String,
});

// MeasurementSchema.plugin(timeZone);

module.exports = mongoose.model('Measurement', MeasurementSchema);
