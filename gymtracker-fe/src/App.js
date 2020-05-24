import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "bootstrap/dist/css/bootstrap.min.css";


import React from 'react';
import './App.css';

import About from "./Components/about.component"
import Login from "./Components/login.component";
import Navigation from "./Components/navbar.component"
import Register from "./Components/register.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation />
        <br/>
        <Route path="/about" component={ About } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
      </div>
    </Router>
  );
}

export default App;