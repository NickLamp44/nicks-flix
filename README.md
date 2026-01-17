# Nick's Flix - Full Stack Movie Database

A full-stack movie database application showcasing both React and Angular client implementations with a shared Express.js backend API.

## Project Structure

```
nicks-flix/
├── app/                    # Next.js landing page
├── backend/                # Express.js API
├── clients/
│   ├── react/             # React client (Port 1234)
│   └── angular/           # Angular client (Port 4200) 
```

## Technologies

- **Backend API:** Express.js, MongoDB, Passport JWT
- **React Client:** React 18, React Router, Bootstrap 5
- **Angular Client:** Angular 17, Material Design
- **Landing Page:** Next.js 16, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. Clone the repository and install all dependencies:

```bash
npm run install:all
```

2. Set up environment variables:

**Backend** (`backend/.env`):
```env
CONNECTION_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
PORT=8080
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:1234,http://localhost:4200
```

**React Client** (`clients/react/.env`):
```env
API_URL=http://localhost:8080
```

**Landing Page** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Running the Application

**Option 1: Run all apps simultaneously**
```bash
npm run dev:all
```

This will start:
- Landing page at http://localhost:3000
- React client at http://localhost:1234
- Backend API at http://localhost:8080

**Option 2: Run apps individually**

Terminal 1 - Landing Page:
```bash
npm run dev
```

Terminal 2 - Backend API:
```bash
npm run dev:backend
```

Terminal 3 - React Client:
```bash
npm run dev:react
```

## API Endpoints

See the API documentation at http://localhost:3000/api-docs when the landing page is running.

## Features

- User authentication with JWT
- Movie browsing and search
- Personal watchlist management
- Dual client implementations (React & Angular)
- RESTful API architecture

## Project Info

This project demonstrates modern full-stack development with:
- Shared backend API serving multiple client frameworks
- Environment-based configuration
- Secure authentication and authorization
- Responsive design across all clients
