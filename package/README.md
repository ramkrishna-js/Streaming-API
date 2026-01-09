# @ramkrishna-js/streaming-sdk

A lightweight, high-performance Node.js SDK for interacting with The Movie Database (TMDB) API.

## Features

- **TypeScript Support:** Full type definitions for a better developer experience.
- **Dual-Stack:** Supports both CommonJS (`require`) and ESM (`import`).
- **Flexible Caching:** Built-in `node-cache` or provide your own custom cache store (e.g., Redis).
- **Image Helper:** Easy URL generation for movie posters and backdrops.
- **Global Localization:** Support for language parameters on all requests.

## Installation

```bash
npm install @ramkrishna-js/streaming-sdk
```

## Usage (CommonJS)

```javascript
const { createClient } = require('@ramkrishna-js/streaming-sdk');

const sdk = createClient('YOUR_TMDB_API_KEY');
```

## Usage (ESM / TypeScript)

```typescript
import { createClient } from '@ramkrishna-js/streaming-sdk';

const sdk = createClient('YOUR_TMDB_API_KEY', {
  cacheTTL: 600
});

// Image Helper usage
const posterUrl = sdk.images.getUrl('/path_to_poster.jpg', 'w500');

// Extract YouTube Trailer
const movie = await sdk.movies.getDetails(268);
const trailerUrl = sdk.utils.getYouTubeTrailer(movie.videos.results);

// Auto-Pagination (Fetch first 3 pages of popular movies)
const top60 = await sdk.utils.paginate(sdk.movies.getPopular, [], 3);
```

## Custom Cache Store

You can provide your own cache implementation (e.g., for Redis integration):

```javascript
const sdk = createClient('KEY', {
  cache: {
    get: async (key) => myRedis.get(key),
    set: async (key, val) => myRedis.set(key, val, 'EX', 3600)
  }
});
```

## API Documentation

### Movies
- `sdk.movies.search(query, page, language)`
- `sdk.movies.getDetails(id, language)`
- `sdk.movies.getPopular(page, language)`
- `sdk.movies.getTrending(timeWindow, page, language)`
- `sdk.movies.getUpcoming(page, language)`
- `sdk.movies.getTopRated(page, language)`
- `sdk.movies.getGenres(language)`
- `sdk.movies.discover(params)`
- `sdk.movies.getWatchProviders(id, language)`
- `sdk.movies.getSimilar(id, page, language)`

### TV Shows
- `sdk.tv.search(query, page, language)`
- `sdk.tv.getDetails(id, language)`
- `sdk.tv.getPopular(page, language)`
- `sdk.tv.getTopRated(page, language)`
- `sdk.tv.getTrending(timeWindow, page, language)`
- `sdk.tv.getSeason(id, seasonNum, language)`
- `sdk.tv.getEpisode(id, seasonNum, epNum, language)`

### Configuration & Utilities
- `sdk.images.getUrl(path, size)`: Generate full image URLs.
- `sdk.find.byId(id, source, language)`: Find by IMDb/External ID.
- `sdk.configuration.getAPIConfig()`: Get base URLs for images.
- `sdk.trending.getAll(timeWindow, page)`: Get combined trending list.

## License

MIT
