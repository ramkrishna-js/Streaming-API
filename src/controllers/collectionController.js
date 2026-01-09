const tmdbService = require('../services/tmdb');

const formatResponse = (success, data, pagination = null, error = null) => ({
  success,
  ...(data && { data }),
  ...(pagination && { pagination }),
  ...(error && { error })
});

const collectionController = {
  // Get collection details
  async getCollectionDetails(req, res) {
    try {
      const { id } = req.params;
      const { language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid collection ID is required'
          })
        );
      }

      const collection = await tmdbService.getCollectionDetails(id, language);
      res.json(formatResponse(true, collection));
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json(
          formatResponse(false, null, null, {
            code: 'COLLECTION_NOT_FOUND',
            message: 'Collection not found'
          })
        );
      }
      
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'COLLECTION_DETAILS_ERROR',
          message: error.message
        })
      );
    }
  }
};

module.exports = collectionController;