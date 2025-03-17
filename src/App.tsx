import { SelectedProductProvider } from './context/SelectedProductContext';
import {
  createRouter,
  RouterProvider,
  createRoute,
  createRootRoute,
  Outlet,
} from '@tanstack/react-router';
import Navbar from './components/Navbar';
import EditError from './pages/error/EditError';
import ProductPage from './pages/ProductPage';
import EditApplicationPage from './pages/EditApplicationPage';
import ApplicationsPage from './pages/ApplicationsPage';

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
  component: () => <ProductPage />,
});

const editWithIdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'edit/$appId',
  component: () => <EditApplicationPage />,
});

const editRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'edit',
  component: () => <EditError />,
});

const applicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'applications',
  component: () => <ApplicationsPage />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  editRoute,
  editWithIdRoute,
  applicationsRoute,
]);

const router = createRouter({ routeTree });

const App = () => {
  return (
    <SelectedProductProvider>
      <RouterProvider router={router} />
    </SelectedProductProvider>
  );
};

export default App;
