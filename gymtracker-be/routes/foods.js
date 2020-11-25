const express = require('express');
const {
  getFoods,
  getFood,
  addFood,
  updateFood,
  deleteFood
} = require('../controllers/foods');

const Food = require('../models/Food');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

// router.use(protect);

router
  .route('/')
  .get(
    advancedResults(Food, {path: 'workout', select: 'name'}), protect, getFoods)
  .post(protect, addFood);

router
  .route('/:id')
  .get(protect, getFood)
  .put(protect, updateFood)
  .delete(protect, deleteFood);

module.exports = router;
