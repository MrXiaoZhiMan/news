import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import SideMenu from '../../componenets/sandbox/SideMenu'
import TopHeader from '../../componenets/sandbox/TopHeader'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import UserList from './user-manage/UserList'
import Home from './home/Home';
import Nopermission from './nopermission/Nopermission'

export default function NewsSandBox() {
  return (
    <div>
      <SideMenu></SideMenu>
      <TopHeader></TopHeader>

      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/user-manage/list' component={UserList} />
        <Route path='/right-manage/role/list' component={RoleList} />
        <Route path='/right-manage/right/list' component={RightList} />
        <Redirect from='/' to='/home' />
        <Route path='*' component={Nopermission} />
      </Switch>
    </div>
  )
}
