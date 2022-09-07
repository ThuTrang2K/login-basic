import { Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context';
import { observer } from "mobx-react-lite";
import Users from './Users';

const UsresByDepartment = observer(() => {
    const { usersStore,eventStore } = useContext(AuthContext);
    useEffect(() => {
        eventStore.getListDepartmentsUsers();
    }, []);
    console.log(eventStore?.departments)
    function getItem(label, key, icon, children) {
        return {
          key,
          icon,
          children,
          label,
        };
      }
    
    const items2 = [
        getItem('Option 1', '1'),
        getItem('Option 2', '2'),
      ];
    return (
        <Layout
        className="site-layout-background"
        style={{ 
        }}
      >
        <Sider className="site-layout-background contact-sidebar" width={200} style={{ height:700,overflowY:"scroll"
        }} >
          <Menu
            mode="inline"
            defaultSelectedKeys={['0']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
            }}
            items={eventStore?.departments.length >0 && eventStore?.departments.map((department,index)=>getItem(department.title,`${index}`))}
          />
        </Sider>
        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
           overflowX:"scroll",
           overflowY:"hidden"
          }}
          className="contact-content"
        >
          <Users style={{width:"1210px"}}/>
        </Content>
      </Layout>
    );
});

export default UsresByDepartment;