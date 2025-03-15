import './App.scss';
import { SelectedProductProvider } from './context/SelectedProductContext';
import {
  createRouter,
  RouterProvider,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router';
import Navbar from './components/Navbar';
import ScreenOne from './pages/ScreenOne';
import ScreenTwo from './pages/ScreenTwo';
import ScreenApplications from './pages/ScreenApplications';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Outlet />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <ScreenOne />,
});

const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'edit/$appId',
  component: () => <ScreenTwo />,
});

const applicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'applications',
  component: () => <ScreenApplications />,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  editRoute,
  applicationsRoute,
]);

// Create the router
const router = createRouter({ routeTree });

const App = () => {
  return (
    <SelectedProductProvider>
      <RouterProvider router={router} />
    </SelectedProductProvider>
  );
};

export default App;
