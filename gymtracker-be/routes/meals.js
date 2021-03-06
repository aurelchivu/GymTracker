const express = require('express');
const {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meals');
 
const router = express.Router();

const { protect } = require('../middleware/auth');

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
