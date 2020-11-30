const mongoose = require('mongoose');
const slugify = require('slugify');

const MeasurementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    muscle: {
      type: mongoose.Schema.ObjectId,
      ref: 'Muscle',
      required: true,
    },
    value: {
      type: Number,
      required: [true, 'Please add a value'],
    },
    slug: String,
  },
  {
    timestamps: true,
  }
);

// Create exercise slug from the name
// MeasurementSchema.pre('save', function(next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

module.exports = mongoose.model('Measurement', MeasurementSchema);
