const axios = require('axios');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const https = require('https');

// @desc      Get places from user location, in a specified radius
// @route     GET /api/v1/places
// @access    Private
exports.getGyms = asyncHandler(async (req, res, next) => {
  try {
    const { lat, lng, radius, keyword, key } = req.query;
    console.log(req.query);

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=gym&location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${key}`;
    // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=gym&location=45.1279766,25.7142248&radius=10000&key=AIzaSyDx6QiNmIC4DwCVzAwXaOD8On1Q71khDdc`;
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
