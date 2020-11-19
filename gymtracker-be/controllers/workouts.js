const path = require('path');
const ErrorResponse = require('../utils/errorResponse'); // custom error handler
const asyncHandler = require('../middleware/async'); // custom async handler to avoid repeating the try/catch code on each async middleware
const Workout = require('../models/Workout');

// @desc      Get all workouts
// @route     GET /api/v1/workouts
// @access    Private
exports.getWorkouts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single workout
// @route     GET /api/v1/workouts/:id
// @access    Private
exports.getWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(
      new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: workout });
});

// @desc      Create new workout
// @route     POST /api/v1/workouts
// @access    Private
exports.createWorkout = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const workout = await Workout.create(req.body);
  
  res.status(201).json(workout);
});

// @desc      Update workout
// @route     PUT /api/v1/workouts/:id
// @access    Private
exports.updateWorkout = asyncHandler(async (req, res, next) => {
  let workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(
      new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is workout owner
  if (workout.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this workout`,
        401
      )
    );
  }

  workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: workout });
});

// @desc      Delete workout
// @route     DELETE /api/v1/workouts/:id
// @access    Private
exports.deleteWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id);

  if (!workout) {
    return next(
      new ErrorResponse(`Workout not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is workout owner
  if (workout.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this workout`,
        401
      )
    );
  }

  workout.remove();

  res.status(200).json({ success: true, data: {} });
});

