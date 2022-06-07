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
    title: 'dashboard',
    path:`/dashboard/app/`+getUsername(),
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'profile',
    path: `/dashboard/user/`+getUsername(),
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'assets',
    path: `/dashboard/assets/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'team',
    path: `/dashboard/team/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'addfunds',
    path: `/dashboard/addfunds/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'fundshistory',
    path: `/dashboard/fundshistory/`+getUsername(),
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'withdraw',
    path: `/dashboard/withdraw/`+getUsername(),
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'withdrawals',
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
