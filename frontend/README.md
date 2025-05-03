# Frontend Project

This is a Next.js frontend project that interacts with a backend API to manage user data. The application is structured to provide a user-friendly interface for listing, creating, and editing users.

## Project Structure

- **pages/**: Contains the application's pages.
  - **index.tsx**: The main entry point of the application.
  - **users/**: Directory for user-related pages.
    - **index.tsx**: Displays the User List page.
    - **[id].tsx**: Dynamic route for displaying individual user details.

- **components/**: Contains reusable components.
  - **Layout.tsx**: Provides a consistent layout across different pages.
  - **UserForm.tsx**: Used for creating and editing user information.
  - **UserList.tsx**: Displays the list of users.

- **lib/**: Contains utility functions and validation schemas.
  - **apiClient.ts**: API client functions for interacting with the backend.
  - **validationSchemas.ts**: Zod validation schemas for user data.

- **styles/**: Contains global styles for the application.
  - **globals.css**: Global CSS styles.

- **public/**: Contains static assets.
  - **favicon.ico**: The favicon for the application.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

- **tsconfig.json**: TypeScript configuration file.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```
   cd frontend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

- User List: Fetches and displays a list of users using React Query.
- User Form: Allows for creating and editing user information with validation using Zod.
- Dynamic User Details: Displays individual user details based on the user ID from the URL.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.