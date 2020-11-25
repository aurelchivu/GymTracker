const express = require('express');
const {
  getMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals');

const Meal = require('../models/Meal');
 
const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(advancedResults(Meal), protect, getMeals)
  .post(createMeal);

router
  .route('/:_id')
  .get(protect, getMeal)
  .put(protect, updateMeal)
  .delete(protect, deleteMeal);

module.exports = router;
