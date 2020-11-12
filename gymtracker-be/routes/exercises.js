const express = require('express');
const {
  getExercises,
  getExercise,
  addExercise,
  updateExercise,
  deleteExercise
} = require('../controllers/exercises');

const Exercise = require('../models/Exercise');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

// router.use(protect);

router
  .route('/')
  .get(
    advancedResults(Exercise, {
      path: 'workout',
      select: 'name'
    }),
    getExercises
  )
  .post(addExercise);

router
  .route('/:id')
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise);

module.exports = router;
