const mongoose = require('mongoose');
const slugify = require('slugify'); // part of a URL which identifies a particular page on a website in a form readable by users

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    slug: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
  {
    timestamps: true,
  }
);

// Create workout slug from the name
WorkoutSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true, replacement: '_' });
  next();
});

// Cascade delete muscles when a workout is deleted
WorkoutSchema.pre('remove', async function(next) {
  console.log(`Muscles being removed from workout ${this._id}`);
  await this.model('Muscle').deleteMany({ workout: this._id });
  next();
});

// Reverse populate with virtuals
WorkoutSchema.virtual('muscles', {
  ref: 'Muscle',
  localField: '_id',
  foreignField: 'workout',
  justOne: false
});

module.exports = mongoose.model('Workout', WorkoutSchema);
