import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ConfigProvider } from 'antd';
import './index.css';

import { AppProvider } from './context/AppContext';
import App from './App.jsx';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import CarDetail from './pages/CarDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { RequireAuth, RequireAdmin } from './components/Guards';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ManageCars from './admin/ManageCars';
import ManageUsers from './admin/ManageUsers';
import ManageContent from './admin/ManageContent';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/inventory', element: <Inventory /> },
      { path: '/inventory/:id', element: <CarDetail /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        element: <RequireAuth />,
        children: [{ path: '/profile', element: <Profile /> }],
      },
    ],
  },
  {
    element: <RequireAdmin />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'cars', element: <ManageCars /> },
          { path: 'users', element: <ManageUsers /> },
          { path: 'content', element: <ManageContent /> },
        ],
      },
    ],
  },
]);

const theme = {
  token: {
    colorPrimary: '#e0292f',
    borderRadius: 8,
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ConfigProvider>
  </StrictMode>
);
