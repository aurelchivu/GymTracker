import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

const { Content, Sider } = Layout;

const Dashboard = () => {
    return (
        <Layout>
            <div className="container">
                <Content>
                    <Sider style={{ padding: 16, paddingRight: 16 }}>
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['Workouts']}>
                            <Menu.Item key="Workouts">
                            <Link to="/workouts" activestyle>Workouts</Link>
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
                            Logout
                            </Menu.Item>
                        </Menu>
                    </Sider>
                </Content>
            </div>
        </Layout>
    )
}

export default Dashboard;