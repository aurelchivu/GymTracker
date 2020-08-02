import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../../permissions/auth'
import { Form, Input, Button, Checkbox,Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const axios = require('axios');

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 3 },
};

const Login = (props) => {

  const history = useHistory();
  
  const onFinish = values => {

    console.log('Received values of form: ', values);

    axios.post('http://localhost:5000/api/v1/auth/login', values)
    .then(response => {
      console.log('Response: ', response);
      if (response.data.success === true) {
        // props.onLoginSuccess(values.username);
        auth.login(() => {
          history.push("/dashboard");
        });
      }
    })
    .catch(error => {
      console.log(error);
    })
  };

  return (
    <div className="container">
      <Row>
        <h1>Login</h1>
    </Row>
      <Form
        {...layout}
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
        <Button type="primary" htmlType="submit" className="login-form-button" >
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
    </div>
  );
};
  
export default Login;
