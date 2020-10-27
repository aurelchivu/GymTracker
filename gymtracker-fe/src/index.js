import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import Admin from "./components/protected/layouts/Admin";
import './components/protected/assets/css/material-dashboard-react.css?v=1.9.0"'

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <App />
    <Route path="/admin" component={Admin} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
