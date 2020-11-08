const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Measurement = require('../models/Measurement');
const Muscle = require('../Models/muscle');

// @desc      Get measurements
// @route     GET /api/v1/measurements
// @route     GET /api/v1/muscles/:muscleId/measurements
// @access    Public
exports.getMeasurements = asyncHandler(async (req, res, next) => {
  if (req.params.muscleId) {
    const measurements = await Measurement.find({ muscle: req.params.muscleId });

    return res.status(200).json({
      success: true,
      count: measurements.length,
      data: measurements
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single measurement
// @route     GET /api/v1/measurements/:id
// @access    Public
exports.getMeasurement = asyncHandler(async (req, res, next) => {
  const measurement = await Measurement.findById(req.params.id).populate({
    path: 'muscle',
    select: 'name description'
  });

  if (!measurement) {
    return next(
      new ErrorResponse(`No measurement with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: measurement
  });
});

// @desc      Add measurement
// @route     POST /api/v1/muscles/:muscleId/measurements
// @access    Private
exports.addMeasurement = asyncHandler(async (req, res, next) => {
  req.body.muscle = req.params.muscleId;
  req.body.user = req.user.id;

  const muscle = await Muscle.findById(req.params.muscleId);

  if (!muscle) {
    return next(
      new ErrorResponse(
        `No muscle with the id of ${req.params.muscleId}`,
        404
      )
    );
  }

  // Make sure user is muscle owner
  if (muscle.user.toString() !== req.user.id && req.user.role !== 'admin') {
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
    data: measurement
  });
});

// @desc      Update measurement
// @route     PUT /api/v1/measurements/:id
// @access    Private
exports.updateMeasurement = asyncHandler(async (req, res, next) => {
  let measurement = await Measurement.findById(req.params.id);

  if (!measurement) {
    return next(
      new ErrorResponse(`No measurement with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is measurement owner
  if (measurement.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update measurement ${measurement._id}`,
        401
      )
    );
  }

  measurement = await Measurement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  measurement.save();

  res.status(200).json({
    success: true,
    data: measurement
  });
});

// @desc      Delete measurement
// @route     DELETE /api/v1/measurements/:id
// @access    Private
exports.deleteMeasurement = asyncHandler(async (req, res, next) => {
  const measurement = await Measurement.findById(req.params.id);

  if (!measurement) {
    return next(
      new ErrorResponse(`No measurement with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is measurement owner
  if (measurement.user.toString() !== req.user.id && req.user.role !== 'admin') {
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
    data: {}
  });
});