# Streaming-API

A powerful streaming API for real-time movie data processing and delivery using The Movie Database (TMDB) API.

## Features

- 🔍 Movie search functionality
- 🎬 Popular and trending movies
- 📊 Detailed movie information
- 👥 Cast and crew details
- 🎥 Videos and trailers
- ⚡ Fast and lightweight
- 🛡️ Rate limiting and error handling
- 📖 Comprehensive API documentation

## API Endpoints

### Movie Search
- `GET /api/movies/search?q={query}` - Search for movies by title
- `GET /api/movies/{id}` - Get detailed information about a specific movie

### Popular Movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/upcoming` - Get upcoming movies

### Movie Details
- `GET /api/movies/{id}/credits` - Get cast and crew
- `GET /api/movies/{id}/videos` - Get trailers and videos

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (get one at [TMDB](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository
```bash
git clone https://github.com/ramkrishna-js/Streaming-API.git
cd Streaming-API
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env and add your TMDB API key
```

4. Start the server
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Usage

### Search Movies
```javascript
// Example: Search for "Batman"
GET /api/movies/search?q=batman

Response:
{
  "results": [
    {
      "id": 268,
      "title": "The Dark Knight",
      "overview": "When the menace known as the Joker...",
      "release_date": "2008-07-16",
      "poster_path": "/qJ2tW6WMUDux911r6m7h66oaTjM.jpg"
    }
  ]
}
```

### Get Movie Details
```javascript
// Example: Get details for movie ID 268
GET /api/movies/268

Response:
{
  "id": 268,
  "title": "The Dark Knight",
  "overview": "When the menace known as the Joker...",
  "release_date": "2008-07-16",
  "runtime": 152,
  "vote_average": 8.5,
  "genres": ["Action", "Crime", "Drama"]
}
```

## Response Format

All API responses follow this structure:
```json
{
  "success": true,
  "data": { /* Response data */ },
  "pagination": {
    "page": 1,
    "total_pages": 10,
    "total_results": 200
  }
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "MOVIE_NOT_FOUND",
    "message": "Movie not found"
  }
}
```

## Rate Limiting

- 40 requests per minute per IP address
- TMDB API limits: 40 requests per 10 seconds
- Responses include `X-RateLimit-Remaining` header

## Caching

- API responses are cached for 5 minutes to improve performance
- Reduces TMDB API calls and improves response times

## Environment Variables

```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=3000
NODE_ENV=production
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie data
- [Express.js](https://expressjs.com/) for the web framework
- [axios](https://axios-http.com/) for HTTP requests

## Support

If you encounter any issues or have questions, please open an issue on [GitHub Issues](https://github.com/ramkrishna-js/Streaming-API/issues).

---

Made with ❤️ by [ramkrishna-js](https://github.com/ramkrishna-js)
