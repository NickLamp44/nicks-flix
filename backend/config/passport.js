const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt
const Models = require("../models/models")

const Users = Models.User

// Local Strategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await Users.findOne({ username: username })

        if (!user) {
          return done(null, false, { message: "Incorrect username" })
        }

        const isValid = user.validatePassword(password)
        if (!isValid) {
          return done(null, false, { message: "Incorrect password" })
        }

        return done(null, user)
      } catch (error) {
        console.error("Error during authentication:", error)
        return done(error)
      }
    },
  ),
)

// JWT Strategy for token-based authentication
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "fallback_secret_for_development",
    },
    async (jwtPayload, done) => {
      try {
        const user = await Users.findById(jwtPayload._id)
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    },
  ),
)

module.exports = passport
