const express = require('express');
const {
  createSet,
  getSets,
  getSet,
  updateSet,
  deleteSet,
} = require('../controllers/sets');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router.use(protect);

router
  .route('/')
  .post(protect, createSet)
  .get(protect, getSets);

router
  .route('/:id')
  .get(protect, getSet)
  .put(protect, updateSet)
  .delete(protect, deleteSet);

module.exports = router;
