const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Measurement = require('../models/Measurement');

// @desc      Add measurement to a specific body part
// @route     POST /api/v1/measurements/bodyPart
// @access    Private
exports.createMeasurement = asyncHandler(async (req, res, next) => {
  // Add user and body part to req.body
  req.body.user = req.user.id;

  const measurement = await Measurement.create(req.body);

  res.status(200).json({
    success: true,
    data: measurement,
  });
});

// @desc      Get measurements from a specific body part
// @route     GET /api/v1/measurements/bodyPart
// @access    Private
exports.getMeasurements = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const bodyPart = req.query.bodyPart;

  console.log('req.user.id = ', req.user.id);

  const measurements = await Measurement.find({
    user: req.user.id,
    bodyPart: bodyPart,
  });
  return res.status(200).json({
    success: true,
    count: measurements.length,
    data: measurements,
  });
});

// @desc      Get single measurement from a specific body part
// @route     GET /api/v1/measurements/bodyPart/:id
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

// @desc      Update measurement from a specific body part
// @route     PUT /api/v1/measurements/bodyPart/:id
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

// @desc      Delete measurement from a specific body part
// @route     DELETE /api/v1/measurements/bodyPart/:id
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
