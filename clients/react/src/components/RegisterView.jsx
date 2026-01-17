"use client";

import { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.API_URL || "http://localhost:8080";

export const RegisterView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Attempting registration with:", {
      username,
      email,
      hasBirthday: !!birthday,
    });

    const data = {
      username,
      password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("Registration response status:", response.status);
        if (!response.ok) {
          return response
            .json()
            .then((data) => {
              console.error("Registration error details:", data);
              throw new Error(
                data.message || `HTTP error! Status: ${response.status}`
              );
            })
            .catch((err) => {
              throw new Error(`HTTP error! Status: ${response.status}`);
            });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registration successful:", data);
        alert("Registration successful! Please log in.");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert(`Registration failed: ${error.message}`);
      });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <Card className="auth-card">
          <Card.Body>
            <Card.Title className="text-center mb-4">
              Register for Nick's Flix
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5"
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBirthday" className="mb-3">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};
