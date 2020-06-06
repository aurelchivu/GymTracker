const express = require('express');
const router = express.Router({ mergeParams: true });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('<h1>This is Express server</h1>');
  });

module.exports = router;
