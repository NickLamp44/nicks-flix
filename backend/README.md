# Movie API

A RESTful API for managing movies and user watchlists with JWT authentication.

## Features

- User registration and authentication
- JWT-based authorization
- Movie database management
- Personal watchlist functionality
- Genre and director filtering
- Secure password hashing with bcrypt

## Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- Passport.js (Local & JWT strategies)
- bcrypt for password hashing
- Helmet for security headers

## Setup

### Prerequisites

- Node.js 18.x or higher
- MongoDB database (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update your `.env` file with:
   - Your MongoDB connection string
   - A secure JWT secret (generate one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - Your frontend URLs for CORS

### Running the Server

Development mode with auto-restart:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on port 8080 (or the PORT specified in .env).

## API Endpoints

### Authentication

- `POST /login` - Login with username and password
  - Body: `{ "username": "string", "password": "string" }`
  - Returns: `{ "user": {...}, "token": "jwt_token" }`

### Users

- `POST /users` - Register new user
  - Body: `{ "username": "string", "password": "string", "Email": "string", "Birthday": "date" }`
  
- `GET /users/:username` - Get user profile (requires JWT)
  
- `PUT /users/:username` - Update user profile (requires JWT, own profile only)
  
- `DELETE /users/:username` - Delete user account (requires JWT, own account only)

### Watchlist

- `POST /users/:id/watchlist/:movieId` - Add movie to watchlist (requires JWT)
  
- `DELETE /users/:id/watchlist/:movieId` - Remove movie from watchlist (requires JWT)

### Movies

- `GET /movies` - Get all movies (requires JWT)
  
- `GET /movies/:Title` - Get movie by title (requires JWT)
  
- `GET /movies/genres/:genreName` - Get movies by genre (requires JWT)
  
- `GET /movies/directors/:directorName` - Get movies by director (requires JWT)

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are valid for 7 days.

## Deployment

### Railway / Render / Fly.io

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables in the platform dashboard
4. Deploy!

### Environment Variables

Required:
- `CONNECTION_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing

Optional:
- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment mode (development/production)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed CORS origins

## Security Features

- Helmet.js for security headers
- JWT token expiration
- Password hashing with bcrypt (10 rounds)
- CORS protection
- Input validation with express-validator
- User authorization checks

## Development

### Project Structure

```
backend/
├── config/
│   ├── database.js      # MongoDB connection
│   └── passport.js      # Passport strategies
├── middleware/
│   └── auth.js          # Login route & JWT generation
├── models/
│   └── models.js        # Mongoose schemas
├── routes/
│   ├── users.js         # User routes
│   └── movies.js        # Movie routes
├── index.js             # App entry point
├── package.json
├── .env.example
└── README.md
```

## License

ISC
