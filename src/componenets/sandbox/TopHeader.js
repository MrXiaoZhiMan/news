import { Layout, Dropdown, Space, Avatar } from "antd";
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  UserOutlined 
} from "@ant-design/icons";
import React, { useState } from "react";
const { Header } = Layout;

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const changeCollpased = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
        >
          超级管理员
        </a>
      ),
    },
   
    {
      key: "4",
      danger: true,
      label: "退出",
    },
  ];

  return (
    <Header
      style={{
        padding: "0 16px",
        background: "#ffffff",
      }}
    >
      {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
      className: 'trigger',
      onClick: () => setCollapsed(!collapsed),
    })} */}
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changeCollpased} />
      ) : (
        <MenuFoldOutlined onClick={changeCollpased} />
      )}

      <div style={{ float: "right", paddingRight: "20px" }}>
        <span>欢迎admin回来</span>
        <Dropdown
          menu={{
            items,
          }}
        >
          {/* <a 
          onClick={(e) => e.preventDefault()}
          > */}
            <Space>
             <Avatar size='large' icon={<UserOutlined />}  />
              {/* <DownOutlined /> */}
            </Space>
          {/* </a> */}
        </Dropdown>
      </div>
    </Header>
  );
}
