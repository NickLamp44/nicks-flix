"""
models.py — Pydantic response models for the recommender API.
"""

from pydantic import BaseModel


class RecommendedMovie(BaseModel):
    id: str
    title: str
    genre: str
    image_path: str | None
    featured: bool
    confidence: float  # 0.0 – 1.0 score indicating match strength


class RecommendationResponse(BaseModel):
    user_id: str
    strategy: str  # "content-based" | "watchlist-fallback"
    recommendations: list[RecommendedMovie]
