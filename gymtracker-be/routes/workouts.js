const express = require('express');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workouts');

const Workout = require('../models/Workout');

// Include other resource routers
const courseRouter = require('./exercises');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

// router.use(protect);

// Re-route into other resource routers
router.use('/:workoutId/exercises', courseRouter);

router
  .route('/')
  .get(advancedResults(Workout, 'exercises'), getWorkouts)
  .post(createWorkout);

router
  .route('/:id')
  .get(getWorkout)
  .put(updateWorkout)
  .delete(deleteWorkout);

module.exports = router;
