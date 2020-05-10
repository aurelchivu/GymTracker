import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useTranslation } from 'react-i18next';

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './User/Register';

function App() {
  const { t } = useTranslation();
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">{t('Welcome')}</Link>
          </li>
          <li>
            <Link to="/about">{t('About')}</Link>
          </li>
          <li>
            <Link to="/users">{t('Users')}</Link>
          </li>
          <li>
            <Link to="/register">{t('Register')}</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h1>Users</h1>
    </div>
  );
}

export default App;
