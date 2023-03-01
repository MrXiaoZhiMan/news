import { Table } from 'antd'
import React, { useState, useEffect } from 'react'

export default function RoleList() {
  const [dataSource,setdataSource]=useState([]);
  const columns=[];
  useEffect(()=>{

  },[])
  return (
    <Table dataSource={dataSource} columns={columns}>
      
    </Table>
  )
}
