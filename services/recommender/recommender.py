"""
recommender.py — Content-based filtering logic.

Strategy
--------
1. Build a taste profile for the user from their Ratings (weighted by score)
   and their Watchlist (treated as an implicit score of 3.0).
2. Represent every movie as a genre vector using sklearn's CountVectorizer.
3. Compute cosine similarity between the user taste vector and every
   unseen movie.  Return the top-N results with a confidence score.
"""

from __future__ import annotations

from bson import ObjectId
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from db import get_db
from models import RecommendedMovie, RecommendationResponse


def _oid(value) -> ObjectId:
    """Safely convert a string or ObjectId to ObjectId."""
    return value if isinstance(value, ObjectId) else ObjectId(str(value))


def get_recommendations(user_id: str, top_n: int = 10) -> RecommendationResponse:
    db = get_db()
    movies_col = db["movies"]
    users_col = db["users"]

    # ------------------------------------------------------------------ #
    # 1. Fetch user
    # ------------------------------------------------------------------ #
    user = users_col.find_one({"_id": _oid(user_id)})
    if not user:
        raise ValueError(f"User {user_id} not found")

    # ------------------------------------------------------------------ #
    # 2. Build taste profile: {movie_id_str: weight}
    # ------------------------------------------------------------------ #
    taste: dict[str, float] = {}

    # Explicit ratings (score 1-5) — normalise to 0.2 – 1.0
    for entry in user.get("Ratings", []):
        mid = str(entry["movie"])
        taste[mid] = float(entry["score"]) / 5.0

    # Watchlist entries not already rated — treat as implicit 0.6
    for mid in user.get("Watchlist", []):
        key = str(mid)
        if key not in taste:
            taste[key] = 0.6

    # ------------------------------------------------------------------ #
    # 3. Fetch all movies
    # ------------------------------------------------------------------ #
    all_movies = list(movies_col.find())
    if not all_movies:
        return RecommendationResponse(
            user_id=user_id, strategy="content-based", recommendations=[]
        )

    seen_ids = set(taste.keys())
    unseen = [m for m in all_movies if str(m["_id"]) not in seen_ids]

    if not unseen:
        # User has seen everything — return featured movies as fallback
        fallback = [
            RecommendedMovie(
                id=str(m["_id"]),
                title=m.get("Title", ""),
                genre=m.get("Genre", {}).get("Name", ""),
                image_path=m.get("ImagePath"),
                featured=bool(m.get("Featured", False)),
                confidence=0.5,
            )
            for m in all_movies
            if m.get("Featured")
        ]
        return RecommendationResponse(
            user_id=user_id, strategy="watchlist-fallback", recommendations=fallback[:top_n]
        )

    # ------------------------------------------------------------------ #
    # 4. Vectorise genres with CountVectorizer
    # ------------------------------------------------------------------ #
    def genre_text(movie: dict) -> str:
        return movie.get("Genre", {}).get("Name", "unknown").lower().replace(" ", "_")

    # Build a weighted "document" for the user's taste profile
    if taste:
        seen_movies = [m for m in all_movies if str(m["_id"]) in seen_ids]
        taste_tokens: list[str] = []
        for m in seen_movies:
            weight = taste[str(m["_id"])]
            # Repeat the genre token proportional to the weight (1–5 times)
            repeat = max(1, round(weight * 5))
            taste_tokens.extend([genre_text(m)] * repeat)
        user_doc = " ".join(taste_tokens)
    else:
        # Cold-start: no ratings or watchlist — return featured movies
        fallback = [
            RecommendedMovie(
                id=str(m["_id"]),
                title=m.get("Title", ""),
                genre=m.get("Genre", {}).get("Name", ""),
                image_path=m.get("ImagePath"),
                featured=bool(m.get("Featured", False)),
                confidence=0.5,
            )
            for m in all_movies
            if m.get("Featured")
        ]
        return RecommendationResponse(
            user_id=user_id, strategy="watchlist-fallback", recommendations=fallback[:top_n]
        )

    unseen_docs = [genre_text(m) for m in unseen]
    corpus = [user_doc] + unseen_docs

    vectorizer = CountVectorizer()
    matrix = vectorizer.fit_transform(corpus)
    sims = cosine_similarity(matrix[0:1], matrix[1:]).flatten()

    # ------------------------------------------------------------------ #
    # 5. Rank and return top-N
    # ------------------------------------------------------------------ #
    ranked_indices = np.argsort(sims)[::-1][:top_n]
    recommendations: list[RecommendedMovie] = []
    for i in ranked_indices:
        m = unseen[i]
        recommendations.append(
            RecommendedMovie(
                id=str(m["_id"]),
                title=m.get("Title", ""),
                genre=m.get("Genre", {}).get("Name", ""),
                image_path=m.get("ImagePath"),
                featured=bool(m.get("Featured", False)),
                confidence=round(float(sims[i]), 4),
            )
        )

    return RecommendationResponse(
        user_id=user_id, strategy="content-based", recommendations=recommendations
    )
