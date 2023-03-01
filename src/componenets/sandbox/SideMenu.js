import React,{useEffect, useState} from 'react';
import { Layout, Menu } from 'antd';
import './index.css';
import {
  UserOutlined, 
  VideoCameraOutlined,
   UploadOutlined,
   SettingOutlined,
   HomeOutlined,
   SolutionOutlined,
   TeamOutlined,
   UnlockOutlined,
   KeyOutlined
} from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';
import {withRouter} from 'react-router-dom'
import axios from 'axios'
const {  Sider } = Layout;

const iconList = {
  "/home": <HomeOutlined />,
  "/user-manage": <SolutionOutlined />,
  "/user-manage/list": <UserOutlined />,
  "/right-manage": <UnlockOutlined />,
  "/right-manage/role/list": <TeamOutlined />,
  "/right-manage/right/list": <KeyOutlined />,
  // "/news-manage": <MailOutlined />,
  // "/news-manage/add": <FormOutlined />,
  // "/news-manage/draft": <AlignLeftOutlined />,
  // "/news-manage/category": <RadarChartOutlined />,
  // "/audit-manage": <AuditOutlined />,
  // "/audit-manage/audit": <HighlightOutlined />,
  // "/audit-manage/list": <OrderedListOutlined />,
  // "/publish-manage": <SnippetsOutlined />,
  // "/publish-manage/unpublished": <ExclamationCircleOutlined />,
  // "/publish-manage/published": <CheckCircleOutlined />,
  // "/publish-manage/sunset": <StopOutlined />
}

 function SideMenu(props) {
  const [menu,setMenu]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/rights?_embed=children').then(res=>{
      console.log(res.data);
      setMenu(res.data)
    })
  },[])

  const checkPagePermission=(item)=>{
     return item.pagepermisson === 1 
  }
  
   const renderMenu=(menuList)=>{
    return menuList.map(item=>{
       if(item.children?.length >0 && checkPagePermission(item)){
        return <SubMenu key={item.key} icon={iconList[item.key]}
        title={item.title}>
          { renderMenu(item.children)}
        </SubMenu>
       }
       return checkPagePermission(item) &&  <Menu.Item 
       key={item.key} icon={iconList[item.key]} onClick={()=>{
        props.history.push(item.key)
       }} >{item.title}</Menu.Item>
    })
   }
   const selectKeys=[props.location.pathname]
   const openKeys=["/"+props.location.pathname.split("/")[1]]
  return (

    // collapsed={true} 代表折叠状态
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      {/* "flexDirection":"column"将主轴变成垂直的 */}
     <div style={{display:'flex',height:"100vh", "flexDirection":"column"}}>
     <div className="logo">全球新闻发布系统</div>
       <div style={{flex:1,"overflow":"auto"}}>
       <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectKeys} 
        className='aaaaaaa' 
        defaultOpenKeys={openKeys}
      >
        {renderMenu(menu)}
      </Menu>
       </div>
     </div>
    </Sider>
  )
}

export default withRouter(SideMenu)
