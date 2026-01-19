require("dotenv").config()
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const passport = require("./config/passport")
const connectDatabase = require("./config/database")
const authRoutes = require("./middleware/auth")
const userRoutes = require("./routes/users")
const movieRoutes = require("./routes/movies")

const app = express()

// Environment validation
const requiredEnvVars = ["CONNECTION_URI", "JWT_SECRET"]
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName])

if (missingEnvVars.length > 0) {
  console.error("✗ Missing required environment variables:", missingEnvVars.join(", "))
  console.error("Please check your .env file")
  process.exit(1)
}

// Configuration
const PORT = process.env.PORT || 8080
const NODE_ENV = process.env.NODE_ENV || "development"
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:1234", "http://localhost:4200", "http://localhost:3000"]

// Connect to database
connectDatabase()

// Middleware
app.use(helmet()) // Security headers
app.use(morgan(NODE_ENV === "development" ? "dev" : "combined")) // Logging
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// CORS Configuration 
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, curl)
      if (!origin) return callback(null, true)

      if (allowedOrigins.includes(origin) || NODE_ENV === "development") {
        callback(null, true)
      } else {
        callback(new Error(`CORS policy does not allow access from origin: ${origin}`))
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Length", "X-Request-Id"],
    maxAge: 600, // Cache preflight for 10 minutes
  }),
)

// Explicit OPTIONS handling for all routes
app.options("*", cors())

// Initialize Passport
app.use(passport.initialize())

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Movie API",
    version: "2.0.0",
    endpoints: {
      auth: "/login",
      users: "/users",
      movies: "/movies",
    },
  })
})

// Auth routes
authRoutes(app)

// API routes
app.use("/users", userRoutes)
app.use("/movies", movieRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message)
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(NODE_ENV === "development" && { stack: err.stack }),
  })
})

// Start server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("\n🚀 Movie API Server")
  console.log(`✓ Environment: ${NODE_ENV}`)
  console.log(`✓ Server running on port ${PORT}`)
  console.log(`✓ CORS enabled for: ${allowedOrigins.join(", ")}\n`)
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server")
  server.close(() => {
    console.log("HTTP server closed")
    process.exit(0)
  })
})
