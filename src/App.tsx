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
import NotFound from './pages/NotFound';

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

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  editRoute,
  editWithIdRoute,
  applicationsRoute,
  notFoundRoute,
]);

const router = createRouter({ routeTree });

const App = () => {
  return (
    <SelectedProductProvider>
      <h1 className="sr-only">Nesto Rates Application</h1>
      <RouterProvider router={router} />
    </SelectedProductProvider>
  );
};

export default App;
