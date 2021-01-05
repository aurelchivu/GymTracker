import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Admin from './components/protected/layouts/Admin';
import './components/protected/assets/css/material-dashboard-react.css?v=1.9.0"';

const hist = createBrowserHistory();

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={hist}>
          <App />
          <Route path='/admin' component={Admin} />
        </Router>
      </PersistGate>
    </Provider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
