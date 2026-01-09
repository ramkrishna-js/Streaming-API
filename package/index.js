const StreamingClient = require('./src/client');

/**
 * Factory function to create a new StreamingClient instance
 * @param {string} apiKey - Your TMDB API Key
 * @param {Object} options - Configuration options
 * @returns {StreamingClient}
 */
function createClient(apiKey, options) {
  return new StreamingClient(apiKey, options);
}

module.exports = {
  StreamingClient,
  createClient
};
