const express = require('express');
const {
  getMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal
} = require('../controllers/meals');

// Include other resource routers
const foodRouter = require('./foods');
 
const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:mealId/foods', foodRouter);

router.use(protect);

router.route('/')
  .post(protect, createMeal)
  .get(protect, getMeals);
  

router
  .route('/:_id')
  .get(protect, getMeal)
  .put(protect, updateMeal)
  .delete(protect, deleteMeal);

module.exports = router;
