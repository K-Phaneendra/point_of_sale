import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// antd styles
import 'antd/dist/antd.css';

import configureStore from './redux/store';
import * as serviceWorker from './serviceWorker';
import App from './App';

import './assets/css/global.css';
// custom and design styles
import './assets/css/customAntDesign.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
