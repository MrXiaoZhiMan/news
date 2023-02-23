import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from '../views/login/Login';
import NewsSandBox from '../views/sandbox/NewsSandBox';

export default function IndexRouter() {
  return (
    <HashRouter>
       <Switch>
         <Route path='/login' component={Login} />
         {/* <Route path='/' component={NewsSandBox} /> */}
          <Route path='/'  render={()=>{
            return localStorage.getItem("token")?
             <NewsSandBox></NewsSandBox>:
            //  Redirect重定向 到 login组件中
             <Redirect to='/login' />
          }} /> 
       </Switch>
    </HashRouter>
  )
}
