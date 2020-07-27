import React from 'react';
import { Link } from "react-router-dom";

import { Layout, Menu } from 'antd';

const { Header } = Layout;
const rightStyle = {position: 'absolute', top: 0, right: 0, margin: "16px 16px"}

function Navbar(props) {
    return(
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
                    {props.userData.username}
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default Navbar;