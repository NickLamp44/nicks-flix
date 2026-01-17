"use client";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { MovieView } from "./MovieView";
import { LoginView } from "./LoginView";
import { RegisterView } from "./RegisterView";
import { NavigationBar } from "./NavigationBar";
import { ProfileView } from "./ProfileView";

const API_URL = process.env.API_URL || "http://localhost:8080";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return null;
  }
};

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    console.error("Invalid token:", e);
    return true;
  }
};

const useFetchMovies = (token) => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!token) {
        console.log("No token found. Skipping fetch.");
        return;
      }

      try {
        const url = `${API_URL}/movies`;
        console.log("Fetching movies from:", url);
        console.log("Using token:", token.substring(0, 20) + "...");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received movies data:", data);
        console.log("Number of movies:", data.length);

        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: movie.Genre?.Name || "Unknown",
          Director: movie.Director?.Name || "Unknown",
          ImagePath: movie.ImagePath,
          Featured: movie.Featured,
        }));
        console.log("Mapped movies:", moviesFromApi);
        setMovies(moviesFromApi);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      }
    };

    fetchMovies();
  }, [token]);

  return { movies, error };
};

export const MainView = () => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { movies, error } = useFetchMovies(token);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      console.warn("Token expired. Logging out.");
      setToken(null);
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <NavigationBar user={user} onLoggedOut={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <MovieList
                    movies={movies}
                    error={error}
                    user={user}
                    token={token}
                    onWatchlistUpdate={(updatedUser) => {
                      setUser(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                    }}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                )
              }
            />

            <Route path="/signup" element={<RegisterView />} />

            <Route
              path="/profile"
              element={
                user ? <ProfileView user={user} /> : <Navigate to="/login" />
              }
            />

            <Route
              path="/movies/:movieId"
              element={
                user ? <MovieView movies={movies} /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

const MovieList = ({ movies, error, user, token, onWatchlistUpdate }) => {
  if (error) {
    return (
      <div className="text-center w-100 py-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (movies === null) {
    return (
      <div className="text-center w-100 py-5">
        <p>Loading movies...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center w-100 py-5">
        <p>The list is empty! Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="movies-grid w-100">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          user={user}
          token={token}
          onWatchlistUpdate={onWatchlistUpdate}
        />
      ))}
    </div>
  );
};
