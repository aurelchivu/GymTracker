const express = require('express');
const { workoutSets } = require('../controllers/workoutSets');

const router = express.Router();

router.route('/').get(workoutSets);

module.exports = router;
