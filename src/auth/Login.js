import * as React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { onLogin } from "../apis/AuthApis";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    let loginResponse = await onLogin(values);

    if (loginResponse === "error") {
      messageApi.open({
        type: "warning",
        content: "Invalid Login Details",
      });
    }else{
      navigate('/feedback');
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: 'url("/gif.gif")', // Replace with the actual image URL
          backgroundSize: "cover",
        }}>
        <h3 style={{ textAlign: "center", color: "white" }}>Login </h3>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            maxWidth: "400px", // Set a maximum width for the form
            width: "100%",
            border: "1px solid #ddd", // Add a border to the form
            padding: "20px", // Add some padding for spacing
            borderRadius: "8px", // Add border-radius for rounded corners
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
          }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            wrapperCol={{
              span: 24,
            }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Login
            </Button>
            <a
              className="btn btn-sm btn-secondary mt-2"
              href="/register"
              style={{ width: "100%", display: "block" }}>
              Register
            </a>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
