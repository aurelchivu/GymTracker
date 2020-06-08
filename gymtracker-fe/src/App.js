import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
// import { Layout } from 'antd';

import './App.css';

import About from './components/layout/About';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Users from './components/layout/Users';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  // const { t } = useTranslation();
  
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Home} />
          <section className="container">
            <Switch>
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/users" component={Users} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

