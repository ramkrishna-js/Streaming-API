# 🎬 Streaming-API

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A powerful streaming API for real-time movie data processing and delivery using The Movie Database (TMDB) API.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 | Movie search functionality |
| 🎬 | Popular and trending movies |
| 📊 | Detailed movie information |
| 👥 | Cast and crew details |
| 🎥 | Videos and trailers |
| ⚡ | Fast and lightweight |
| 🛡️ | Rate limiting and error handling |
| 📖 | Comprehensive API documentation |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ramkrishna-js/Streaming-API.git
cd Streaming-API

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Start the server
npm start
```

Server runs at: **http://localhost:3000**

---

## 📡 API Endpoints

### Movie Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies/search?q={query}` | Search movies by title |
| GET | `/api/movies/{id}` | Get movie details |

### Popular Movies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies/popular` | Get popular movies |
| GET | `/api/movies/trending` | Get trending movies |
| GET | `/api/movies/upcoming` | Get upcoming movies |

### Movie Details
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies/{id}/credits` | Get cast and crew |
| GET | `/api/movies/{id}/videos` | Get trailers and videos |

---

## 📖 API Examples

### Search Movies

```bash
GET /api/movies/search?q=batman
```

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": 268,
        "title": "The Dark Knight",
        "overview": "When the menace known as the Joker...",
        "release_date": "2008-07-16",
        "poster_path": "/qJ2tW6WMUDux911r6m7h66oaTjM.jpg"
      }
    ]
  },
  "pagination": { "page": 1, "total_pages": 10, "total_results": 200 }
}
```

### Get Movie Details

```bash
GET /api/movies/268
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 268,
    "title": "The Dark Knight",
    "overview": "When the menace known as the Joker...",
    "release_date": "2008-07-16",
    "runtime": 152,
    "vote_average": 8.5,
    "genres": ["Action", "Crime", "Drama"]
  }
}
```

---

## ⚡ Rate Limiting & Caching

| Feature | Limit |
|---------|-------|
| Requests per minute | 40 |
| Cache duration | 5 minutes |
| Rate limit header | `X-RateLimit-Remaining` |

---

## 🔧 Environment Variables

```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=3000
NODE_ENV=production
```

---

## 📦 Requirements

- Node.js v18+
- npm or yarn
- [TMDB API Key](https://www.themoviedb.org/settings/api)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for movie data
- [Express.js](https://expressjs.com/) for the web framework
- [axios](https://axios-http.com/) for HTTP requests

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ramkrishna-js">ramkrishna-js</a>
</p>
