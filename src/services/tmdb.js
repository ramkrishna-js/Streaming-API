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
    // Default language to en-US if not provided
    if (!params.language) {
      params.language = 'en-US';
    }

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
          return new Error('Resource not found');
        case 429:
          return new Error('TMDB API rate limit exceeded');
        default:
          return new Error(`TMDB API error: ${message}`);
      }
    }
    return new Error('Network error');
  }

  // --- MOVIE METHODS ---

  async searchMovies(query, page = 1, language = 'en-US') {
    return this.request('/search/movie', {
      query,
      page,
      language,
      include_adult: false
    });
  }

  async getMovieDetails(movieId, language = 'en-US') {
    return this.request(`/movie/${movieId}`, {
      language,
      append_to_response: 'videos,credits,recommendations,reviews'
    });
  }

  async getPopularMovies(page = 1, language = 'en-US') {
    return this.request('/movie/popular', { page, language });
  }

  async getTrendingMovies(timeWindow = 'day', page = 1, language = 'en-US') {
    return this.request(`/trending/movie/${timeWindow}`, { page, language });
  }

  async getUpcomingMovies(page = 1, language = 'en-US') {
    return this.request('/movie/upcoming', { page, language });
  }

  async getNowPlayingMovies(page = 1, language = 'en-US') {
    return this.request('/movie/now_playing', { page, language });
  }

  async getTopRatedMovies(page = 1, language = 'en-US') {
    return this.request('/movie/top_rated', { page, language });
  }

  async getMovieCredits(movieId, language = 'en-US') {
    return this.request(`/movie/${movieId}/credits`, { language });
  }

  async getMovieVideos(movieId, language = 'en-US') {
    return this.request(`/movie/${movieId}/videos`, { language });
  }

  async getSimilarMovies(movieId, page = 1, language = 'en-US') {
    return this.request(`/movie/${movieId}/similar`, { page, language });
  }

  async getRecommendedMovies(movieId, page = 1, language = 'en-US') {
    return this.request(`/movie/${movieId}/recommendations`, { page, language });
  }

  async getMovieReviews(movieId, page = 1, language = 'en-US') {
    return this.request(`/movie/${movieId}/reviews`, { page, language });
  }

  async getMovieGenres(language = 'en-US') {
    return this.request('/genre/movie/list', { language });
  }

  async getMoviesByGenre(genreId, page = 1, language = 'en-US') {
    return this.request('/discover/movie', {
      with_genres: genreId,
      page,
      language,
      include_adult: false,
      sort_by: 'popularity.desc'
    });
  }

  async getMovieWatchProviders(movieId, language = 'en-US') {
    return this.request(`/movie/${movieId}/watch/providers`, { language });
  }

  async discoverMovies(params = {}) {
    // Defaults are handled by TMDB if omitted, but we ensure structure
    return this.request('/discover/movie', {
      include_adult: false,
      ...params
    });
  }

  // --- TV SHOW METHODS ---

  async searchTV(query, page = 1, language = 'en-US') {
    return this.request('/search/tv', {
      query,
      page,
      language,
      include_adult: false
    });
  }

  async getTVDetails(tvId, language = 'en-US') {
    return this.request(`/tv/${tvId}`, {
      language,
      append_to_response: 'videos,credits,recommendations,reviews'
    });
  }

  async getPopularTV(page = 1, language = 'en-US') {
    return this.request('/tv/popular', { page, language });
  }

  async getTrendingTV(timeWindow = 'day', page = 1, language = 'en-US') {
    return this.request(`/trending/tv/${timeWindow}`, { page, language });
  }

  async getTopRatedTV(page = 1, language = 'en-US') {
    return this.request('/tv/top_rated', { page, language });
  }

  async getOnTheAirTV(page = 1, language = 'en-US') {
    return this.request('/tv/on_the_air', { page, language });
  }

  async getAiringTodayTV(page = 1, language = 'en-US') {
    return this.request('/tv/airing_today', { page, language });
  }

  async getTVCredits(tvId, language = 'en-US') {
    return this.request(`/tv/${tvId}/credits`, { language });
  }

  async getTVVideos(tvId, language = 'en-US') {
    return this.request(`/tv/${tvId}/videos`, { language });
  }

  async getTVReviews(tvId, page = 1, language = 'en-US') {
    return this.request(`/tv/${tvId}/reviews`, { page, language });
  }

  async getTVSimilar(tvId, page = 1, language = 'en-US') {
    return this.request(`/tv/${tvId}/similar`, { page, language });
  }

  async getTVRecommendations(tvId, page = 1, language = 'en-US') {
    return this.request(`/tv/${tvId}/recommendations`, { page, language });
  }

  async getTVGenres(language = 'en-US') {
    return this.request('/genre/tv/list', { language });
  }

  async getTVByGenre(genreId, page = 1, language = 'en-US') {
    return this.request('/discover/tv', {
      with_genres: genreId,
      page,
      language,
      include_adult: false,
      sort_by: 'popularity.desc'
    });
  }

  async getTVSeasonDetails(tvId, seasonNumber, language = 'en-US') {
    return this.request(`/tv/${tvId}/season/${seasonNumber}`, {
      language,
      append_to_response: 'videos,credits'
    });
  }

  async getTVEpisodeDetails(tvId, seasonNumber, episodeNumber, language = 'en-US') {
    return this.request(`/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`, {
      language,
      append_to_response: 'videos,credits'
    });
  }

  async getTVWatchProviders(tvId, language = 'en-US') {
    return this.request(`/tv/${tvId}/watch/providers`, { language });
  }

  async discoverTV(params = {}) {
    return this.request('/discover/tv', {
      include_adult: false,
      ...params
    });
  }

  // --- GENERAL / PEOPLE / COLLECTIONS METHODS ---

  async multiSearch(query, page = 1, language = 'en-US') {
    return this.request('/search/multi', {
      query,
      page,
      language,
      include_adult: false
    });
  }

  async searchPeople(query, page = 1, language = 'en-US') {
    return this.request('/search/person', {
      query,
      page,
      language,
      include_adult: false
    });
  }

  async getPersonDetails(personId, language = 'en-US') {
    return this.request(`/person/${personId}`, {
      language,
      append_to_response: 'movie_credits,tv_credits,images'
    });
  }

  async getTrendingPeople(timeWindow = 'day', page = 1, language = 'en-US') {
    return this.request(`/trending/person/${timeWindow}`, { page, language });
  }

  async getCollectionDetails(collectionId, language = 'en-US') {
    return this.request(`/collection/${collectionId}`, { language });
  }
}

module.exports = new TMDBService();