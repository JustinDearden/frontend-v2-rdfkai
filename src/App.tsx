import { routeTree } from './routeTree.gen';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import './App.scss';
import Navbar from './components/Navbar';
import { SelectedProductProvider } from './context/SelectedProductContext';
import { ApplicationProvider } from './context/ApplicationContext';

const router = createRouter({ routeTree });

function App() {
  return (
    <ApplicationProvider>
      <SelectedProductProvider>
        <Navbar />
        <RouterProvider router={router} />
      </SelectedProductProvider>
    </ApplicationProvider>
  );
}

export default App;
