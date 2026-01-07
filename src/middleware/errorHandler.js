const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific error types
  if (err.message.includes('TMDB_API_KEY')) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_CONFIGURATION_ERROR',
        message: 'Server configuration error'
      }
    });
  }

  if (err.message.includes('Invalid TMDB API key')) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'TMDB_API_ERROR',
        message: 'TMDB service temporarily unavailable'
      }
    });
  }

  if (err.message.includes('TMDB API rate limit exceeded')) {
    return res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'TMDB API rate limit exceeded, please try again later'
      }
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Internal server error'
    }
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.originalUrl} not found`
    }
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};