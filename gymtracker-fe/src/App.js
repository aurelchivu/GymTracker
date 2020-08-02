import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.less';
import { Layout } from 'antd';

import Dashboard from './components/protected/Dashboard';
import PublicComponent from './components/public/PublicComponent';
// import Login from './components/public/Login'
import { ProtectedRoute } from './components/protected/ProtectedComponent';

const App = () => {

  const { Footer } = Layout;

  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={PublicComponent} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        {/* <Route path="*" component={() => "404 NOT FOUND"} /> */}
      </Switch>
      <Footer style={{ textAlign: 'center' }}>
        GymTracker ©2020. All rights reserved
      </Footer>
    </Fragment>
  );
}

export default App;
