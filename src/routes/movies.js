const tmdbService = require('../services/tmdb');

const formatMovieResponse = (success, data, pagination = null, error = null) => ({
  success,
  ...(data && { data }),
  ...(pagination && { pagination }),
  ...(error && { error })
});

const movieController = {
  // Search movies by title
  async searchMovies(req, res) {
    try {
      const { q: query, page = 1 } = req.query;
      
      if (!query) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'MISSING_QUERY',
            message: 'Search query is required'
          })
        );
      }

      const response = await tmdbService.searchMovies(query, parseInt(page));
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'SEARCH_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get movie details by ID
  async getMovieDetails(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const movie = await tmdbService.getMovieDetails(id);
      
      res.json(formatMovieResponse(true, movie));
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json(
          formatMovieResponse(false, null, null, {
            code: 'MOVIE_NOT_FOUND',
            message: 'Movie not found'
          })
        );
      }
      
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'MOVIE_DETAILS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get popular movies
  async getPopularMovies(req, res) {
    try {
      const { page = 1 } = req.query;
      const response = await tmdbService.getPopularMovies(parseInt(page));
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'POPULAR_MOVIES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get trending movies
  async getTrendingMovies(req, res) {
    try {
      const { time_window = 'day', page = 1 } = req.query;
      
      if (!['day', 'week'].includes(time_window)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_TIME_WINDOW',
            message: 'Time window must be either "day" or "week"'
          })
        );
      }

      const response = await tmdbService.getTrendingMovies(time_window, parseInt(page));
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'TRENDING_MOVIES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get upcoming movies
  async getUpcomingMovies(req, res) {
    try {
      const { page = 1 } = req.query;
      const response = await tmdbService.getUpcomingMovies(parseInt(page));
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'UPCOMING_MOVIES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get movie credits (cast and crew)
  async getMovieCredits(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const credits = await tmdbService.getMovieCredits(id);
      
      res.json(formatMovieResponse(true, credits));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'MOVIE_CREDITS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get movie videos (trailers, clips, etc.)
  async getMovieVideos(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const videos = await tmdbService.getMovieVideos(id);
      
      res.json(formatMovieResponse(true, videos));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'MOVIE_VIDEOS_ERROR',
          message: error.message
        })
      );
    }
  }
};

module.exports = movieController;