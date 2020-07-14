import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const axios = require('axios');

const Login = (props) => {

    const onFinish = values => {

      

      console.log('Received values of form: ', values);

      axios.post('http://localhost:5000/api/v1/auth/login', values)
      .then(response => {
        console.log('Response: ', response);
        if (response.data.success === true) {
          props.onLoginSuccess(values.username);
          // Auth.login(() => {
          //   props.history.push('/dashboard');
          // })
        }
      })
      .catch(error => {
        console.log(error);
      })
    };

    let history = useHistory();

    function handleClick() {
      history.push("/dashboard");
    }

    return (
      <Fragment>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <p></p>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleClick}>
            Log in
          </Button>
        </Form.Item>
          <a className="login-form-forgot" href="/forgotPassword">
            Forgot password?
          </a>
          <p></p>
          <p>
            You don't have an account?<Link to="/register"> Register!</Link>
          </p>
        </Form>
      </Fragment>
    );
  };
  
export default Login;
