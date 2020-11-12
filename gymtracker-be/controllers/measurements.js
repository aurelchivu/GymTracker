const ErrorResponse = require('../utils/errorResponse'); // custom error handler
const asyncHandler = require('../middleware/async'); // custom async handler to avoid repeating the try/catch code on each async middleware
const Measurement = require('../models/Measurement');

// @desc      Get all measurements
// @route     GET /api/v1/measurements
// @access    Private
exports.getMeasurements = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single measurement
// @route     GET /api/v1/measurements/:id
// @access    Private
exports.getMeasurement = asyncHandler(async (req, res, next) => {
  const measurement = await Measurement.findById(req.params.id);

  if (!measurement) {
    return next(
      new ErrorResponse(`Measurement not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: measurement });
});

// @desc      Create new measurement
// @route     POST /api/v1/measurements
// @access    Private
exports.createMeasurement = asyncHandler(async (req, res, next) => {
  req.body.muscle = req.params.measurement.muscle
  req.body.user = req.user.id;

  const measurement = await Measurement.create(req.body);
  
  res.status(201).json({
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
      new ErrorResponse(`Measurement not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is measurement owner
  if (measurement.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this measurement`,
        401
      )
    );
  }

  measurement = await Measurement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: measurement });
});

// @desc      Delete measurement
// @route     DELETE /api/v1/measurements/:id
// @access    Private
exports.deleteMeasurement = asyncHandler(async (req, res, next) => {
  const measurement = await Measurement.findById(req.params.id);

  if (!measurement) {
    return next(
      new ErrorResponse(`Measurement not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is measurement owner
  if (measurement.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this measurement`,
        401
      )
    );
  }

  measurement.remove();

  res.status(200).json({ success: true, data: {} });
});

