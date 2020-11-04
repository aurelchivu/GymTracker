const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a exercise title']
  },
  reps: {
    type: Number,
    required: [true, 'Please add reps']
  },
  weight: {
    type: Number,
    required: [true, 'Please add weight']
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
  workout: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workout',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  slug: String,
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
