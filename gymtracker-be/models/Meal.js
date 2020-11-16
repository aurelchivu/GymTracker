const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  foods: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      totalCalories: { type: Number, required: true }
    }
  ],
  slug: String,
}, {
  timestamps: true,
});

// Create meal slug from the name
MealSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Meal', MealSchema);
