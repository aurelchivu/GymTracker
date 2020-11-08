const ErrorResponse = require('../utils/errorResponse'); // custom error handler
const asyncHandler = require('../middleware/async'); // custom async handler to avoid repeating the try/catch code on each async middleware
const Meal = require('../models/Meal');

// @desc      Get all meals
// @route     GET /api/v1/meals
// @access    Private
exports.getMeals = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single meal
// @route     GET /api/v1/meals/:id
// @access    Private
exports.getMeal = asyncHandler(async (req, res, next) => {
  const meal = await Meal.findById(req.params.id);

  if (!meal) {
    return next(
      new ErrorResponse(`meal not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: meal });
});

// @desc      Create new meal
// @route     POST /api/v1/meals
// @access    Private
exports.createMeal = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const meal = await Meal.create(req.body);
  
  res.status(201).json({
    success: true,
    data: meal
  });
});

// @desc      Update meal
// @route     PUT /api/v1/meals/:id
// @access    Private
exports.updateMeal = asyncHandler(async (req, res, next) => {
  let meal = await Meal.findById(req.params.id);

  if (!meal) {
    return next(
      new ErrorResponse(`meal not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is meal owner
  if (meal.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this meal`,
        401
      )
    );
  }

  meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: meal });
});

// @desc      Delete meal
// @route     DELETE /api/v1/meals/:id
// @access    Private
exports.deletemeal = asyncHandler(async (req, res, next) => {
  const meal = await Meal.findById(req.params.id);

  if (!meal) {
    return next(
      new ErrorResponse(`meal not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is meal owner
  if (meal.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this meal`,
        401
      )
    );
  }

  meal.remove();

  res.status(200).json({ success: true, data: {} });
});

