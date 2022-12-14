import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ApartmentOutlined,
    CalendarOutlined,
    FileTextOutlined,
    HomeOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./style.scss";

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
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                className="side-menu"
                mode="inline"
                // defaultSelectedKeys={['1']}
                // items={items}
                defaultSelectedKeys={[
                    window.location.pathname === "/"
                        ? "/dashboard"
                        : window.location.pathname,
                ]}
                style={{
                    height: "100%",
                    borderRight: 0,
                    marginTop: 64,
                    position: "fixed",
                    width: 200,
                    fontSize: 12,
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
                    <Link to="/company-work-schedule"></Link>
                </Menu.Item>
                <Menu.SubMenu
                    key="/document"
                    title="Văn bản"
                    icon={<FileTextOutlined />}
                >
                    <Menu.Item key={"/internal-document/incoming-document"}>
                        <Link to="/internal-document/incoming-document">Văn bản VIMC</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="/item"
                    title="Tiện ích"
                    icon={<SolutionOutlined />}
                >
                    <Menu.Item key={"/utility/contacts"}>
                        <Link to="/utility/contacts">Danh bạ</Link>
                    </Menu.Item>
                    <Menu.Item key={"/utility/general-notifications"}>
                        <Link to="/utility/general-notifications">
                            Thông báo chung
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="/management"
                    title="Quản trị"
                    icon={<ApartmentOutlined />}
                >
                    <Menu.Item key={"/admin/user-account-management"}>
                        <Link to="/admin/user-account-management">
                            Tài khoản
                        </Link>
                    </Menu.Item>
                </Menu.SubMenu>
            </Menu>
        </Sider>
    );
};

export default SideMenu;
