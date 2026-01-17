import Link from "next/link"

export default function ApiDocsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Simple Header */}
      <header className="border-b-2 border-neutral-800 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mt-2">API Documentation</h1>
          <p className="text-sm text-neutral-600 mt-1">Complete reference for the Nick's Flix REST API</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Overview */}
        <section className="bg-white border-2 border-neutral-800 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-neutral-300 pb-2">Overview</h2>
          <p className="mb-4">
            The Nick's Flix API is a RESTful web service that provides access to movie data and user management
            functionality. All endpoints (except registration and login) require JWT authentication.
          </p>
          <div className="bg-neutral-100 p-4 border-l-4 border-blue-600">
            <p className="font-bold mb-1">Base URL:</p>
            <code className="text-sm bg-neutral-800 text-green-400 px-2 py-1">{apiUrl}</code>
          </div>
        </section>

        {/* Authentication */}
        <section className="bg-white border-2 border-neutral-800 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-neutral-300 pb-2">Authentication</h2>
          <p className="mb-4 text-sm">
            Most endpoints require a valid JWT token. Include the token in the Authorization header:
          </p>
          <pre className="bg-neutral-800 text-green-400 p-3 rounded mb-6 text-sm overflow-x-auto">
            Authorization: Bearer YOUR_JWT_TOKEN
          </pre>

          <div className="space-y-6">
            {/* Register */}
            <div className="border-l-4 border-green-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1">POST</span>
                <code className="text-sm font-mono">/users/register</code>
              </div>
              <p className="text-sm mb-2">Register a new user account.</p>
              <p className="text-xs font-bold mb-1">Request Body:</p>
              <pre className="bg-neutral-100 p-3 rounded text-xs overflow-x-auto border border-neutral-300">
                {`{
  "username": "johndoe",
  "password": "SecurePass123!",
  "email": "john@example.com",
  "birthday": "1990-01-15"
}`}
              </pre>
            </div>

            {/* Login */}
            <div className="border-l-4 border-green-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1">POST</span>
                <code className="text-sm font-mono">/users/login</code>
              </div>
              <p className="text-sm mb-2">Login and receive JWT authentication token.</p>
              <p className="text-xs font-bold mb-1">Request Body:</p>
              <pre className="bg-neutral-100 p-3 rounded text-xs overflow-x-auto border border-neutral-300">
                {`{
  "username": "johndoe",
  "password": "SecurePass123!"
}`}
              </pre>
              <p className="text-xs font-bold mt-2 mb-1">Response:</p>
              <pre className="bg-neutral-100 p-3 rounded text-xs overflow-x-auto border border-neutral-300">
                {`{
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Movie Endpoints */}
        <section className="bg-white border-2 border-neutral-800 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-neutral-300 pb-2">Movie Endpoints</h2>
          <p className="text-sm mb-4 text-red-700">⚠️ All movie endpoints require authentication</p>

          <div className="space-y-6">
            {/* Get All Movies */}
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1">GET</span>
                <code className="text-sm font-mono">/movies</code>
              </div>
              <p className="text-sm">Returns all movies in the database.</p>
            </div>

            {/* Get Movie by ID */}
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1">GET</span>
                <code className="text-sm font-mono">/movies/:id</code>
              </div>
              <p className="text-sm">Get a specific movie by its ID.</p>
              <p className="text-xs text-neutral-600 mt-1">Example: /movies/507f1f77bcf86cd799439011</p>
            </div>

            {/* Get Movie by Title */}
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1">GET</span>
                <code className="text-sm font-mono">/movies/title/:title</code>
              </div>
              <p className="text-sm">Search for a movie by its title.</p>
              <p className="text-xs text-neutral-600 mt-1">Example: /movies/title/Inception</p>
            </div>

            {/* Get Movies by Genre */}
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1">GET</span>
                <code className="text-sm font-mono">/movies/genre/:genreName</code>
              </div>
              <p className="text-sm">Get all movies in a specific genre.</p>
              <p className="text-xs text-neutral-600 mt-1">Example: /movies/genre/Drama</p>
            </div>

            {/* Get Movies by Director */}
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1">GET</span>
                <code className="text-sm font-mono">/movies/director/:directorName</code>
              </div>
              <p className="text-sm">Get all movies by a specific director.</p>
              <p className="text-xs text-neutral-600 mt-1">Example: /movies/director/Christopher Nolan</p>
            </div>
          </div>
        </section>

        {/* User Endpoints */}
        <section className="bg-white border-2 border-neutral-800 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-neutral-300 pb-2">User Endpoints</h2>
          <p className="text-sm mb-4 text-red-700">⚠️ All user endpoints require authentication</p>

          <div className="space-y-6">
            {/* Get User Profile */}
            <div className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1">GET</span>
                <code className="text-sm font-mono">/users/:username</code>
              </div>
              <p className="text-sm">Get user profile and watchlist.</p>
            </div>

            {/* Update User Profile */}
            <div className="border-l-4 border-yellow-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-600 text-white text-xs font-bold px-2 py-1">PUT</span>
                <code className="text-sm font-mono">/users/:username</code>
              </div>
              <p className="text-sm mb-2">Update user profile information.</p>
              <p className="text-xs font-bold mb-1">Request Body (all fields optional):</p>
              <pre className="bg-neutral-100 p-3 rounded text-xs overflow-x-auto border border-neutral-300">
                {`{
  "username": "newusername",
  "password": "NewSecurePass123!",
  "email": "newemail@example.com",
  "birthday": "1990-01-15"
}`}
              </pre>
            </div>

            {/* Add to Watchlist */}
            <div className="border-l-4 border-green-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1">POST</span>
                <code className="text-sm font-mono">/users/:username/watchlist/:movieId</code>
              </div>
              <p className="text-sm">Add a movie to user's watchlist.</p>
            </div>

            {/* Remove from Watchlist */}
            <div className="border-l-4 border-red-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1">DELETE</span>
                <code className="text-sm font-mono">/users/:username/watchlist/:movieId</code>
              </div>
              <p className="text-sm">Remove a movie from user's watchlist.</p>
            </div>

            {/* Delete User */}
            <div className="border-l-4 border-red-600 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1">DELETE</span>
                <code className="text-sm font-mono">/users/:username</code>
              </div>
              <p className="text-sm">Delete user account permanently.</p>
            </div>
          </div>
        </section>

        {/* Response Formats */}
        <section className="bg-neutral-100 border-2 border-neutral-800 p-6">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-neutral-300 pb-2">Response Formats</h2>
          <div className="space-y-4">
            <div>
              <p className="font-bold mb-2">Success Response:</p>
              <pre className="bg-neutral-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                {`HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": { ... }
}`}
              </pre>
            </div>
            <div>
              <p className="font-bold mb-2">Error Response:</p>
              <pre className="bg-neutral-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
                {`HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": "Error message here"
}`}
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t-2 border-neutral-800 bg-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-neutral-600">
          <p>
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
