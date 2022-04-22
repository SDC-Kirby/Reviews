const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/reviews/', controllers.get);

module.exports = router;
