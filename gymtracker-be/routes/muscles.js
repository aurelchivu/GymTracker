const express = require('express');
const {
  createMuscle,
  getMuscles,
  getMuscle,
  updateMuscle,
  deleteMuscle,
} = require('../controllers/muscles');

// Include other resource routers
const exercisesRouter = require('./exercises');
const measurementRouter = require('./measurements');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:muscleId/exercises', exercisesRouter);
router.use('/:muscleId/measurements', measurementRouter);

router.use(protect);

router
  .route('/')
  .post(protect, createMuscle)
  .get(protect, getMuscles);

router
  .route('/:_id')
  .get(protect, getMuscle)
  .put(protect, updateMuscle)
  .delete(protect, deleteMuscle);

module.exports = router;
