import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import AssetsHistory from './pages/AssetsHistory';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Withdrawals from './pages/Withdrawals';
import Withdraw from './pages/Withdraw';
import AddAsset from "./pages/AddAsset";
import Deposit from "./pages/Deposit";
import RegSuccess from './pages/RegSuccess';
import Referral from './pages/Referral';
import Activate from './pages/Activate';
import AssetAnalysis from './pages/AssetAnalysis';
import ResetPassword from './pages/ResetPassword';
import DashboardApp from './pages/DashboardApp';
import LeaderBoard from './pages/Leaderboard';
import MyAssets from './pages/MyAssets';
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
        { path: 'leaderboard/:id', element: <LeaderBoard/> },
        { path: 'withdrawals/:id', element: <Withdrawals /> },
        { path: 'deposit/:id', element: <Deposit /> },
        { path: 'myassets/:id', element: <MyAssets /> },
        { path: 'activate/:id', element: <Activate /> },
        { path: 'referral/:id', element: <Referral /> },
        { path: 'assetanalysis/:id', element: <AssetAnalysis /> },
        { path: 'assetshistory/:id', element: <AssetsHistory  /> },
        { path: 'addasset/:id', element: <AddAsset  /> },
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
