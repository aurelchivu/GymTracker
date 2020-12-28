const moment = require('moment');
const startOfDay = require('date-fns/startOfDay');
const endOfDay = require('date-fns/endOfDay');
const parseISO = require('date-fns/parseISO');
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
  const date = req.query.date;
  queryDate = new Date(date).toISOString().split('T')[0];
  console.log(new Date(req.query.date).toISOString().split('T')[0]);

  // const startDay = startOfDay(new Date(date));
  // console.log(startDay);
  // const endDay = endOfDay(new Date(date));
  // console.log(endDay);

  const momentStartDay = moment(new Date(date))
    .startOf('day')
    .toISOString()
    .split('T')[0];
  console.log(momentStartDay);
  const momentEndDay = moment(new Date(date))
    .endOf('day')
    .toISOString()
    .split('T')[0];
  console.log(momentEndDay);

  const workouts = await Workout.find({
    user: req.user.id,
    createdAt: { $gte: momentStartDay, $lte: momentEndDay },
  }).populate({
    path: 'sets',
    select: 'muscle exercise reps weight',
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
