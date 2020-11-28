const mongoose = require('mongoose');
const slugify = require('slugify');

const MealSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

// Cascade delete foods when a meal is deleted
MealSchema.pre('remove', async function(next) {
  console.log(`Foods being removed from meal ${this._id}`);
  await this.model('Food').deleteMany({ meal: this._id });
  next();
});

// Reverse populate with virtuals
MealSchema.virtual('foods', {
  ref: 'Food',
  localField: '_id',
  foreignField: 'meal',
  justOne: false
});

module.exports = mongoose.model('Meal',  MealSchema);
