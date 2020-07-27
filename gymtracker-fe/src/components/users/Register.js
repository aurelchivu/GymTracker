import React from 'react';
import { Link } from 'react-router-dom';

import {
  Form,
  Input,
  Row,
  Button
} from 'antd';

const axios = require('axios');

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 60 },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 14,
    },
  },
};

const Register = () => {

  const [form] = Form.useForm();

  const onFinish = values => {
    
    console.log('Received values of form: ', values);

    axios.post('http://localhost:5000/api/v1/auth/register', values)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className="container">
    <Row>
        <h1>Register your account</h1>
    </Row>
    <Row>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}

    >
    
    <Form.Item
        name="username"
        label={
          <span>
            Username
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            min: 6,
            required: true,
            message: 'Password must be at least 6 characters!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>

      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </Form>
    </Row>
    </div>
  );
};

export default Register;