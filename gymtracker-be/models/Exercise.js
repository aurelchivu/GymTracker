const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
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
  muscle: {
    type: String,
    trim: true,
    required: [true, 'Please add a muscle']
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add an exercise']
  },
  description: [
    {
      sets: { type: Number,required: [true, 'Please add reps']},
      reps: {type: Number,required: [true, 'Please add reps']},
      weight: {type: Number,required: [true, 'Please add weight']}
    }
  ],
  slug: String
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}, {
  timestamps: true,
});

// Create exercise slug from the name
ExerciseSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
