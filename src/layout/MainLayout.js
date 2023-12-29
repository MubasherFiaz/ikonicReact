import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import SiteHeader from "./SiteHeader";
const { Content, Footer, Sider } = Layout;

const MainLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout >
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
          
          <Content
            style={{
              padding: "0 24px",
              minHeight: '60vh',
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
        Assessment
      </Footer>
    </Layout>
  );
};
export default MainLayout;
