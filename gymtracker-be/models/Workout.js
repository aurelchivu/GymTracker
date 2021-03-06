const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a name'],
    },
    time: {
      type: Number,
      default: 0,
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

// Cascade delete exercises when a workout is deleted
WorkoutSchema.pre('remove', async function (next) {
  console.log(`Sets being removed from workout ${this._id}`);
  await this.model('Set').deleteMany({ workout: this._id });
  next();
});

// Reverse populate with virtuals
WorkoutSchema.virtual('sets', {
  ref: 'Set',
  localField: '_id',
  foreignField: 'workout',
  justOne: false,
});

module.exports = mongoose.model('Workout', WorkoutSchema);
