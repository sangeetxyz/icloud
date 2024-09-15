# iCloud Clone Project

This project is a full-stack clone of Apple's iCloud site. It implements various features including authentication, dashboard, file storage, and notes functionality.

Live URL: https://icloud.sangeet.xyz

## Turborepo Setup

This project uses Turborepo, a high-performance build system for JavaScript and TypeScript codebases. Here's what's included:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by the `web` application
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Tech Stack

- NextJS 14
- TailwindCSS
- Drizzle ORM
- Next Auth
- tRPC
- ShadCN
- Uploadthing
- Supabase Postgres
- [Statera](https://statera.sangeet.xyz)
- Hanko
- Framer Motion

## Setup Instructions

### Prerequisites

- Node.js
- npm

### Steps

1. Clone the repository:

   ```
   git clone [your-repo-url]
   ```

2. Install dependencies:

   ```
   npm install --workspace=web
   ```

3. Set up environment variables:

   - Copy the `.env.example` file to `.env`
   - Fill in the necessary values in the `.env` file

4. Set up the database:

   ```
   npm run db:generate
   npm run db:migrate
   npm run db:push
   ```

5. Start the development server:
   ```
   npm run dev
   ```

Note: We're using `@t3-oss/env-nextjs` package for type-safe environment variables in development mode.

## Available Scripts

- `npm run dev`: Start the development server (with Turbo)
- `npm run build`: Build the project
- `npm run start`: Start the production server
- `npm run lint`: Run linting
- `npm run db:generate`: Generate Drizzle migrations
- `npm run db:migrate`: Run Drizzle migrations
- `npm run db:push`: Push Drizzle schema changes
- `npm run db:studio`: Open Drizzle studio

## Database Schema

The project uses Drizzle ORM with the following main tables:

1. `users`: Stores user information (id, name, email, etc.)
2. `accounts`: Manages authentication accounts
3. `sessions`: Handles user sessions
4. `verificationTokens`: Stores tokens for email verification
5. `notes`: Manages user notes
6. `drives`: Stores information about user's drive files
7. `photos`: Manages user's photo information

Each table includes relationships and indexes for efficient querying. For full schema details, please refer to the `schema.ts` file in the project.

## API Documentation

The documentation for the Fetch Users API is available on the `/docs` route.

### Fetching Users

You can fetch user details via their names and email as requested. The OpenAPI endpoint is implemented using tRPC-openapi with x-api-key authentication.

Example:

```
GET https://localhost:3000/api/users?name=axit
```

Note: For demo purposes, you can use the API key: "iLoveHuddle"

## Implemented Features

1. **Repo Setup**: Using Turborepo for a monorepo setup.

2. **Authentication**:

   - Passwordless sign-in using passkeys
   - Secure user information storage in the database

3. **Dashboard**:

   - Responsive design similar to iCloud
   - User profile section
   - Photos/Images section
   - Drive (document storage) section
   - Notes section

4. **Backend**:

   - Next.js project (app dir) with TypeScript
   - tRPC integration for API routes
   - OpenAPI endpoint using tRPC-openapi with x-api-key auth

5. **Frontend**:

   - Responsive UI mirroring iCloud layout
   - Components for user profile, image gallery, document list, and notes interface

6. **File Storage**:

   - File upload functionality for images and documents
   - File metadata storage in the database
   - Integration with Uploadthing for storage

7. **Notes Feature**:

   - Create, edit, and view notes
   - Notes stored in the database, associated with users
   - Display of notes with titles and timestamps on the dashboard

8. **Integration**:
   - tRPC connection between frontend and backend API
   - Proper error handling and loading states
   - Type safety across the entire application

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
