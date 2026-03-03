# NicksFlix — Architecture Overview

## System Design

NicksFlix is a **polyglot microservice** application composed of three independent layers that communicate over HTTP.

```
┌─────────────────────────┐        ┌──────────────────────────┐
│   Clients               │        │   Recommender Service    │
│                         │        │   Python / FastAPI       │
│  React (Parcel)         │        │   services/recommender/  │
│  Angular                │◄──────►│   :8000                  │
│  Next.js (portfolio)    │        │                          │
└────────────┬────────────┘        └───────────┬──────────────┘
             │                                 │
             ▼                                 ▼
┌─────────────────────────┐        ┌──────────────────────────┐
│   REST API              │        │   MongoDB Atlas          │
│   Node.js / Express     │◄──────►│   movies collection      │
│   backend/              │        │   users collection       │
│   :8080                 │        │                          │
└─────────────────────────┘        └──────────────────────────┘
```

---

## Services

### 1. Express REST API (`backend/`)

| Concern       | Detail                                              |
|---------------|-----------------------------------------------------|
| Runtime       | Node.js 20, Express 4                               |
| Auth          | JWT via Passport.js (`passport-jwt`)                |
| Database      | MongoDB via Mongoose ODM                            |
| Port          | 8080                                                |

**Key routes:**

| Method | Path                              | Description                  |
|--------|-----------------------------------|------------------------------|
| POST   | `/login`                          | Issue JWT token              |
| GET    | `/movies`                         | List all movies (JWT)        |
| GET    | `/movies/:Title`                  | Single movie by title (JWT)  |
| GET    | `/movies/genres/:name`            | Movies by genre (JWT)        |
| GET    | `/movies/directors/:name`         | Movies by director (JWT)     |
| POST   | `/users`                          | Register new user            |
| PUT    | `/users/:username`                | Update profile (JWT)         |
| DELETE | `/users/:username`                | Delete account (JWT)         |
| POST   | `/users/:id/watchlist/:movieId`   | Add to watchlist (JWT)       |
| DELETE | `/users/:id/watchlist/:movieId`   | Remove from watchlist (JWT)  |
| POST   | `/users/:id/ratings/:movieId`     | Rate a movie 1–5 (JWT)       |
| DELETE | `/users/:id/ratings/:movieId`     | Remove a rating (JWT)        |

---

### 2. Recommender Microservice (`services/recommender/`)

| Concern       | Detail                                              |
|---------------|-----------------------------------------------------|
| Runtime       | Python 3.12, FastAPI, Uvicorn                       |
| ML            | scikit-learn (CountVectorizer + cosine similarity)  |
| Database      | Direct pymongo connection (read-only)               |
| Port          | 8000                                                |

**Algorithm — Content-Based Filtering (Phase 1):**

1. Fetch the requesting user's `Ratings` array (explicit 1–5 stars) and `Watchlist` (implicit positive signal, treated as score 3/5).
2. Build a genre "taste document" by repeating genre tokens weighted by score.
3. Vectorise all unseen movie genres with `CountVectorizer`.
4. Rank unseen movies by cosine similarity to the taste document.
5. Return top-N results with a `confidence` score (0.0–1.0).

**Cold-start fallback:** Users with no ratings or watchlist receive the curated `Featured` movies list.

**Planned — Collaborative Filtering (Phase 2):** Once enough ratings data is collected, a user–item matrix (sparse) will be factorised using SVD to enable "users like you also liked…" recommendations.

---

### 3. Clients

| Client     | Stack                            | Location               |
|------------|----------------------------------|------------------------|
| React      | React 18, Parcel, Bootstrap      | `clients/react/`       |
| Angular    | Angular 17, RxJS                 | `clients/angular/`     |
| Portfolio  | Next.js 15, Tailwind, shadcn/ui  | `app/` (root)          |

All clients authenticate against the Express API and receive a JWT stored in memory/sessionStorage for subsequent requests.

---

## Data Models

### Movie
```js
{
  Title: String,
  Description: String,
  Genre: { Name: String, Description: String },
  Director: { Name: String, Bio: String, Birthday: Date, Deathday: Date },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
}
```

### User
```js
{
  username: String,        // unique
  password: String,        // bcrypt hashed
  Email: String,           // unique
  Birthday: Date,
  Watchlist: [ObjectId],   // refs to Movie
  Ratings: [{
    movie: ObjectId,       // ref to Movie
    score: Number,         // 1–5
    ratedAt: Date,
  }],
}
```

---

## Why Polyglot?

- **Node.js/Express** is idiomatic for JSON REST APIs with Mongoose schemas — fast to iterate, mature ecosystem.
- **Python/FastAPI** is the de-facto standard for ML workloads. scikit-learn, NumPy, and future libraries (PyTorch, LightFM) live naturally here.
- **Separation of concerns** means the recommendation logic can be rewritten, retrained, or scaled independently without touching the core API or any client.
- This pattern mirrors production architectures at companies like Netflix, Spotify, and Airbnb — making it a strong portfolio talking point.

---

## Local Development

```bash
# 1. Start MongoDB (Atlas or local)

# 2. Start Express API
cd backend
cp .env.example .env   # fill in CONNECTION_URI and JWT_SECRET
npm install
npm start              # → http://localhost:8080

# 3. Start Recommender
cd services/recommender
cp .env.example .env   # fill in CONNECTION_URI and MONGO_DB_NAME
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python main.py         # → http://localhost:8000

# 4. Interactive API docs
open http://localhost:8000/docs   # FastAPI Swagger UI
```

---

## Deployment Targets (Phase 4)

| Service       | Target                        |
|---------------|-------------------------------|
| Express API   | Render, Railway, or Fly.io    |
| Recommender   | Render (Docker), Fly.io       |
| Clients       | Vercel                        |
| Database      | MongoDB Atlas (shared tier)   |
