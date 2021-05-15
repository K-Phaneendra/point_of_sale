import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { setApplicationRoutes } from './redux/reducerActions';
import { isUserLoggedIn } from './utils/authentication';
import { ADMIN_PATHS } from './utils/paths';

import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';

const routesBeforeLogin = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

const adminRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/login', element: <Navigate to={ADMIN_PATHS.dashboard} /> },
      { path: '/', element: <Navigate to={ADMIN_PATHS.dashboard} /> }
    ]
  },
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

const Routes = ({ updateRoutes }) => {
  useEffect(() => {
    if (isUserLoggedIn()) {
      updateRoutes(adminRoutes);
    } else {
      updateRoutes(routesBeforeLogin);
    }
  });

  return <></>;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  updateRoutes: (body) => dispatch(setApplicationRoutes(body))
});

Routes.propTypes = {
  updateRoutes: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
