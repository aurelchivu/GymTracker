const mongoose = require('mongoose');
// const timeZone = require('mongoose-timezone');

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

// Reverse populate with virtuals
MuscleSchema.virtual('sets', {
  ref: 'Set',
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

// MuscleSchema.plugin(timeZone);

module.exports = mongoose.model('Muscle', MuscleSchema);
