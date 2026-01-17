# Quick Setup Guide

## Step 1: Install All Dependencies

From the root directory:

```bash
npm run install:all
```

This will install dependencies for:
- Landing page (Next.js)
- Backend API (Express)
- React client (Parcel)

## Step 2: Configure Backend

1. Generate a JWT secret:
```bash
cd backend
npm run generate-jwt
```

2. Create `backend/.env`:
```env
CONNECTION_URI=your_mongodb_atlas_connection_string
JWT_SECRET=paste_the_generated_secret_here
PORT=8080
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:1234,http://localhost:4200
```

## Step 3: Configure Clients

1. Create `clients/react/.env`:
```env
API_URL=http://localhost:8080
```

2. Create `.env.local` in root:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Step 4: Start Everything

**Easiest method** - One command to rule them all:
```bash
npm run dev:all
```

**Manual method** - Open 3 terminals:

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (React):
```bash
cd clients/react
npm start
```

Terminal 3 (Landing Page):
```bash
npm run dev
```

## Step 5: Access the Apps

- **Landing Page:** http://localhost:3000
- **React Client:** http://localhost:1234
- **Backend API:** http://localhost:8080
- **API Docs:** http://localhost:3000/api-docs

## Troubleshooting

**Backend won't connect to MongoDB:**
- Check your CONNECTION_URI has special characters URL-encoded
- Example: `!` becomes `%21`, `@` becomes `%40`
- Verify your IP is whitelisted in MongoDB Atlas

**React client won't start:**
- Make sure port 1234 is not in use
- Check that `.env` file exists in `clients/react/`

**CORS errors:**
- Verify ALLOWED_ORIGINS in backend `.env` includes all your client URLs
