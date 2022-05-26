import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Investments from './pages/Investments';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Withdrawals from './pages/Withdrawals';
import Withdraw from './pages/Withdraw';
import Invest from "./pages/Invest";
import RegSuccess from './pages/RegSuccess';
import ResetPassword from './pages/ResetPassword';
import DashboardApp from './pages/DashboardApp';
import Team from './pages/Team';
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
        { path: 'team/:id', element: <Team/> },
        { path: 'withdrawals/:id', element: <Withdrawals /> },
        { path: 'investments/:id', element: <Investments  /> },
        { path: 'invest/:id', element: <Invest  /> },
        { path: 'withdraw/:id', element: <Withdraw  /> },
      ],
    },
    {
      children: [
        { path: 'login/users', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '/', element: <Home /> },
    {path: '/register/user/:id', element: <Register/>},
    {path: '/verify/user/:id', element: <Verify/>},
    {path: '/resetpassword/user/:id', element: <ResetPassword/>},
    {path: '/regsuccess/user/:id', element: <RegSuccess/>},
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
