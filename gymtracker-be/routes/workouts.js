const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/workouts');

// Include other resource routers
const setRouter = require('./sets');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:workoutId/sets', setRouter);

router.use(protect);

router.route('/')
  .post(protect, createWorkout)
  .get(protect, getWorkouts);

router
  .route('/:_id')
  .get(protect, getWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

module.exports = router;
