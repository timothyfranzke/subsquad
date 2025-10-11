# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SubSquad is a React application for managing sports team substitutions and game time tracking. It's built with Create React App and uses Firebase for authentication and data storage.

## Development Commands

```bash
# Start development server (opens at http://localhost:3000)
npm start

# Run tests in interactive watch mode
npm test

# Build for production (CI=false prevents treating warnings as errors)
npm run build
```

## Architecture Overview

### App Structure
- **Marketing Site**: Landing page with pricing and features (`/src/marketing-site/`)
- **Main App**: Authenticated application for roster and game management (`/src/app/`)
- **Admin Panel**: Admin-only features accessible at `/admin` route
- **Routing**: Uses React Router with protected routes via `PrivateRoute` and `AdminRoute` components

### Key Application Flow
1. Users land on marketing page (`/`)
2. Authentication via Firebase Auth redirects to `/roster`
3. Users create/manage rosters in Roster Management
4. Game sessions are managed through Game screen with real-time timer
5. Admin features accessible only to `timothyfranzke@gmail.com`

### Authentication & Authorization
- Firebase Auth integration in `src/config/firebase.js`
- Route protection via `PrivateRoute` (requires auth) and `AdminRoute` (requires specific email)
- User session persistence with `onAuthStateChanged` listener

### Data Management
- Firebase Firestore for data persistence
- Local state management with React hooks
- Game state includes roster, timing, swap history, and configuration

### Key Components
- **Game.js**: Core game timer and substitution management with real-time updates
- **RosterManagement.js**: CRUD operations for team rosters with Firebase integration
- **GameList.js**: Navigation between different games/sessions
- **SubHistoryMatrix.js**: Visualization of player substitution patterns
- **ConfigEditor.js**: Game configuration (duration, active player limits, warnings)

### Firebase Configuration
- Uses environment-specific Firebase config in `src/config/firebase.js`
- **Security Note**: Firebase config contains public API keys (this is normal for client-side apps)
- Authentication and Firestore database integration

### Styling
- Tailwind CSS for styling with standard configuration
- Lucide React for icons throughout the application
- Responsive design with mobile-first approach

### Analytics
- Google Analytics integration via `useAnalytics` hook
- Page view tracking and custom event tracking
- gtag integration for user behavior analytics

### Beta Features
- BETA_ROSTER_LIMIT=2 constraint in roster management
- Beta feedback component for user input collection

## Code Conventions
- ES6+ JavaScript (no TypeScript)
- Functional components with React hooks
- Firebase v9+ modular SDK syntax
- Tailwind utility classes for styling
- Lucide icons for consistent icon usage