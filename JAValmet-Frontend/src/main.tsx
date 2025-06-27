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
import Profile from './pages/profile';
import Settings from './pages/settings';
import Logout from './pages/logout';

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
    path: "/dashboard/:boardId",
    element:
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
      <Settings />
    </App>
  },
    { 
    path: "/logout",
    element: <Logout />
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
