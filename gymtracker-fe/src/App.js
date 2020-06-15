import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { useTranslation } from 'react-i18next';

import './App.less';
import { Layout, Menu } from 'antd';

// import Auth from './permissions/Auth';
// import LoggedInRoute from './permissions/LoggedInRoute';

import About from './components/layout/About';
// import Dashboard from './components/users/Dashboard';
import Home from './components/layout/Home';
import Login from './components/users/Login';
import Main from './components/layout/Main';
import Register from './components/users/Register';
import Users from './components/layout/Users';

function App() {
  // const { t } = useTranslation();
  
  const { Header, Content } = Layout;

  return (
    <Router>
      <Fragment>
        <Layout className="layout">
          <Header style={{ background: "black", padding: 16, paddingLeft: 16 }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Home']}>
              <Menu.Item key="Home" >
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="Login">
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="Register">
                <Link to="/register">Register</Link>
              </Menu.Item>
              <Menu.Item key="About">
                <Link to="/about">About</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280}}>
            <Route exact path="/" component={Home} />
            <Route path="/Login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about" component={About} />
          </Content>
        </Layout>
      </Fragment>
    </Router>
  );
}

export default App;
