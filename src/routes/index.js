const express = require('express');
const rateLimit = require('express-rate-limit');
const movieController = require('./movies');

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

// Movie search and details
router.get('/search', movieController.searchMovies);
router.get('/:id', movieController.getMovieDetails);

// Popular and trending movies
router.get('/popular/list', movieController.getPopularMovies);
router.get('/trending/list', movieController.getTrendingMovies);
router.get('/upcoming/list', movieController.getUpcomingMovies);

// Movie additional details
router.get('/:id/credits', movieController.getMovieCredits);
router.get('/:id/videos', movieController.getMovieVideos);

module.exports = router;