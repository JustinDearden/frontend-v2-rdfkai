# Front-End Take Home Challenge

## Submitted by: Justin Dearden

### Vercel Hosted

[https://frontend-v2-rdfkai.vercel.app/](https://frontend-v2-rdfkai.vercel.app/)

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
- **Jest / React Testing Library**: Unit tests components and hooks to ensure functionality.
- **React Query**: Manages server state, caching, and asynchronous API data fetching.
- **React Router**: Handles client-side routing for smooth navigation between pages.
- **React Hook Form**: Simplifies form management with built-in validation and error handling.
- **i18next**: Provides localization support throughout the app.
- **Styled Components / SCSS**: Styles the app using the BEM (Block Element Modifier) design conventions for predictable and scalable CSS class naming.
- **ESLint / Prettier**: For code quality and consistent formatting.

### Accessibility

- Axe Scanner: Automated accessibility testing to ensure compliance with Accessibility for Ontarians with Disabilities Act (AODA) standards

### Additional Features

- **Caching via Products Context:**  
  The app caches products returned from the API using a dedicated Products Context. This ensures that when editing an application, the correct product information is immediately available and displayed without redundant API calls.

- **Skeleton Loaders & API States:**  
  Skeleton loaders are displayed on both the products and edit pages during API calls. The app also handles various states, including API errors, no applications found, and a general "not found" page for undefined routes.

- **Responsive & Mobile-First Design:**  
  The app is fully responsive and scales seamlessly across devices. It utilizes a mobile-first design approach and follows BEM (Block Element Modifier) conventions for predictable and scalable CSS.

- **Language Toggle:**  
  A language toggle is implemented to switch between French and English. Text values are loaded from a translations file. Future improvements include auto-detection of the browser's language setting or storing the language preference in a cookie.

- **Custom Toast Notifications:**  
  A custom Toast component provides user feedback when applicant data is successfully updated on the edit page.

- **Custom Rate Limiter:**  
  A custom rate limiter is applied to the "save applicant info" button to prevent continuous submissions and ensure smoother user interactions.

- **Form Validation:**  
  On the edit page, every field in the form is required and includes custom error messages if left unfilled.

  - The **email field** uses a regex pattern to ensure that the input includes an "@" symbol and a valid domain extension (at least two characters).
  - The **phone field** validates that the input is a ten-digit number and does not accept any alphabetic characters.

- **Filtered Applications Page:**  
  On the Applications Page, only applications with an applicant's email filled out are displayed. Additionally, applications are sorted by the `createdAt` date, with the newest entries appearing first.

- **Responsive Navbar with Custom Hamburger Menu:**  
  On mobile screen sizes, the navbar shifts to display a hamburger menu. This custom component activates a slide-out menu that is fully keyboard accessible and can be dismissed using the Esc key.

- **Unit Tests for Helper Methods:**  
  There are unit tests for the helper methods in `dateFormatter.ts` and `productHelper.ts` to ensure they function correctly.

- **Postman Collection for API:**  
  A Postman collection is included to interface with the API. It features an environment file that allows you to easily switch out variables (e.g., application ID) for testing different scenarios.
