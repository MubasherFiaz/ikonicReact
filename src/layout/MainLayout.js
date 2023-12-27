import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import SidebarMenu from "./SidebarMenu";
import SiteHeader from "./SiteHeader";
const { Content, Footer, Sider } = Layout;

const MainLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ top: "-25px", position: "relative" }}>
      <SiteHeader />
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <Layout
          style={{
            padding: "40px 0",
            background: colorBgContainer,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <SidebarMenu />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Learning Portal
      </Footer>
    </Layout>
  );
};
export default MainLayout;
