const express = require('express');
const { getBodyParts } = require('../controllers/bodyParts');

const router = express.Router();

router.route('/').get(getBodyParts);

module.exports = router;
