const express = require('express');
const {LOADER} = require('../../config.js');
const controllers = require('../controllers');

const router = express.Router();

router.get('/reviews/meta/', controllers.meta);
router.get('/reviews/', controllers.get);
router.post('/reviews', controllers.post);
router.put('/reviews/:review_id/helpful', controllers.helpful);
router.put('/reviews/:review_id/report', controllers.report);
router.get('/reviews/loaderio-a3e8135f3c9289061c6536ac6cd049fa/', (req, res) => {
  res.send(LOADER);
});

module.exports = router;
