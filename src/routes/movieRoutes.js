const express = require('express');
const rateLimit = require('express-rate-limit');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Rate limiting for TMDB API protection
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
router.get('/search', movieController.searchMovies);
router.get('/discover', movieController.discoverMovies);

// Lists
router.get('/popular/list', movieController.getPopularMovies);
router.get('/trending/list', movieController.getTrendingMovies);
router.get('/upcoming/list', movieController.getUpcomingMovies);
router.get('/now_playing/list', movieController.getNowPlayingMovies);
router.get('/top_rated/list', movieController.getTopRatedMovies);

// Genres
router.get('/genres/list', movieController.getMovieGenres);
router.get('/genre/:genreId', movieController.getMoviesByGenre);

// Details
router.get('/:id', movieController.getMovieDetails);
router.get('/:id/credits', movieController.getMovieCredits);
router.get('/:id/videos', movieController.getMovieVideos);
router.get('/:id/similar', movieController.getSimilarMovies);
router.get('/:id/recommendations', movieController.getRecommendedMovies);
router.get('/:id/reviews', movieController.getMovieReviews);
router.get('/:id/providers', movieController.getWatchProviders);

module.exports = router;