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
      const { q: query, page = 1, language } = req.query;
      
      if (!query) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'MISSING_QUERY',
            message: 'Search query is required'
          })
        );
      }

      const response = await tmdbService.searchMovies(query, parseInt(page), language);
      
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
      const { language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const movie = await tmdbService.getMovieDetails(id, language);
      
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
      const { page = 1, language } = req.query;
      const response = await tmdbService.getPopularMovies(parseInt(page), language);
      
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
      const { time_window = 'day', page = 1, language } = req.query;
      
      if (!['day', 'week'].includes(time_window)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_TIME_WINDOW',
            message: 'Time window must be either "day" or "week"'
          })
        );
      }

      const response = await tmdbService.getTrendingMovies(time_window, parseInt(page), language);
      
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
      const { page = 1, language } = req.query;
      const response = await tmdbService.getUpcomingMovies(parseInt(page), language);
      
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

  // Get now playing movies
  async getNowPlayingMovies(req, res) {
    try {
      const { page = 1, language } = req.query;
      const response = await tmdbService.getNowPlayingMovies(parseInt(page), language);
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'NOW_PLAYING_MOVIES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get top rated movies
  async getTopRatedMovies(req, res) {
    try {
      const { page = 1, language } = req.query;
      const response = await tmdbService.getTopRatedMovies(parseInt(page), language);
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'TOP_RATED_MOVIES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get movie credits (cast and crew)
  async getMovieCredits(req, res) {
    try {
      const { id } = req.params;
      const { language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const credits = await tmdbService.getMovieCredits(id, language);
      
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
      const { language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const videos = await tmdbService.getMovieVideos(id, language);
      
      res.json(formatMovieResponse(true, videos));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'MOVIE_VIDEOS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get similar movies
  async getSimilarMovies(req, res) {
    try {
      const { id } = req.params;
      const { page = 1, language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const response = await tmdbService.getSimilarMovies(id, parseInt(page), language);
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'SIMILAR_MOVIES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get recommended movies
  async getRecommendedMovies(req, res) {
    try {
      const { id } = req.params;
      const { page = 1, language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const response = await tmdbService.getRecommendedMovies(id, parseInt(page), language);
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'RECOMMENDED_MOVIES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get movie reviews
  async getMovieReviews(req, res) {
    try {
      const { id } = req.params;
      const { page = 1, language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const response = await tmdbService.getMovieReviews(id, parseInt(page), language);
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'MOVIE_REVIEWS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get movie genres
  async getMovieGenres(req, res) {
    try {
      const { language } = req.query;
      const response = await tmdbService.getMovieGenres(language);
      res.json(formatMovieResponse(true, response.genres));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'MOVIE_GENRES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get movies by genre
  async getMoviesByGenre(req, res) {
    try {
      const { genreId } = req.params;
      const { page = 1, language } = req.query;

      if (!genreId || isNaN(genreId)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_GENRE_ID',
            message: 'Valid genre ID is required'
          })
        );
      }

      const response = await tmdbService.getMoviesByGenre(genreId, parseInt(page), language);
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'MOVIES_BY_GENRE_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get watch providers
  async getWatchProviders(req, res) {
    try {
      const { id } = req.params;
      const { language } = req.query;

      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatMovieResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid movie ID is required'
          })
        );
      }

      const response = await tmdbService.getMovieWatchProviders(id, language);
      res.json(formatMovieResponse(true, response.results));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'WATCH_PROVIDERS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Discover movies
  async discoverMovies(req, res) {
    try {
      const { 
        page = 1, 
        language,
        sort_by,
        year,
        vote_average_gte,
        with_genres,
        with_original_language
      } = req.query;

      const filters = {
        page: parseInt(page),
        language,
        sort_by,
        primary_release_year: year,
        'vote_average.gte': vote_average_gte,
        with_genres,
        with_original_language
      };

      // Remove undefined filters
      Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

      const response = await tmdbService.discoverMovies(filters);
      
      res.json(formatMovieResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatMovieResponse(false, null, null, {
          code: 'DISCOVER_ERROR',
          message: error.message
        })
      );
    }
  }
};

module.exports = movieController;