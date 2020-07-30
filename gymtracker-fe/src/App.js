import React, { Fragment, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.less';
import { Layout } from 'antd';

// import Auth from './permissions/Auth';
// import LoggedInRoute from './permissions/LoggedInRoute';

import About from './components/layout/About';
import Dashboard from './components/users/Dashboard';
import Home from './components/layout/Home';
import Login from './components/users/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/users/Register';
import Workouts from './components/users/Workouts';

const App = () => {

  const { Content, Footer } = Layout;
  const [userData, setUserData] = useState({});

  const onLoginSuccess = username => {
      setUserData({ username });
  }

  return (
    <Router userData={userData}>
      <Fragment>
        <Layout className="layout" >
          <Navbar userData={userData} />
          <Content className="site-layout" style={{padding: 16, minHeight: 780, display:"flex"}}>
            <Route exact path="/" component={ Home } />
            <Route exact path="/login">
              <Login onLoginSuccess={onLoginSuccess}/>
            </Route>
            <Route exact path="/register" component={ Register } />
            <Route exact path="/about" component={ About } />
            <Route exact path="/dashboard" component={ Dashboard } />
            <Route exact path="/workouts" component={ Workouts } />
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>GymTracker ©2020.All rights reserved</Footer>
      </Fragment>
    </Router>
  );
}

export default App;
