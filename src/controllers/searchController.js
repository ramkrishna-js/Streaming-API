const tmdbService = require('../services/tmdb');

const formatResponse = (success, data, pagination = null, error = null) => ({
  success,
  ...(data && { data }),
  ...(pagination && { pagination }),
  ...(error && { error })
});

const searchController = {
  // Multi-search (Movies, TV, People)
  async multiSearch(req, res) {
    try {
      const { q: query, page = 1, language } = req.query;
      
      if (!query) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'MISSING_QUERY',
            message: 'Search query is required'
          })
        );
      }

      const response = await tmdbService.multiSearch(query, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'MULTI_SEARCH_ERROR',
          message: error.message
        })
      );
    }
  }
};

module.exports = searchController;