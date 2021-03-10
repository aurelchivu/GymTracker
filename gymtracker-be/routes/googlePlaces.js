const express = require('express');
const { getGyms } = require('../controllers/googlePlaces');

const router = express.Router();

router.route('/').get(getGyms);

module.exports = router;

