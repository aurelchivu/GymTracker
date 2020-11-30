const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');

// @desc      Add exercise to a specific workout
// @route     POST /api/v1/workouts/:workoutId/exercises
// @access    Private
exports.createExercise = asyncHandler(async (req, res, next) => {
  // Add user and workout to req.body
  req.body.user = req.user.id;
  req.body.workout = req.params.workoutId;

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
        `User ${req.user.id} is not authorized to add an exerixe to workout ${workout._id}`,
        401
      )
    );
  }

  const exercise = await Exercise.create(req.body);

  res.status(200).json({
    success: true,
    data: exercise,
  });
});

// @desc      Get exercises from a specific workout
// @route     GET /api/v1/workouts/:workoutId/exercises
// @access    Private
exports.getExercises = asyncHandler(async (req, res, next) => {
  if (req.params.workoutId) {
    const exercise = await Exercise.find({
      workout: req.params.workoutId,
      user: req.user.id,
    });
    return res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercise,
    });
  }
});

// @desc      Get single exercise from a specific workout
// @route     GET /api/v1/workouts/:workoutId/exercises/:id
// @access    Private
exports.getExercise = asyncHandler(async (req, res, next) => {
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
        `User ${req.user.id} is not authorized to update exercise ${exercise._id}`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: exercise,
  });
});



// @desc      Update exercise from a specific workout
// @route     PUT /api/v1/workouts/:workoutId/exercises/:id
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
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: exercise,
  });
});

// @desc      Delete exercise from a specific workout
// @route     DELETE /api/v1/workouts/:workoutId/exercises/:id
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

  await exercise.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
