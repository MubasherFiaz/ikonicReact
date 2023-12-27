import React from "react";
import { Layout, Menu } from "antd";
// import AsideHome from "../media/aside-home.svg";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;
function SidebarMenu() {
  const navigate = useNavigate();

  return (
    <>
      <Sider className="side-bar-nav">
        <Menu
          className="aside-bar"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ minHeight: "100%" }}
        >
          <Menu.Item key="1" onClick={() => navigate("/dashboard")}>
            <span className="d-flex flex-row  justify-content-center align-items-center pt-2">
              <LaptopOutlined className="p-1" /> Dashboard
            </span>
          </Menu.Item>
          <Menu.Item key="1" onClick={() => navigate("/data")}>
            <span className="d-flex flex-row  justify-content-center align-items-center pt-2">
              <LaptopOutlined className="p-1" /> Data
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}

export default SidebarMenu;
