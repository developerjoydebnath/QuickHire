# QuickHire Frontend

This is the user-facing web application for QuickHire, built to help users browse jobs, apply for roles, and track their applications.

## Tech Stack

- **Next.js** (v15+)
- **React** (v19)
- **Tailwind CSS** (v4) & **Shadcn UI**
- **Zustand** (Global state management)
- **React Hook Form** + **Zod** (Form validation)

## Prerequisites

- Node.js (v18 or higher recommended)
- The QuickHire Backend server running locally (or available remotely)

## Local Development Setup

1. **Install Dependencies**

   ```bash
   npm install --legacy-peer-deps
   # or npm install if no conflicts
   ```

2. **Environment Variables**
   Create a `.env` (or `.env.local`) file in the frontend root and set the API URL:

   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` - Starts the Next.js development server.
- `npm run build` - Builds the application for production deployment.
- `npm run start` - Runs the production server after building.
- `npm run lint` - Runs ESLint to find code issues.
