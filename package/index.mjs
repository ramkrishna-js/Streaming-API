import StreamingClient from './src/client.js';

/**
 * Factory function to create a new StreamingClient instance
 * @param {string} apiKey - Your TMDB API Key
 * @param {Object} options - Configuration options
 * @returns {StreamingClient}
 */
export function createClient(apiKey, options) {
  return new StreamingClient(apiKey, options);
}

export { StreamingClient };
export default {
  StreamingClient,
  createClient
};
