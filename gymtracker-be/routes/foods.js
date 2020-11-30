const express = require('express');
const {
  createFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
} = require('../controllers/foods');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .post(protect, createFood)
  .get(protect, getFoods);
  

router
  .route('/:id')
  .get(protect, getFood)
  .put(protect, updateFood)
  .delete(protect, deleteFood);

module.exports = router;
