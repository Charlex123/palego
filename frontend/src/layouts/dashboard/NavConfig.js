// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const userDetails = JSON.parse(localStorage.getItem('userInfo'));
function getUsername() {
  if(userDetails) {
    const username = userDetails.username;
    return username;
  }
   return "";
};
const navConfig = [
  {
    title: 'My Assets',
    path: `/dashboard/myassets/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Asset Analysis',
    path: `/dashboard/assetanalysis/`+getUsername(),
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Dashboard',
    path:`/dashboard/app/`+getUsername(),
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'profile',
    path: `/dashboard/user/`+getUsername(),
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Leader Board',
    path: `/dashboard/leaderboard/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'deposit',
    path: `/dashboard/deposit/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Add Funds',
    path: `/dashboard/addfunds/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Funding History',
    path: `/dashboard/fundshistory/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Withdraw',
    path: `/dashboard/withdraw/`+getUsername(),
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Withdrawal History',
    path: `/dashboard/withdrawals/`+getUsername(),
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'login',
    path: '/login/users',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'register',
    path: "/register",
    icon: getIcon('eva:person-add-fill'),
  },  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
