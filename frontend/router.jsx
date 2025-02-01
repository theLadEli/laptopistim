import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SpotDetails from './pages/SpotDetails';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/spots/:id', element: <SpotDetails /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}