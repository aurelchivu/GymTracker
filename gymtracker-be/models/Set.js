const mongoose = require('mongoose');
const slugify = require('slugify');

const SetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  workout: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workout',
    required: true,
  },
  muscle: {
    type: String,
    trim: true,
    required: [true, 'Please add a muscle'],
  },
  exercise: {
    type: String,
    trim: true,
    required: [true, 'Please add an exercise'],
  },
  reps: {
    type: Number,
    trim: true,
    required: [true, 'Please add reps'],
  },
  weight: {
    type: Number,
    trim: true,
    required: [true, 'Please add weight'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: String,
});

// // Create exercise slug from the name
// SetSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

module.exports = mongoose.model('Set', SetSchema);
