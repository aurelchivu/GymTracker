const mongoose = require('mongoose');
// const timeZone = require('mongoose-timezone');

const FoodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    meal: {
      type: mongoose.Schema.ObjectId,
      ref: 'Meal',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    qty: {
      type: Number,
      required: [true, 'Please add a quantity'],
    },
    cals: {
      type: Number,
      required: [true, 'Please add calories'],
    },
    // proteins: {
    //   type: Number,
    //   required: [true, 'Please add proteins']
    // },
    // fats: {
    //   type: Number,
    //   required: [true, 'Please add fats']
    // },
    // carbs: {
    //   type: Number,
    //   required: [true, 'Please add carbs']
    // },
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

// FoodSchema.plugin(timeZone);

module.exports = mongoose.model('Food', FoodSchema);
