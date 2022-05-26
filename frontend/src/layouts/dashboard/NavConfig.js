// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const userDetails = JSON.parse(localStorage.getItem('userInfo'));

const navConfig = [
  {
    title: 'dashboard',
    path:`/dashboard/app/${userDetails.username}`,
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'profile',
    path: `/dashboard/user/${userDetails.username}`,
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'team',
    path: `/dashboard/team/${userDetails.username}`,
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'investment',
    path: `/dashboard/investments/${userDetails.username}`,
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'withdrawals',
    path: `/dashboard/withdrawals/${userDetails.username}`,
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
