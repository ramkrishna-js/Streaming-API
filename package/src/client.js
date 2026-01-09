const axios = require('axios');
const NodeCache = require('node-cache');

class StreamingClient {
  /**
   * Initialize the Streaming SDK
   * @param {string} apiKey - Your TMDB API Key
   * @param {Object} options - Configuration options
   * @param {number} options.cacheTTL - Cache time to live in seconds (default: 300)
   * @param {Object} options.cache - Custom cache implementation with get(key) and set(key, value)
   */
  constructor(apiKey, options = {}) {
    if (!apiKey) {
      throw new Error('TMDB API Key is required to initialize the SDK');
    }

    this.apiKey = apiKey;
    this.baseURL = 'https://api.themoviedb.org/3';
    this.imageBaseURL = 'https://image.tmdb.org/t/p/';
    
    // Support for custom cache store
    this.cache = options.cache || new NodeCache({ stdTTL: options.cacheTTL || 300 });
  }

  async request(endpoint, params = {}) {
    if (!params.language) {
      params.language = 'en-US';
    }

    const cacheKey = `${endpoint}:${JSON.stringify(params)}`;
    const cached = await this.cache.get(cacheKey);
    
    if (cached) return cached;

    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        params: {
          api_key: this.apiKey,
          ...params
        }
      });

      await this.cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw this._handleError(error);
    }
  }

  _handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.status_message || error.message;
      return new Error(`TMDB SDK Error [${status}]: ${message}`);
    }
    return new Error(`TMDB SDK Network Error: ${error.message}`);
  }

  // --- IMAGE HELPER ---
  images = {
    /**
     * Generate a full image URL
     * @param {string} path - The image path (e.g., /abcd.jpg)
     * @param {string} size - The size (e.g., w500, original)
     * @returns {string|null} Full URL
     */
    getUrl: (path, size = 'original') => {
      if (!path) return null;
      return `${this.imageBaseURL}${size}${path}`;
    }
  };

  // --- MOVIES ---
  movies = {
    search: (query, page = 1, language = 'en-US') => 
      this.request('/search/movie', { query, page, language }),
    
    getDetails: (id, language = 'en-US') => 
      this.request(`/movie/${id}`, { language, append_to_response: 'videos,credits,recommendations,reviews,external_ids,release_dates,keywords' }),
    
    getPopular: (page = 1, language = 'en-US') => 
      this.request('/movie/popular', { page, language }),
    
    getTrending: (timeWindow = 'day', page = 1, language = 'en-US') => 
      this.request(`/trending/movie/${timeWindow}`, { page, language }),

    getUpcoming: (page = 1, language = 'en-US') =>
      this.request('/movie/upcoming', { page, language }),

    getNowPlaying: (page = 1, language = 'en-US') =>
      this.request('/movie/now_playing', { page, language }),

    getTopRated: (page = 1, language = 'en-US') =>
      this.request('/movie/top_rated', { page, language }),
    
    getGenres: (language = 'en-US') => 
      this.request('/genre/movie/list', { language }),
    
    discover: (params = {}) => 
      this.request('/discover/movie', params),

    getWatchProviders: (id, language = 'en-US') =>
      this.request(`/movie/${id}/watch/providers`, { language }),

    getSimilar: (id, page = 1, language = 'en-US') =>
      this.request(`/movie/${id}/similar`, { page, language }),

    getRecommendations: (id, page = 1, language = 'en-US') =>
      this.request(`/movie/${id}/recommendations`, { page, language }),

    getReviews: (id, page = 1, language = 'en-US') =>
      this.request(`/movie/${id}/reviews`, { page, language }),

    getKeywords: (id) =>
      this.request(`/movie/${id}/keywords`)
  };

  // --- TV SHOWS ---
  tv = {
    search: (query, page = 1, language = 'en-US') => 
      this.request('/search/tv', { query, page, language }),
    
    getDetails: (id, language = 'en-US') => 
      this.request(`/tv/${id}`, { language, append_to_response: 'videos,credits,recommendations,reviews,external_ids,content_ratings,keywords' }),
    
    getPopular: (page = 1, language = 'en-US') => 
      this.request('/tv/popular', { page, language }),

    getTopRated: (page = 1, language = 'en-US') =>
      this.request('/tv/top_rated', { page, language }),

    getTrending: (timeWindow = 'day', page = 1, language = 'en-US') =>
      this.request(`/trending/tv/${timeWindow}`, { page, language }),

    getAiringToday: (page = 1, language = 'en-US') =>
      this.request('/tv/airing_today', { page, language }),

    getOnTheAir: (page = 1, language = 'en-US') =>
      this.request('/tv/on_the_air', { page, language }),
    
    getSeason: (id, seasonNum, language = 'en-US') => 
      this.request(`/tv/${id}/season/${seasonNum}`, { language, append_to_response: 'videos,credits' }),
    
    getEpisode: (id, seasonNum, epNum, language = 'en-US') => 
      this.request(`/tv/${id}/season/${seasonNum}/episode/${epNum}`, { language, append_to_response: 'videos,credits' }),
    
    getWatchProviders: (id, language = 'en-US') =>
      this.request(`/tv/${id}/watch/providers`, { language }),

    getGenres: (language = 'en-US') =>
      this.request('/genre/tv/list', { language }),

    discover: (params = {}) =>
      this.request('/discover/tv', params)
  };

  // --- PEOPLE ---
  people = {
    search: (query, page = 1, language = 'en-US') => 
      this.request('/search/person', { query, page, language }),
    
    getDetails: (id, language = 'en-US') => 
      this.request(`/person/${id}`, { language, append_to_response: 'movie_credits,tv_credits,images,external_ids,combined_credits' }),
    
    getTrending: (timeWindow = 'day', page = 1, language = 'en-US') => 
      this.request(`/trending/person/${timeWindow}`, { page, language }),

    getPopular: (page = 1, language = 'en-US') =>
      this.request('/person/popular', { page, language })
  };

  // --- GENERAL / SYSTEM ---
  search = {
    multi: (query, page = 1, language = 'en-US') => 
      this.request('/search/multi', { query, page, language }),
    keyword: (query, page = 1) =>
      this.request('/search/keyword', { query, page }),
    company: (query, page = 1) =>
      this.request('/search/company', { query, page })
  };

  collections = {
    getDetails: (id, language = 'en-US') => 
      this.request(`/collection/${id}`, { language }),
    search: (query, page = 1, language = 'en-US') =>
      this.request('/search/collection', { query, page, language })
  };

  find = {
    byId: (id, source, language = 'en-US') =>
      this.request(`/find/${id}`, { external_source: source, language })
  };

  configuration = {
    getAPIConfig: () => this.request('/configuration'),
    getCountries: () => this.request('/configuration/countries'),
    getJobs: () => this.request('/configuration/jobs'),
    getLanguages: () => this.request('/configuration/languages'),
    getPrimaryTranslations: () => this.request('/configuration/primary_translations'),
    getTimezones: () => this.request('/configuration/timezones')
  };

  trending = {
    getAll: (timeWindow = 'day', page = 1) =>
      this.request(`/trending/all/${timeWindow}`, { page })
  };

  // --- UTILS ---
  utils = {
    /**
     * Extract the main YouTube trailer from a videos list
     * @param {Array} videos - Array of video objects from TMDB
     * @returns {string|null} YouTube URL or null
     */
    getYouTubeTrailer: (videos = []) => {
      const trailer = videos.find(v => 
        v.site === 'YouTube' && 
        (v.type === 'Trailer' || v.type === 'Teaser') &&
        v.official === true
      ) || videos.find(v => v.site === 'YouTube' && v.type === 'Trailer');
      
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    },

    /**
     * Extract the director(s) from a credits object
     * @param {Object} credits - Credits object from TMDB
     * @returns {Array} List of director objects
     */
    getDirectors: (credits = {}) => {
      if (!credits.crew) return [];
      return credits.crew.filter(member => member.job === 'Director');
    },

    /**
     * Automatically fetch multiple pages of data
     * @param {Function} method - SDK method to call (e.g., sdk.movies.getPopular)
     * @param {Object} params - Arguments for the method (excluding page)
     * @param {number} maxPages - Maximum pages to fetch
     * @returns {Promise<Array>} Combined results
     */
    paginate: async (method, params = [], maxPages = 2) => {
      let allResults = [];
      for (let i = 1; i <= maxPages; i++) {
        const response = await method(...params, i);
        if (response && response.results) {
          allResults = [...allResults, ...response.results];
          if (i >= response.total_pages) break;
        } else {
          break;
        }
      }
      return allResults;
    }
  };
}

module.exports = StreamingClient;
