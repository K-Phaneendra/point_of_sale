import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import Loading from './components/Loading';
import Routes from './Routes';

import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import 'src/mixins/chartjs';

const App = ({ isLoading, applicationRoutes }) => {
  const routing = useRoutes(applicationRoutes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isLoading && <Loading />}
      <Routes />
      {routing}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.globalReducer.isLoading,
  applicationRoutes: state.globalReducer.applicationRoutes
});

App.propTypes = {
  isLoading: PropTypes.bool,
  applicationRoutes: PropTypes.array
};

App.defaultProps = {
  isLoading: false,
  applicationRoutes: []
};

export default connect(mapStateToProps)(App);
