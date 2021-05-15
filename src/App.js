import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import Loading from './components/Loading';

import GlobalStyles from 'src/components/GlobalStyles';
import routes from 'src/routes';
import theme from 'src/theme';
import 'src/mixins/chartjs';

const App = ({ isLoading }) => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {isLoading && <Loading />}
      {routing}
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.globalReducer.isLoading
});

App.propTypes = {
  isLoading: PropTypes.bool
};

App.defaultProps = {
  isLoading: false
};

export default connect(mapStateToProps)(App);
