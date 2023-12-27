import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { OnRegister } from "../apis/AuthApis";

export default function Register() {
  const navigate = useNavigate();
  const onFinish = (values) => {
    OnRegister(values);
    return;
    console.log("Success:", values.email);
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("c_password", values.c_password);
    formData.append("name", values.name);
    axios
      .post(`http://127.0.0.1:8000/api/register`, formData)
      .then(({ data }) => {
        console.log(data); //setisLoggedIn(true);
        localStorage.setItem("login_token", data.success.token);
        navigate("/dashboard");
      })
      .catch(({ response }) => {
        console.log("error");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
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
        <h3 style={{ textAlign: "center", color: "white" }}>Register Page</h3>
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
            padding: "10px", // Add some padding for spacing
            borderRadius: "8px", // Add border-radius for rounded corners
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
          }}>
          <Form.Item
            label="User Name"
            name="name"
            rules={[
              {
                required: true,
                type: "text",
                message: "Please input your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Your Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Your Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="c_password"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
           
          >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>

            <a className="btn btn-sm btn-secondary mt-2" style={{ width: "100%", display: "block" }} href="/login">
              Login
            </a>
          </Form.Item>
        </Form>
      </div>
      
    </>
  );
}
