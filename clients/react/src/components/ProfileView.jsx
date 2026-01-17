"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Container, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_URL = process.env.API_URL || "http://localhost:8080";

export const ProfileView = ({ user: userProp }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    Email: "",
    Birthday: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      let currentUser = userProp;
      if (!currentUser) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            currentUser = JSON.parse(storedUser);
          } catch (e) {
            console.error("Error parsing stored user:", e);
          }
        }
      }

      const username = currentUser?.Username || currentUser?.username;
      const token = localStorage.getItem("token");

      console.log("Current user:", currentUser);
      console.log("Extracted username:", username);
      console.log("Token exists:", !!token);

      if (!username) {
        console.log("No username found, skipping fetch");
        setLoading(false);
        return;
      }

      if (!token) {
        console.log("No token found");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching user data for:", username);
        const response = await fetch(`${API_URL}/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received user data:", data);
        setUserData(data);
        setEditForm({
          Email: data.Email || "",
          Birthday: data.Birthday ? data.Birthday.split("T")[0] : "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userProp]);

  const handleRemoveFromWatchlist = async (movieId) => {
    const token = localStorage.getItem("token");
    if (!token || !userData) return;

    try {
      console.log("Removing movie from watchlist:", movieId);
      const response = await fetch(
        `${API_URL}/users/${userData.username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedUser = await response.json();
      console.log("Updated user after removal:", updatedUser);
      setUserData(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
      alert("Failed to remove movie from watchlist");
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !userData) return;

    try {
      console.log("Updating user profile");
      const response = await fetch(`${API_URL}/users/${userData.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await response.json();
      console.log("Profile updated successfully:", updatedUser);
      setUserData(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setShowEditModal(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message || "Failed to update profile");
    }
  };

  const currentUser =
    userProp ||
    (() => {
      try {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    })();

  const username = currentUser?.Username || currentUser?.username;
  const token = localStorage.getItem("token");

  if (!username || !token) {
    return (
      <Container className="profile-view mt-5">
        <h2 className="mb-4">User Profile</h2>
        <p>Please log in to view your profile.</p>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="profile-view mt-5">
        <h2 className="mb-4">User Profile</h2>
        <p>Loading user data...</p>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container className="profile-view mt-5">
        <h2 className="mb-4">User Profile</h2>
        <p>Failed to load user data. Please try refreshing the page.</p>
      </Container>
    );
  }

  return (
    <div className="profile-view">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Profile</h2>
        <Button variant="primary" onClick={() => setShowEditModal(true)}>
          Edit Profile
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <p>
            <strong>Email:</strong> {userData.Email}
          </p>
          {userData.Birthday && (
            <p>
              <strong>Birthday:</strong>{" "}
              {new Date(userData.Birthday).toLocaleDateString()}
            </p>
          )}
        </Card.Body>
      </Card>

      <h3 className="mt-5 mb-4">Your Watchlist</h3>
      {userData.Watchlist && userData.Watchlist.length > 0 ? (
        <div className="watchlist grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {userData.Watchlist.map((movie) => (
            <Card key={movie._id} className="h-100">
              <Link to={`/movies/${movie._id}`}>
                <Card.Img
                  variant="top"
                  src={movie.ImagePath}
                  alt={`${movie.Title} Poster`}
                />
              </Link>
              <Card.Body className="d-flex flex-column">
                <Card.Title className="flex-grow-1">{movie.Title}</Card.Title>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveFromWatchlist(movie._id)}
                >
                  Remove from Watchlist
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center py-4">
          You have not added any movies to your watchlist yet.
        </p>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={editForm.Email}
                onChange={(e) =>
                  setEditForm({ ...editForm, Email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={editForm.Birthday}
                onChange={(e) =>
                  setEditForm({ ...editForm, Birthday: e.target.value })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string,
    username: PropTypes.string,
    Email: PropTypes.string,
  }),
};
