import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Products from './pages/Products';
import RegSuccess from './pages/RegSuccess';
import ResetPassword from './pages/ResetPassword';
import DashboardApp from './pages/DashboardApp';
import ReferralLink from './pages/ReferralLink';
import Home from './Home';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app/:id', element: <DashboardApp /> },
        { path: 'user/:id', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'login/users', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {path: '/register/user/:id', element: <Register/>},
    {path: '/verify/user/:id', element: <Verify/>},
    {path: '/resetpassword/user/:id', element: <ResetPassword/>},
    {path: '/regsuccess/user/:id', element: <RegSuccess/>},
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
