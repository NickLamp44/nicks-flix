const jwt = require("jsonwebtoken")
const passport = require("passport")

const jwtSecret = process.env.JWT_SECRET || "fallback_secret_for_development"

// Generate JWT token for authenticated user
const generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username,
    expiresIn: "7d",
    algorithm: "HS256",
  })
}

// Configure login route
module.exports = (app) => {
  app.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: info?.message || "Invalid username or password",
        })
      }

      req.login(user, { session: false }, (error) => {
        if (error) {
          return res.status(500).json({ message: "Login error", error: error.message })
        }

        const token = generateJWTToken(user.toJSON())
        return res.json({
          user: {
            _id: user._id,
            username: user.username,
            Email: user.Email,
            Birthday: user.Birthday,
            Watchlist: user.Watchlist,
          },
          token,
        })
      })
    })(req, res)
  })
}
