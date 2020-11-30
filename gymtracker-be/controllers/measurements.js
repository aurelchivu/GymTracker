const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Measurement = require('../models/Measurement');
const Muscle = require('../models/Muscle');

// @desc      Add measurement to a specific muscle
// @route     POST /api/v1/muscles/:muscleId/measurements
// @access    Private
exports.createMeasurement = asyncHandler(async (req, res, next) => {
  // Add user and muscle to req.body
  req.body.user = req.user.id;
  req.body.muscle = req.params.muscleId;

  const muscle = await Muscle.findById(req.params.muscleId);

  if (!muscle) {
    return next(
      new ErrorResponse(`No muscle with the id of ${req.params.muscleId}`),
      404
    );
  }

  // Make sure user is muscle owner
  if (muscle.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a measurement to muscle ${muscle._id}`,
        401
      )
    );
  }

  const measurement = await Measurement.create(req.body);

  res.status(200).json({
    success: true,
    data: measurement,
  });
});

// @desc      Get measurements from a specific muscle
// @route     GET /api/v1/muscles/:muscleId/measurements
// @access    Private
exports.getMeasurements = asyncHandler(async (req, res, next) => {
  if (req.params.muscleId) {
    const measurement = await Measurement.find({
      muscle: req.params.muscleId,
      user: req.user.id,
    });
    return res.status(200).json({
      success: true,
      count: measurements.length,
      data: measurement,
    });
  }
});

// @desc      Get single measurement from a specific muscle
// @route     GET /api/v1/muscles/:muscleId/measurements/:id
// @access    Private
exports.getMeasurement = asyncHandler(async (req, res, next) => {
  const measurement = await Measurement.findById(req.params.id);

  if (!measurement) {
    return next(
      new ErrorResponse(`No measurement with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is measurement owner
  if (measurement.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update measurement ${measurement._id}`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: measurement,
  });
});

// @desc      Update measurement from a specific muscle
// @route     PUT /api/v1/muscles/:muscleId/measurements/:id
// @access    Private
exports.updateMeasurement = asyncHandler(async (req, res, next) => {
  let measurement = await Measurement.findById(req.params.id);

  if (!measurement) {
    return next(
      new ErrorResponse(`No measurement with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is measurement owner
  if (measurement.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update measurement ${measurement._id}`,
        401
      )
    );
  }

  measurement = await Measurement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: measurement,
  });
});

// @desc      Delete measurement from a specific muscle
// @route     DELETE /api/v1/muscles/:muscleId/measurements/:id
// @access    Private
exports.deleteMeasurement = asyncHandler(async (req, res, next) => {
  const measurement = await Measurement.findById(req.params.id);

  if (!measurement) {
    return next(
      new ErrorResponse(`No measurement with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is measurement owner
  if (measurement.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete measurement ${measurement._id}`,
        401
      )
    );
  }

  await measurement.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
