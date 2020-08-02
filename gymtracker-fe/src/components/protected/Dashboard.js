import React, { Fragment } from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, Menu } from 'antd';
import Workouts from './Workouts'

const { Content, Sider } = Layout;

const Dashboard = () => {
    return (
        <Router>
            <Layout>
                <div className="container">
                <Sider style={{ padding: 16, paddingRight: 16 }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['Workouts']}>
                        <Menu.Item key="Workouts">
                            <Link to="/workouts" >Workouts</Link>
                        </Menu.Item>
                        <Menu.Item key="Listen to music">
                            Listen to music
                        </Menu.Item>
                        <Menu.Item key="Training videos">
                            Training videos
                        </Menu.Item>
                        <Menu.Item key="Meal Plan">
                            Meal Plan
                        </Menu.Item>
                        <Menu.Item key="Find a gym near me">
                            Find a gym near me
                        </Menu.Item>
                        <Menu.Item key="Logout">
                            Measurements
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content className="site-layout" style={{padding: 16, minHeight: 570, display:"flex"}}>
                    <Route exact path="/workouts" component={ Workouts } />
                </Content>
                </div>
            </Layout>
        </Router>
    )
}

export default Dashboard;