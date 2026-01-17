# Nick's Flix - Angular Client

Angular 18 client for the Nick's Flix movie database application.

## Features

- Browse movies with Material Design UI
- User authentication (login/register)
- Manage watchlist
- View movie details (director, synopsis)
- Update user profile

## Prerequisites

- Node.js 20.x or higher
- Angular CLI 18.x
- Backend API running on port 8080

## Installation

```bash
npm install
```

## Development

Start the development server:

```bash
npm start
```

The app will run on `http://localhost:4200`

## Environment Configuration

Update `src/environments/environment.ts` with your API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

## Build

```bash
npm run build
```

Built files will be in the `dist/` directory.
