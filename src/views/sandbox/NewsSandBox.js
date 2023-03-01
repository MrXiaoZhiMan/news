import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SideMenu from "../../componenets/sandbox/SideMenu";
import TopHeader from "../../componenets/sandbox/TopHeader";
import RightList from "./right-manage/RightList";
import RoleList from "./right-manage/RoleList";
import UserList from "./user-manage/UserList";
import Home from "./home/Home";
import Nopermission from "./nopermission/Nopermission";
import { Layout } from "antd";
import './NewsSandBox.css';
const {Content}=Layout

export default function NewsSandBox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: '#fff',
            overflow:"auto"
          }}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/user-manage/list" component={UserList} />
            <Route path="/right-manage/role/list" component={RoleList} />
            <Route path="/right-manage/right/list" component={RightList} />
            <Redirect from="/" to="/home" />
            <Route path="*" component={Nopermission} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
