const express = require('express');
const collectionController = require('../controllers/collectionController');

const router = express.Router();

router.get('/:id', collectionController.getCollectionDetails);

module.exports = router;