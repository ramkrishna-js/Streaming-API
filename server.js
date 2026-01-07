require('dotenv').config();
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./src/routes');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Movie Streaming API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
app.use('/api/movies', movieRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Movie Streaming API',
    version: '1.0.0',
    endpoints: {
      'GET /api/movies/search?q={query}': 'Search movies by title',
      'GET /api/movies/{id}': 'Get movie details',
      'GET /api/movies/popular/list': 'Get popular movies',
      'GET /api/movies/trending/list?time_window=day|week': 'Get trending movies',
      'GET /api/movies/upcoming/list': 'Get upcoming movies',
      'GET /api/movies/{id}/credits': 'Get movie credits',
      'GET /api/movies/{id}/videos': 'Get movie videos',
      'GET /health': 'Health check'
    }
  });
});

// Handle 404 errors
app.use(notFoundHandler);

// Handle other errors
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Movie Streaming API running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  
  if (!process.env.TMDB_API_KEY) {
    console.error('⚠️  WARNING: TMDB_API_KEY environment variable is not set');
    console.error('   Please set your TMDB API key in the .env file');
  }
});

module.exports = app;