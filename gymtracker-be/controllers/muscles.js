const ErrorResponse = require('../utils/errorResponse'); // custom error handler
const asyncHandler = require('../middleware/async'); // custom async handler to avoid repeating the try/catch code on each async middleware
const Muscle = require('../models/Muscle');

// @desc      Create new muscle
// @route     POST /api/v1/muscles
// @access    Private
exports.createMuscle = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const muscle = await Muscle.create(req.body);

  res.status(201).json({
    success: true,
    data: muscle,
  });
});

// @desc      Get all muscles
// @route     GET /api/v1/muscles/
// @access    Private
exports.getMuscles = asyncHandler(async (req, res) => {
  const muscle = await Muscle.find({ user: req.user.id }).populate({
    path: 'sets',
    select: 'exercise reps weight',
    path: 'measurements',
    select: 'value',
  });

  res.status(200).json({
    succes: true,
    count: muscle.length,
    data: muscle,
  });
});

// @desc      Get muscle by ID
// @route     GET /api/v1/muscles/:id
// @access    Private
exports.getMuscle = asyncHandler(async (req, res, next) => {
  const muscle = await Muscle.findById(req.params._id).populate({
    path: 'sets',
    select: 'exercise reps weight',
    path: 'measurements',
    select: 'value',
  });

  if (!muscle) {
    return next(
      new ErrorResponse(`No muscle found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is muscle owner
  if (muscle.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to get this muscle`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: muscle });
});

// @desc      Update muscle
// @route     PUT /api/v1/muscles/:id
// @access    Private
exports.updateMuscle = asyncHandler(async (req, res, next) => {
  let muscle = await Muscle.findById(req.params._id);

  if (!muscle) {
    return next(
      new ErrorResponse(`muscle not found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is muscle owner
  if (muscle.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to update this muscle`,
        401
      )
    );
  }

  muscle = await Workout.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: muscle });
});

// @desc      Delete muscle
// @route     DELETE /api/v1/muscles/:id
// @access    Private
exports.deleteMuscle = asyncHandler(async (req, res, next) => {
  const muscle = await Muscle.findById(req.params._id);

  if (!muscle) {
    return next(
      new ErrorResponse(`muscle not found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is muscle owner
  if (muscle.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User with id ${req.user._id} is not authorized to delete this muscle`,
        401
      )
    );
  }

  muscle.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
