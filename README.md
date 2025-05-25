# Culinary Connect

## Project Overview
Culinary Connect is a full-stack web application that provides recipe browsing, meal planning, and user authentication features.

## Project Structure

### Frontend
- Located in the `src` directory.
- Built with React and TypeScript.
- Uses Vite as the build tool.
- Organized into components, pages, context, services, and types.
- Scripts for development, build, and start are defined in `package.json`.

### Backend
- Located in the `backend` directory.
- Built with Flask (Python).
- Uses JSON files in `backend/data` to store recipes, users, and meal plans.
- Main backend app is `backend/app.py` which defines API routes.
- Dependencies listed in `backend/requirements.txt`.

### Public Assets
- Located in the `public` directory.

### Configuration
- Configuration files for TypeScript, ESLint, Tailwind CSS, PostCSS, and Vite are present at the root.

## Setup Instructions

### Frontend
1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```

### Backend
1. Install dependencies:
   ```
   pip install -r backend/requirements.txt
   ```
2. Start the Flask server:
   ```
   cd backend
   flask run
   ```

### Start Both Frontend and Backend Concurrently
Run the following command in the project root:
```
npm run start
```

## API Endpoints
- `/api/recipes` - Get, create recipes
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/meal-plans` - Manage meal plans
- `/api/user/recipes/<user_id>` - Get user recipes
- `/api/user/favorites/<user_id>` - Get user favorites

