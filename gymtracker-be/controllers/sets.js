const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Set = require('../models/Set');
const Workout = require('../models/Workout');

// @desc      Add set to a specific workout
// @route     POST /api/v1/workouts/:workoutId/sets
// @access    Private
exports.createSet = asyncHandler(async (req, res, next) => {
  // Add user and workout to req.body
  req.body.user = req.user.id;
  req.body.workout = req.params.workoutId;

  const workout = await Workout.findById(req.params.workoutId);

  if (!workout) {
    return next(
      new ErrorResponse(`No workouttttt with the id of ${req.params.workoutId}`),
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

  const set = await Set.create(req.body);

  res.status(200).json({
    success: true,
    data: set,
  });
});

// @desc      Get sets from a specific workout
// @route     GET /api/v1/workouts/:workoutId/sets
// @access    Private
exports.getSets = asyncHandler(async (req, res, next) => {
  if (req.params.workoutId) {
    const sets = await Set.find({
      workout: req.params.workoutId,
      user: req.user.id,
    });
    return res.status(200).json({
      success: true,
      count: sets.length,
      data: sets,
    });
    console.log('data =', data)
  }
});

// @desc      Get single set from a specific workout
// @route     GET /api/v1/workouts/:workoutId/sets/:id
// @access    Private
exports.getSet = asyncHandler(async (req, res, next) => {
  const set = await Set.findById(req.params.id);

  if (!set) {
    return next(
      new ErrorResponse(`No set with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is set owner
  if (set.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update set ${set._id}`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: set,
  });
});



// @desc      Update set from a specific workout
// @route     PUT /api/v1/workouts/:workoutId/sets/:id
// @access    Private
exports.updateSet = asyncHandler(async (req, res, next) => {
  let set = await Set.findById(req.params.id);

  if (!set) {
    return next(
      new ErrorResponse(`No set with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is set owner
  if (set.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update set ${set._id}`,
        401
      )
    );
  }

  set = await Set.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: set,
  });
});

// @desc      Delete set from a specific workout
// @route     DELETE /api/v1/workouts/:workoutId/sets/:id
// @access    Private
exports.deleteSet = asyncHandler(async (req, res, next) => {
  const set = await Set.findById(req.params.id);

  if (!set) {
    return next(
      new ErrorResponse(`No set with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is set owner
  if (set.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete set ${set._id}`,
        401
      )
    );
  }

  await set.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
