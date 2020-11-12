const express = require('express');
const {
  getMeasurements,
  getMeasurement,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
} = require('../controllers/measurements');

const Measurement = require('../models/Measurement');
 
const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

// router.use(protect);

router
  .route('/')
  .get(advancedResults(Measurement), getMeasurements)
  .post(createMeasurement);

router
  .route('/:id')
  .get(getMeasurement)
  .put(updateMeasurement)
  .delete(deleteMeasurement);

module.exports = router;
