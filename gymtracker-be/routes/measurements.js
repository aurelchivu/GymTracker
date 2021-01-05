const express = require('express');
const {
  createMeasurement,
  getMeasurements,
  getMeasurement,
  updateMeasurement,
  deleteMeasurement,
} = require('../controllers/measurements');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .post(protect, createMeasurement)
  .get(protect, getMeasurements);

router
  .route('/:id')
  .get(protect, getMeasurement)
  .put(protect, updateMeasurement)
  .delete(protect, deleteMeasurement);

module.exports = router;
