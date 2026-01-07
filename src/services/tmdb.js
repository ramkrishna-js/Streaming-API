const axios = require('axios');
const NodeCache = require('node-cache');

class TMDBService {
  constructor() {
    this.apiKey = process.env.TMDB_API_KEY;
    this.baseURL = 'https://api.themoviedb.org/3';
    this.cache = new NodeCache({ stdTTL: 300 }); // 5 minute cache
    
    if (!this.apiKey) {
      throw new Error('TMDB_API_KEY environment variable is required');
    }
  }

  async request(endpoint, params = {}) {
    const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          api_key: this.apiKey,
          ...params
        }
      });

      this.cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.message;
      
      switch (status) {
        case 401:
          return new Error('Invalid TMDB API key');
        case 404:
          return new Error('Movie not found');
        case 429:
          return new Error('TMDB API rate limit exceeded');
        default:
          return new Error(`TMDB API error: ${message}`);
      }
    }
    return new Error('Network error');
  }

  async searchMovies(query, page = 1) {
    return this.request('/search/movie', {
      query,
      page,
      include_adult: false
    });
  }

  async getMovieDetails(movieId) {
    return this.request(`/movie/${movieId}`, {
      append_to_response: 'videos,credits,recommendations'
    });
  }

  async getPopularMovies(page = 1) {
    return this.request('/movie/popular', { page });
  }

  async getTrendingMovies(timeWindow = 'day', page = 1) {
    return this.request(`/trending/movie/${timeWindow}`, { page });
  }

  async getUpcomingMovies(page = 1) {
    return this.request('/movie/upcoming', { page });
  }

  async getMovieCredits(movieId) {
    return this.request(`/movie/${movieId}/credits`);
  }

  async getMovieVideos(movieId) {
    return this.request(`/movie/${movieId}/videos`);
  }

  async getSimilarMovies(movieId, page = 1) {
    return this.request(`/movie/${movieId}/similar`, { page });
  }

  async getRecommendedMovies(movieId, page = 1) {
    return this.request(`/movie/${movieId}/recommendations`, { page });
  }
}

module.exports = new TMDBService();