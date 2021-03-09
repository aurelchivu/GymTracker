const express = require('express');
const { getGyms } = require('../controllers/googlePlaces');

const router = express.Router();

router.route('/').get(getGyms);

module.exports = router;

// const axios = require('axios');
// const router = require('express').Router();
// module.exports = router;
// const key = 'AIzaSyDx6QiNmIC4DwCVzAwXaOD8On1Q71khDdc';
// router.get('/', async (req, res, next) => {
//   try {
//     const neighborhood = 'chelsea';
//     const borough = 'manhattan';
//     const city = 'new+york+city';
//     const category = 'burgers';
//     const { data } = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=44.42,26.&radius=5000&type=gym&keyword=near&key=AIzaSyDx6QiNmIC4DwCVzAwXaOD8On1Q71khDdc`
//     );
//     res.json(data);
//   } catch (err) {
//     next(err);
//   }
// });
