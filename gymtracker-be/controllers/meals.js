const moment = require('moment');
const ErrorResponse = require('../utils/errorResponse'); // custom error handler
const asyncHandler = require('../middleware/async'); // custom async handler to avoid repeating the try/catch code on each async middleware
const Meal = require('../models/Meal');

// @desc      Create new meal
// @route     POST /api/v1/meals
// @access    Private
exports.createMeal = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const meal = await Meal.create(req.body);

  res.status(201).json({
    success: true,
    data: meal,
  });
});

// @desc      Get all meals
// @route     GET /api/v1/meals/
// @access    Private
exports.getMeals = asyncHandler(async (req, res) => {
  const date = req.query.date;

  const startDay = moment(new Date(date)).startOf('day');
  const endDay = moment(new Date(date)).endOf('day');

  const meals = await Meal.find({
    user: req.user.id,
    createdAt: { $gte: startDay, $lte: endDay },
  });

  res.status(200).json({
    succes: true,
    count: meals.length,
    data: meals,
  });
});

// @desc      Get meal by ID
// @route     GET /api/v1/meals/:id
// @access    Private
exports.getMeal = asyncHandler(async (req, res, next) => {
  const meal = await Meal.findById(req.params._id).populate({
    path: 'foods',
    select: 'name qty cals',
  });

  if (!meal) {
    return next(
      new ErrorResponse(`No meal found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is meal owner
  if (meal.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to get this meal`,
        401
      )
    );
  }

  res.status(200).json({ success: true, data: meal });
});

// @desc      Update meal
// @route     PUT /api/v1/meals/:id
// @access    Private
exports.updateMeal = asyncHandler(async (req, res, next) => {
  let meal = await Meal.findById(req.params._id);

  if (!meal) {
    return next(
      new ErrorResponse(`meal not found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is meal owner
  if (meal.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User ${req.user._id} is not authorized to update this meal`,
        401
      )
    );
  }

  meal = await Meal.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: meal });
});

// @desc      Delete meal
// @route     DELETE /api/v1/meals/:id
// @access    Private
exports.deleteMeal = asyncHandler(async (req, res, next) => {
  const meal = await Meal.findById(req.params._id);

  if (!meal) {
    return next(
      new ErrorResponse(`meal not found with id of ${req.params._id}`, 404)
    );
  }

  // Make sure user is meal owner
  if (meal.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        `User with id ${req.user._id} is not authorized to delete this meal`,
        401
      )
    );
  }

  meal.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
