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
const exerciseRouter = require('./exercises');
 
const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

// router.use(protect);

// Re-route into other resource routers
router.use('/:workoutId/exercises', exerciseRouter);

router
  .route('/')
  .get(advancedResults(Workout, 'exercises'), protect, getWorkouts)
  .post(protect, createWorkout);

router
  .route('/:id')
  .get(protect, getWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

module.exports = router;
