const mongoose = require('mongoose');
const slugify = require('slugify');

const MuscleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
    },
  workout: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workout',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a muscle']
  },
  slug: String,
}, {
  timestamps: true,
});

// Create exercise slug from the name
MeasurementSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Muscle', MuscleSchema);
