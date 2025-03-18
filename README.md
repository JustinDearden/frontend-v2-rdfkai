# Front-End Take Home Challenge

## Submitted by: Justin Dearden

### Running the App

1. Run `npm install`
2. Change `.env.example` to `.env.local`
3. Update `VITE_X_NESTO_CANDIDAT` to be your candidate name
4. Run `npm run dev`
5. Open [http://localhost:5173](http://localhost:5173) with your browser

### Routes

- `/` - Home page
  - Displays product information
  - Select a product to create an empty application
- `/edit/:id` - Edit page
  - Edit the application applicant information
  - Save the application applicant information
- `/edit` - Error page
  - Prompts the user to select a product or application
- `/edit/:invalidID` - Error page
  - Prompts the user to select a valid application
- `/applications` - Applications page
  - Displays all valid applications
  - Select an application to edit the applicant information on `/edit/:id`
- `/invalidRoute` - Error page
  - Prompts the user to select a product or application

### Script Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the production app
- `npm run test` - Run the test suite
- `npm run lint` - Run the linter
- `npm run storybook` - Start the storybook server
- `npm run build-storybook` - Build the storybook app

### Technologies Used

- **React**: Core library for building the app’s UI.
- **Vite**: Bundler and development server for fast builds and hot-module replacement.
- **Storybook**: Used to develop and test UI components in isolation.
- **Vitest**: Runs unit tests for ensuring code quality and functionality.
- **React Query**: Manages server state, caching, and asynchronous API data fetching.
- **React Router**: Handles client-side routing for smooth navigation between pages.
- **React Hook Form**: Simplifies form management with built-in validation and error handling.
- **i18next**: Provides localization support throughout the app.
- **Styled Components / SCSS**: Styles the app using the BEM design conventions for predictable and scalable CSS class naming.
- **Jest / React Testing Library**: Unit tests components and hooks to ensure functionality.
