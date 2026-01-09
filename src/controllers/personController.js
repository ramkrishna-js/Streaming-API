const tmdbService = require('../services/tmdb');

const formatResponse = (success, data, pagination = null, error = null) => ({
  success,
  ...(data && { data }),
  ...(pagination && { pagination }),
  ...(error && { error })
});

const personController = {
  // Search people
  async searchPeople(req, res) {
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

      const response = await tmdbService.searchPeople(query, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'PERSON_SEARCH_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get person details
  async getPersonDetails(req, res) {
    try {
      const { id } = req.params;
      const { language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid person ID is required'
          })
        );
      }

      const person = await tmdbService.getPersonDetails(id, language);
      res.json(formatResponse(true, person));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'PERSON_DETAILS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get trending people
  async getTrendingPeople(req, res) {
    try {
      const { time_window = 'day', page = 1, language } = req.query;
      const response = await tmdbService.getTrendingPeople(time_window, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TRENDING_PEOPLE_ERROR',
          message: error.message
        })
      );
    }
  }
};

module.exports = personController;