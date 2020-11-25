const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');

// @desc      Get exercises from a specific workout
// @route     GET /api/v1/workouts/:workoutId/exercises
// @access    Private
exports.getExercises = asyncHandler(async (req, res, next) => {
  if (req.params.workoutId) {
    const exercises = await Exercise.find({ workout: req.params.workoutId });
    return res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercises
    });
  } else {
    res.status(200).json({
      success: true,
      data: exercises
    });
  }
});

// @desc      Get single exercise
// @route     GET /api/v1/exercises/:id
// @access    Private
exports.getExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    return next(
      new ErrorResponse(`No exercise with the id of ${req.params.id}`),
      404
    );
  }
  res.status(200).json({
    success: true,
    data: exercise
  });
});

// @desc      Add exercise
// @route     POST /api/v1/workouts/:workoutId/exercises
// @access    Private
exports.addExercise = asyncHandler(async (req, res, next) => { 
  req.body.workout = req.params.workoutId;
  req.body.user = req.user.id;

  const workout = await Workout.findById(req.params.workoutId);

  if (!workout) {
    return next(
      new ErrorResponse(`No workout with the id of ${req.params.workoutId}`),
      404
    );
  }

  // Make sure user is workout owner
  if (workout.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a exercise to workout ${workout._id}`,
        401
      )
    );
  }

  const exercise = await Exercise.create(req.body);

  res.status(200).json({
    success: true,
    data: exercise
  });
});

// @desc      Update exercise
// @route     PUT /api/v1/exercises/:id
// @access    Private
exports.updateExercise = asyncHandler(async (req, res, next) => {
  let exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    return next(
      new ErrorResponse(`No exercise with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is exercise owner
  if (exercise.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update exercise ${exercise._id}`,
        401
      )
    );
  }

  exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: exercise
  });
});

// @desc      Delete exercise
// @route     DELETE /api/v1/exercises/:id
// @access    Private
exports.deleteExercise = asyncHandler(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);

  if (!exercise) {
    return next(
      new ErrorResponse(`No exercise with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is exercise owner
  if (exercise.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete exercise ${exercise._id}`,
        401
      )
    );
  }

  await Exercise.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
