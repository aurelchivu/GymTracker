const ErrorResponse = require('../utils/errorResponse'); // custom error handler
const asyncHandler = require('../middleware/async'); // custom async handler to avoid repeating the try/catch code on each async middleware
const Workout = require('../models/Workout');

// @desc      Create new workout
// @route     POST /api/v1/workouts
// @access    Private
exports.createWorkout = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const workout = await Workout.create(req.body);

  res.status(201).json({
    success: true,
    data: workout,
  });
});

// @desc      Get all workouts
// @route     GET /api/v1/workouts/
// @access    Private
exports.getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id }).populate({
    path: 'sets',
    select: 'muscle name reps weight',
  });

  res.status(200).json({
    succes: true,
    count: workouts.length,
    data: workouts,
  });
});

// @desc      Get workout by ID
// @route     GET /api/v1/workouts/:id
// @access    Private
exports.getWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params._id).populate({
    path: 'sets',
    select: 'muscle exercise reps weight',
  });

  if (!workout) {
    return next(
      new ErrorResponse(`No workout found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is workout owner
  if (workout.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to get this workout`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: workout });
});

// @desc      Update workout
// @route     PUT /api/v1/workouts/:id
// @access    Private
exports.updateWorkout = asyncHandler(async (req, res, next) => {
  let workout = await Workout.findById(req.params._id);

  if (!workout) {
    return next(
      new ErrorResponse(`workout not found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is workout owner
  if (workout.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to update this workout`,
        401
      )
    );
  }

  workout = await Workout.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: workout });
});

// @desc      Delete workout
// @route     DELETE /api/v1/workouts/:id
// @access    Private
exports.deleteWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params._id);

  if (!workout) {
    return next(
      new ErrorResponse(`workout not found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is workout owner
  if (workout.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User with id ${req.user._id} is not authorized to delete this workout`,
        401
      )
    );
  }

  workout.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
