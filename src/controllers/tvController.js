const tmdbService = require('../services/tmdb');

const formatResponse = (success, data, pagination = null, error = null) => ({
  success,
  ...(data && { data }),
  ...(pagination && { pagination }),
  ...(error && { error })
});

const tvController = {
  // Search TV shows
  async searchTV(req, res) {
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

      const response = await tmdbService.searchTV(query, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'SEARCH_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get TV details by ID
  async getTVDetails(req, res) {
    try {
      const { id } = req.params;
      const { language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid TV show ID is required'
          })
        );
      }

      const tvShow = await tmdbService.getTVDetails(id, language);
      
      res.json(formatResponse(true, tvShow));
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json(
          formatResponse(false, null, null, {
            code: 'TV_NOT_FOUND',
            message: 'TV show not found'
          })
        );
      }
      
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TV_DETAILS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get popular TV shows
  async getPopularTV(req, res) {
    try {
      const { page = 1, language } = req.query;
      const response = await tmdbService.getPopularTV(parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'POPULAR_TV_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get trending TV shows
  async getTrendingTV(req, res) {
    try {
      const { time_window = 'day', page = 1, language } = req.query;
      
      if (!['day', 'week'].includes(time_window)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_TIME_WINDOW',
            message: 'Time window must be either "day" or "week"'
          })
        );
      }

      const response = await tmdbService.getTrendingTV(time_window, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TRENDING_TV_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get top rated TV shows
  async getTopRatedTV(req, res) {
    try {
      const { page = 1, language } = req.query;
      const response = await tmdbService.getTopRatedTV(parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TOP_RATED_TV_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get on the air TV shows
  async getOnTheAirTV(req, res) {
    try {
      const { page = 1, language } = req.query;
      const response = await tmdbService.getOnTheAirTV(parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'ON_THE_AIR_TV_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get airing today TV shows
  async getAiringTodayTV(req, res) {
    try {
      const { page = 1, language } = req.query;
      const response = await tmdbService.getAiringTodayTV(parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'AIRING_TODAY_TV_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get TV credits
  async getTVCredits(req, res) {
    try {
      const { id } = req.params;
      const { language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid TV show ID is required'
          })
        );
      }

      const credits = await tmdbService.getTVCredits(id, language);
      
      res.json(formatResponse(true, credits));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TV_CREDITS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get TV videos
  async getTVVideos(req, res) {
    try {
      const { id } = req.params;
      const { language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid TV show ID is required'
          })
        );
      }

      const videos = await tmdbService.getTVVideos(id, language);
      
      res.json(formatResponse(true, videos));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TV_VIDEOS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get similar TV shows
  async getTVSimilar(req, res) {
    try {
      const { id } = req.params;
      const { page = 1, language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid TV show ID is required'
          })
        );
      }

      const response = await tmdbService.getTVSimilar(id, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'SIMILAR_TV_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get recommended TV shows
  async getTVRecommendations(req, res) {
    try {
      const { id } = req.params;
      const { page = 1, language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid TV show ID is required'
          })
        );
      }

      const response = await tmdbService.getTVRecommendations(id, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'RECOMMENDED_TV_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get TV reviews
  async getTVReviews(req, res) {
    try {
      const { id } = req.params;
      const { page = 1, language } = req.query;
      
      if (!id || isNaN(id)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid TV show ID is required'
          })
        );
      }

      const response = await tmdbService.getTVReviews(id, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TV_REVIEWS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get TV genres
  async getTVGenres(req, res) {
    try {
      const { language } = req.query;
      const response = await tmdbService.getTVGenres(language);
      res.json(formatResponse(true, response.genres));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TV_GENRES_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get TV shows by genre
  async getTVByGenre(req, res) {
    try {
      const { genreId } = req.params;
      const { page = 1, language } = req.query;

      if (!genreId || isNaN(genreId)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_GENRE_ID',
            message: 'Valid genre ID is required'
          })
        );
      }

      const response = await tmdbService.getTVByGenre(genreId, parseInt(page), language);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TV_BY_GENRE_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get TV season details
  async getTVSeasonDetails(req, res) {
    try {
      const { id, season_number } = req.params;
      const { language } = req.query;
      
      if (!id || isNaN(id) || isNaN(season_number)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_PARAMS',
            message: 'Valid TV ID and season number are required'
          })
        );
      }

      const season = await tmdbService.getTVSeasonDetails(id, season_number, language);
      res.json(formatResponse(true, season));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TV_SEASON_ERROR',
          message: error.message
        })
      );
    }
  },

  // Get TV episode details
  async getTVEpisodeDetails(req, res) {
    try {
      const { id, season_number, episode_number } = req.params;
      const { language } = req.query;
      
      if (!id || isNaN(id) || isNaN(season_number) || isNaN(episode_number)) {
        return res.status(400).json(
          formatResponse(false, null, null, {
            code: 'INVALID_PARAMS',
            message: 'Valid TV ID, season number, and episode number are required'
          })
        );
      }

      const episode = await tmdbService.getTVEpisodeDetails(id, season_number, episode_number, language);
      res.json(formatResponse(true, episode));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'TV_EPISODE_ERROR',
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
          formatResponse(false, null, null, {
            code: 'INVALID_ID',
            message: 'Valid TV show ID is required'
          })
        );
      }

      const response = await tmdbService.getTVWatchProviders(id, language);
      res.json(formatResponse(true, response.results));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'WATCH_PROVIDERS_ERROR',
          message: error.message
        })
      );
    }
  },

  // Discover TV shows
  async discoverTV(req, res) {
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
        first_air_date_year: year,
        'vote_average.gte': vote_average_gte,
        with_genres,
        with_original_language
      };

      // Remove undefined filters
      Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

      const response = await tmdbService.discoverTV(filters);
      
      res.json(formatResponse(true, response.results, {
        page: response.page,
        total_pages: response.total_pages,
        total_results: response.total_results
      }));
    } catch (error) {
      res.status(500).json(
        formatResponse(false, null, null, {
          code: 'DISCOVER_ERROR',
          message: error.message
        })
      );
    }
  }
};

module.exports = tvController;