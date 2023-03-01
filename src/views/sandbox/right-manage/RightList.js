import { Button, Table, Tag, Modal, Popover, Switch } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;
export default function RightList() {
  const [dataSource, setdataSource] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      const list = res.data;
      list.forEach((item) => {
        if (item.children.length === 0) {
          item.children = "";
        }
      });
      setdataSource(list);
    });
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      title: "操作",
      // 没有写dataIndex时 item得到的就是整个一条对象
      render: (item) => {
        return (
          <div>
            <Button
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(item)}
            ></Button>
            <Popover content={<div style={{textAlign:"center"}}>
              <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)} ></Switch>
            </div>} title="配置项" trigger={item.pagepermisson===undefined?"":"click"}>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                disabled={item.pagepermisson===undefined}
              ></Button>
            </Popover>
          </div>
        );
      },
    },
  ];

  const switchMethod=(item)=>{
    // console.log(item);
    item.pagepermisson=item.pagepermisson===1?0:1;
    setdataSource([...dataSource])
    if(item.grade===1){
      axios.patch(`http://localhost:5000/rights/${item.id}`,{
      pagepermisson:item.pagepermisson
    })
    }else{
      axios.patch(`http://localhost:5000/children/${item.id}`,{
      pagepermisson:item.pagepermisson
    })
    }
  }
  const confirmMethod = (item) => {
    confirm({
      title: "你确定要删除么",
      icon: <ExclamationCircleOutlined />,
      content: "ASome dexcriptions",
      onOk() {
        deleteMethod(item);
      },
      onCancel() {
        console.log("cancel");
      },
    });
  };

  // 删除
  const deleteMethod = (item) => {
    console.log(item);
    // 当前页面同步状态，+后端同步
    if (item.grade === 1) {
      setdataSource(dataSource.filter((data) => data.id !== item.id));
      axios.delete(`http://localhost:5000/right/${item.id}`);
    } else {
      const list = dataSource.filter((data) => data.id === item.rightId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setdataSource([...dataSource]);
      axios.delete(`http://localhost:5000/children/${item.id}`);
    }
  };
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      ></Table>
    </div>
  );
}
