import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";

export default function SiteHeader() {
  const navigater = useNavigate();
  const navigate = useNavigate();
  const login_info = localStorage.getItem("login_token");
  const { Header, Content, Footer, Sider } = Layout;

  const logOut = () => {
    localStorage.removeItem("login_token");
    navigater("/");
  };
  const logIn = () => {
    navigater("/");
  };
  return (
    <>
      <Header
        className="header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="logo text-light">Learning Logo</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
        {login_info ? (
          <button
            className="btn btn-danger float-right"
            style={{ margin: "10px", padding: "0 20px" }}
            onClick={logOut}
          >
            Logout
          </button>
        ) : (
          <button
            className="btn btn-primary float-right"
            style={{ margin: "10px", padding: "0 20px" }}
            onClick={logIn}
          >
            Login
          </button>
        )}
      </Header>
    </>
  );
}
