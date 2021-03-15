const asyncHandler = require('../middleware/async');
const workoutSets = require('../data/workoutSets');

// @desc      Get workout sets from server
// @route     GET /api/v1/workoutSets
// @access    Private
exports.workoutSets = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: workoutSets,
    });
  } catch (err) {
    next(err);
  }
});
