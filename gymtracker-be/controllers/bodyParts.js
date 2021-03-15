const asyncHandler = require('../middleware/async');
const bodyParts = require('../data/bodyParts')

// @desc      Get body parts from server
// @route     GET /api/v1/bodyParts
// @access    Private
exports.getBodyParts = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: bodyParts,
    });
  } catch (err) {
    next(err);
  }
});
