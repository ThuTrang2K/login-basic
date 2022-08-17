import React from "react";
import { Link, useParams } from "react-router-dom";
import {
    CalendarOutlined,
    FileOutlined,
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const { Sider } = Layout;
const SideMenu = () => {
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={[window.location.pathname==='/'?"/dashboard":window.location.pathname]}
                style={{
                    height: "100%",
                    borderRight: 0,
                    marginTop: 64,
                    position: "fixed",
                    width: 200,
                    fontSize:12
                }}
            >
                <Menu.Item key="/dashboard">
                    <HomeOutlined />
                    <span>Trang chủ</span>
                    <Link to="/dashboard"></Link>
                </Menu.Item>
                <Menu.Item key="/company-work-schedule">
                    <CalendarOutlined />
                    <span>Lịch cơ quan</span>
                    <Link to='/company-work-schedule'></Link>
                </Menu.Item>
                <Menu.SubMenu key="/item" title="sub menu">
                    
                    <Menu.Item>item 3</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Sider>
    );
};

export default SideMenu;
