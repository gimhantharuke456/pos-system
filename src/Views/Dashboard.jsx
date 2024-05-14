import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UnorderedListOutlined,
  AppstoreAddOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useSnapshot } from "valtio";
import state from "../utils";
import Items from "../Components/Items";
import Categories from "../Components/Categories";
import Stocks from "../Components/Stocks";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const snap = useSnapshot(state);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onMenuItemClicked = (index) => {
    state.activeIndex = index;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="logo"
          style={{
            height: "32px",
            margin: "16px",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            onClick={() => onMenuItemClicked(0)}
            key="1"
            icon={<UnorderedListOutlined />}
          >
            Items
          </Menu.Item>
          <Menu.Item
            onClick={() => onMenuItemClicked(1)}
            key="2"
            icon={<AppstoreAddOutlined />}
          >
            Categories
          </Menu.Item>
          <Menu.Item
            onClick={() => onMenuItemClicked(2)}
            key="3"
            icon={<ShoppingCartOutlined />}
          >
            Stock
          </Menu.Item>
          <Menu.Item
            onClick={() => onMenuItemClicked(3)}
            key="4"
            icon={<UserOutlined />}
          >
            Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {snap.activeIndex === 0 && <Items />}
          {snap.activeIndex === 1 && <Categories />}
          {snap.activeIndex === 2 && <Stocks />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
