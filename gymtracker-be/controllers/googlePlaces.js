const axios = require('axios');
const asyncHandler = require('../middleware/async');

// @desc      Get gyms from user location, in a specified radius
// @route     GET /api/v1/findgym
// @access    Private
exports.getGyms = asyncHandler(async (req, res, next) => {
  try {
    const { lat, lng, radius, keyword, key } = req.query;

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=gym&location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${key}`;
    const { data } = await axios.get(url);

    res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    });
  } catch (err) {
    next(err);
  }
});
