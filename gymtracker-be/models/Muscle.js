const mongoose = require('mongoose');
const slugify = require('slugify');

const MuscleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a muscle'],
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create exercise slug from the name
// MeasurementSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// Reverse populate with virtuals
MuscleSchema.virtual('exercises', {
  ref: 'Exercise',
  localField: '_id',
  foreignField: 'muscle',
  justOne: false
});

MuscleSchema.virtual('measurements', {
  ref: 'Measurement',
  localField: '_id',
  foreignField: 'muscle',
  justOne: false,
});

module.exports = mongoose.model('Muscle', MuscleSchema);
