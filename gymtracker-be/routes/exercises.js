const express = require('express');
const {
  createExercise,
  getExercises,
  getExercise,
  updateExercise,
  deleteExercise,
} = require('../controllers/exercises');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .post(protect, createExercise)
  .get(protect, getExercises);

router
  .route('/:id')
  .get(protect, getExercise)
  .put(protect, updateExercise)
  .delete(protect, deleteExercise);

module.exports = router;
