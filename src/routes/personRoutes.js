const express = require('express');
const personController = require('../controllers/personController');

const router = express.Router();

router.get('/search', personController.searchPeople);
router.get('/trending', personController.getTrendingPeople);
router.get('/:id', personController.getPersonDetails);

module.exports = router;