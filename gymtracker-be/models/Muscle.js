const mongoose = require('mongoose');

const MuscleSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a muscle']
  },
  exercise: {
    type: mongoose.Schema.ObjectId,
    ref: 'Exercise',
    required: true
  },
  slug: String,
});

module.exports = mongoose.model('Muscle', MuscleSchema);
