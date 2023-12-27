import React from "react";
import { message } from "antd";
import axios from "axios";

export const OnRegister = (values) => {
  console.log("Success:", values.email);
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("c_password", values.c_password);
  formData.append("name", values.name);
  axios
    .post(`http://127.0.0.1:8000/api/register`, formData)
    .then(({ data }) => {
      localStorage.setItem("login_token", data.success.token);
      return data;
    })
    .catch(({ response }) => {
      return response;
    });
};

export const onLogin = async (values) => {
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  return new Promise(async (resolve, reject) => {
    try {
      axios
        .post(`http://127.0.0.1:8000/api/login`, formData)
        .then(({ data }) => {
          console.log("data", data);
          resolve(data);
        })
        .catch(({ response }) => {
          resolve("error");
        });
    } catch (err) {
      reject(err);
    }
  });
};
