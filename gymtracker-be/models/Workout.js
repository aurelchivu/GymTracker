const mongoose = require('mongoose');
const slugify = require('slugify'); // part of a URL which identifies a particular page on a website in a form readable by users

const WorkoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [25, 'Name can not be more than 50 characters']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [50, 'Description can not be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create workout slug from the name
WorkoutSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true, replacement: '_' });
  next();
});

// Cascade delete exercises when a workout is deleted
WorkoutSchema.pre('remove', async function(next) {
  console.log(`Exercises being removed from workout ${this._id}`);
  await this.model('Exercise').deleteMany({ workout: this._id });
  next();
});

// Reverse populate with virtuals
WorkoutSchema.virtual('exercises', {
  ref: 'Exercise',
  localField: '_id',
  foreignField: 'workout',
  justOne: false
});

module.exports = mongoose.model('Workout', WorkoutSchema);
