const express = require("express")
const passport = require("passport")
const Models = require("../models/models")

const router = express.Router()
const Movies = Models.Movie

// Get all movies
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movies.find()
    res.status(200).json(movies)
  } catch (error) {
    console.error("Error fetching movies:", error)
    res.status(500).json({ message: "Error fetching movies", error: error.message })
  }
})

// Get movie by title
router.get("/:Title", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movie = await Movies.findOne({ Title: req.params.Title })

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" })
    }

    res.json(movie)
  } catch (error) {
    console.error("Error fetching movie:", error)
    res.status(500).json({ message: "Error fetching movie", error: error.message })
  }
})

// Get movies by genre
router.get("/genres/:genreName", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movies.find({
      "Genre.Name": new RegExp(req.params.genreName, "i"),
    })
    res.json(movies)
  } catch (error) {
    console.error("Error fetching genre:", error)
    res.status(500).json({ message: "Error fetching genre", error: error.message })
  }
})

// Get movies by director
router.get("/directors/:directorName", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const movies = await Movies.find({
      "Director.Name": new RegExp(req.params.directorName, "i"),
    })
    res.json(movies)
  } catch (error) {
    console.error("Error fetching director:", error)
    res.status(500).json({ message: "Error fetching director", error: error.message })
  }
})

module.exports = router
