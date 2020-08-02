import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

import About from './About';
import Home from './Home';
import Login from './Login'
import Register from './Register';

import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;
const rightStyle = {position: 'absolute', top: 0, right: 0, margin: "16px 16px"}

function PublicRoute(props) {

    const [userData, setUserData] = useState({});

    const onLoginSuccess = username => {
        setUserData({ username });
    }

    return(
        <Router userData={userData}>
            <Layout>
                <Header style={{ background: "black", padding: 16, paddingRight: 16 }} >
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['Home']} >
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
                        <Menu.Item key="User" id="logged-in-user" style={rightStyle}>
                            {/* {props.userData.username} */}
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{padding: 16, minHeight: 800, display:"flex"}}>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/login">
                        <Login onLoginSuccess={onLoginSuccess}/>
                    </Route>
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/about" component={ About } />
                </Content>
            </Layout>
        </Router>
    );
}

export default PublicRoute;