const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Food = require('../models/Food');
const Meal = require('../models/Meal');

// @desc      Add food to a specific meal
// @route     POST /api/v1/meals/:mealId/foods
// @access    Private
exports.createFood = asyncHandler(async (req, res, next) => { 
  // Add user and meal to req.body
  req.body.user = req.user.id;
  req.body.meal = req.params.mealId;

  const meal = await Meal.findById(req.params.mealId);

  if (!meal) {
    return next(
      new ErrorResponse(`No meal with the id of ${req.params.mealId}`),
      404
    );
  }

  // Make sure user is meal owner
  if (meal.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a food to meal ${meal._id}`,
        401
      )
    );
  }

  const food = await Food.create(req.body);

  res.status(200).json({
    success: true,
    data: food
  });
});

// @desc      Get foods from a specific meal
// @route     GET /api/v1/meals/:mealId/foods
// @access    Private
exports.getFoods = asyncHandler(async (req, res, next) => {
  if (req.params.mealId) {
    const foods = await Food.find({ meal: req.params.mealId, user: req.user.id });
    return res.status(200).json({
      success: true,
      count: foods.length,
      data: foods
    });
  }
});

// @desc      Get single food from a specific meal
// @route     GET /api/v1/meals/:mealId/foods/:id
// @access    Private
exports.getFood = asyncHandler(async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return next(
      new ErrorResponse(`No food found with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is food owner
  if (food.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update food ${food._id}`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: food
  });
});



// @desc      Update food from a specific meal
// @route     PUT /api/v1/meals/:mealId/foods/:id
// @access    Private
exports.updateFood = asyncHandler(async (req, res, next) => {
  let food = await Food.findById(req.params.id);

  if (!food) {
    return next(
      new ErrorResponse(`No food with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is food owner
  if (food.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update food ${food._id}`,
        401
      )
    );
  }

  food = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: food
  });
});

// @desc      Delete food from a specific meal
// @route     DELETE /api/v1/meals/:mealId/foods/:id
// @access    Private
exports.deleteFood = asyncHandler(async (req, res, next) => {
  const food = await Food.findById(req.params.id);

  if (!food) {
    return next(
      new ErrorResponse(`No food with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is food owner
  if (food.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete food ${food._id}`,
        401
      )
    );
  }

  await food.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
