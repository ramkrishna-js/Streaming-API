require('dotenv').config();
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./src/routes/movieRoutes');
const tvRoutes = require('./src/routes/tvRoutes');
const personRoutes = require('./src/routes/personRoutes');
const searchRoutes = require('./src/routes/searchRoutes');
const collectionRoutes = require('./src/routes/collectionRoutes');
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
    message: 'Streaming API is running',
    timestamp: new Date().toISOString(),
    version: '1.1.0'
  });
});

// API routes
app.use('/api/movies', movieRoutes);
app.use('/api/tv', tvRoutes);
app.use('/api/people', personRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/collections', collectionRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Streaming API',
    version: '1.2.0',
    endpoints: {
      movies: {
        'GET /api/movies/search?q={query}': 'Search movies by title',
        'GET /api/movies/discover': 'Advanced movie discovery',
        'GET /api/movies/{id}': 'Get movie details',
        'GET /api/movies/popular/list': 'Get popular movies',
        'GET /api/movies/trending/list?time_window=day|week': 'Get trending movies',
        'GET /api/movies/upcoming/list': 'Get upcoming movies',
        'GET /api/movies/now_playing/list': 'Get now playing movies',
        'GET /api/movies/top_rated/list': 'Get top rated movies',
        'GET /api/movies/genres/list': 'Get movie genres',
        'GET /api/movies/genre/{genreId}': 'Get movies by genre',
        'GET /api/movies/{id}/credits': 'Get movie credits',
        'GET /api/movies/{id}/videos': 'Get movie videos',
        'GET /api/movies/{id}/similar': 'Get similar movies',
        'GET /api/movies/{id}/recommendations': 'Get recommended movies',
        'GET /api/movies/{id}/reviews': 'Get movie reviews',
        'GET /api/movies/{id}/providers': 'Get watch providers'
      },
      tv: {
        'GET /api/tv/search?q={query}': 'Search TV shows',
        'GET /api/tv/discover': 'Advanced TV show discovery',
        'GET /api/tv/{id}': 'Get TV show details',
        'GET /api/tv/popular/list': 'Get popular TV shows',
        'GET /api/tv/trending/list?time_window=day|week': 'Get trending TV shows',
        'GET /api/tv/top_rated/list': 'Get top rated TV shows',
        'GET /api/tv/on_the_air/list': 'Get TV shows on the air',
        'GET /api/tv/airing_today/list': 'Get TV shows airing today',
        'GET /api/tv/genres/list': 'Get TV genres',
        'GET /api/tv/genre/{genreId}': 'Get TV shows by genre',
        'GET /api/tv/{id}/credits': 'Get TV credits',
        'GET /api/tv/{id}/videos': 'Get TV videos',
        'GET /api/tv/{id}/similar': 'Get similar TV shows',
        'GET /api/tv/{id}/recommendations': 'Get recommended TV shows',
        'GET /api/tv/{id}/reviews': 'Get TV reviews',
        'GET /api/tv/{id}/providers': 'Get watch providers',
        'GET /api/tv/{id}/season/{season_number}': 'Get TV season details',
        'GET /api/tv/{id}/season/{season_number}/episode/{episode_number}': 'Get TV episode details'
      },
      people: {
        'GET /api/people/search?q={query}': 'Search people',
        'GET /api/people/trending': 'Get trending people',
        'GET /api/people/{id}': 'Get person details'
      },
      collections: {
        'GET /api/collections/{id}': 'Get collection details'
      },
      search: {
        'GET /api/search/multi?q={query}': 'Multi-search (Movies, TV, People)'
      },
      system: {
        'GET /health': 'Health check'
      }
    }
  });
});

// Handle 404 errors
app.use(notFoundHandler);

// Handle other errors
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Streaming API running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  
  if (!process.env.TMDB_API_KEY) {
    console.error('⚠️  WARNING: TMDB_API_KEY environment variable is not set');
    console.error('   Please set your TMDB API key in the .env file');
  }
});

module.exports = app;