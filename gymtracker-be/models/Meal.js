const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    meal: {
      type: String,
      required: [true, 'Please add a meal'],
    },
    food: {
      type: String,
      required: [true, 'Please add a food'],
    },
    calories: {
      type: Number,
      required: [true, 'Please add calories'],
    },
    proteins: {
      type: Number,
      required: [true, 'Please add proteins'],
    },
    carbs: {
      type: Number,
      required: [true, 'Please add carbs'],
    },
    fats: {
      type: Number,
      required: [true, 'Please add fats'],
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

module.exports = mongoose.model('Meal',  MealSchema);
