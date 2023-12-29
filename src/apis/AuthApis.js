import React from "react";
import { message } from "antd";
import axios from "axios";

export const OnRegister = (values) => {
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  formData.append("c_password", values.c_password);
  formData.append("name", values.name);

  return new Promise(async (resolve, reject) => {
    try {
  axios
    .post(`http://127.0.0.1:8000/api/register`, formData)
    .then(({ data }) => {
      localStorage.setItem("login_token",JSON.stringify(data.success));
      return data;
    })
    .catch(({ response }) => {
      return response;
    });
  } catch (err) {
    reject(err);
  }});
    
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
          localStorage.setItem("login_token", JSON.stringify(data.success));
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
