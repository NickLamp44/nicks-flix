"""
main.py — FastAPI entry point for the NicksFlix recommender microservice.

Endpoints
---------
GET  /health                      — liveness check
GET  /recommend/{user_id}         — content-based recommendations
GET  /recommend/{user_id}?top_n=5 — limit results
"""

import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from models import RecommendationResponse
from recommender import get_recommendations

load_dotenv()

app = FastAPI(
    title="NicksFlix Recommender",
    description="Content-based movie recommendation microservice",
    version="1.0.0",
)

# Allow the Express backend (and any local dev client) to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten this in production
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "service": "nicksflix-recommender"}


@app.get("/recommend/{user_id}", response_model=RecommendationResponse)
def recommend(
    user_id: str,
    top_n: int = Query(default=10, ge=1, le=50, description="Number of recommendations to return"),
):
    """
    Return top-N movie recommendations for a given user.

    Uses content-based filtering on genre signals derived from the user's
    explicit Ratings (1-5 stars) and implicit Watchlist membership.
    Falls back to Featured movies for cold-start users with no history.
    """
    try:
        result = get_recommendations(user_id, top_n=top_n)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Recommendation error: {str(exc)}")

    return result


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
