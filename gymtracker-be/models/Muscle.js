const mongoose = require('mongoose');

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
    trim: true,
    required: [true, 'Please add a muscle']
  },
  slug: String,
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
},
{
  timestamps: true,
});

// Create muscle slug from the name
MuscleSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true, replacement: '_' });
  next();
});

// Cascade delete exercises when a muscle is deleted
MuscleSchema.pre('remove', async function(next) {
  console.log(`Exercises being removed from muscle ${this._id}`);
  await this.model('Exercise').deleteMany({ muscle: this._id });
  next();
});

// Reverse populate with virtuals
MuscleSchema.virtual('exercises', {
  ref: 'Exercise',
  localField: '_id',
  foreignField: 'muscle',
  justOne: false
});

module.exports = mongoose.model('Muscle', MuscleSchema);
