import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import LoginPage from './pages/login';

import './i18n';
import { ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import theme from './theme';
import App from './app';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
<<<<<<< HEAD
import Profile from './pages/profile';
=======
import Logout from './pages/logout';
>>>>>>> origin/refactor

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/home",
    element:
      <App>
        <Home />
      </App>
  }, {
    path: "/dashboard/:id",
    element:
<<<<<<< HEAD
    <App>
      <Dashboard />
    </App>
  },
  {
    path: "/profile",
    element:
    <App>
      <Profile />
    </App>
  },
  {
    path: "/settings",
    element:
    <App>
      <Profile />
    </App>
=======
      <App>
        <Dashboard />
      </App>
  },
  {
    path: "/logout",
    element: <Logout />
>>>>>>> origin/refactor
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)
