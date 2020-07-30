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
                    <Link to="/" activestyle>Home</Link>
                </Menu.Item>
                <Menu.Item key="Login">
                    <Link to="/login" activestyle>Login</Link>
                </Menu.Item>
                <Menu.Item key="Register">
                    <Link to="/register" activestyle>Register</Link>
                </Menu.Item>
                <Menu.Item key="About">
                    <Link to="/about" activestyle>About</Link>
                </Menu.Item>
                <Menu.Item key="User" id="logged-in-user" style={rightStyle}>
                    {props.userData.username}
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default Navbar;