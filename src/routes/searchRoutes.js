const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.get('/multi', searchController.multiSearch);

module.exports = router;