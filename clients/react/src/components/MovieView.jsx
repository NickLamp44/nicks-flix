"use client"

import { useParams } from "react-router-dom"
import { Container, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const MovieView = ({ movies }) => {
  const { movieId } = useParams()

  const movie = movies?.find((m) => m._id === movieId)

  if (!movie) {
    return (
      <Container className="mt-5">
        <p>Movie not found</p>
      </Container>
    )
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {movie.Description}
          </Card.Text>
          <Card.Text>
            <strong>Genre:</strong> {movie.Genre}
          </Card.Text>
          <Card.Text>
            <strong>Director:</strong> {movie.Director}
          </Card.Text>
          <Link to="/">
            <Button variant="primary">Back to Movies</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  )
}
