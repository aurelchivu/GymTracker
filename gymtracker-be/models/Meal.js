const mongoose = require('mongoose');
const slugify = require('slugify');

const MealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
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

// Create exercise slug from the name
// MealSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

module.exports = mongoose.model('Meal',  MealSchema);
