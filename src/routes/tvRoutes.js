const express = require('express');
const rateLimit = require('express-rate-limit');
const tvController = require('../controllers/tvController');

const router = express.Router();

// Rate limiting for TMDB API protection (Shared limits with movies)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 40, // 40 requests per minute
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
router.use(limiter);

// Search and Discover
router.get('/search', tvController.searchTV);
router.get('/discover', tvController.discoverTV);

// Lists
router.get('/popular/list', tvController.getPopularTV);
router.get('/trending/list', tvController.getTrendingTV);
router.get('/top_rated/list', tvController.getTopRatedTV);
router.get('/on_the_air/list', tvController.getOnTheAirTV);
router.get('/airing_today/list', tvController.getAiringTodayTV);

// Genres
router.get('/genres/list', tvController.getTVGenres);
router.get('/genre/:genreId', tvController.getTVByGenre);

// Details
router.get('/:id', tvController.getTVDetails);
router.get('/:id/credits', tvController.getTVCredits);
router.get('/:id/videos', tvController.getTVVideos);
router.get('/:id/similar', tvController.getTVSimilar);
router.get('/:id/recommendations', tvController.getTVRecommendations);
router.get('/:id/reviews', tvController.getTVReviews);
router.get('/:id/providers', tvController.getWatchProviders);

// Seasons and Episodes
router.get('/:id/season/:season_number', tvController.getTVSeasonDetails);
router.get('/:id/season/:season_number/episode/:episode_number', tvController.getTVEpisodeDetails);

module.exports = router;