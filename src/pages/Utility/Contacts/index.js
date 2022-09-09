import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Tabs } from "antd";
import React from "react";
import ListUsersPage from "./ListUsersPage";
import "./style.scss";
import UsresByDepartmentPage from "./UsresByDepartmentPage";

const ContactsPage = () => {
    return (
        <div>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                    fontWeight: 500,
                    fontSize: 12,
                }}
            >
                <Breadcrumb.Item>
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>Danh bạ</Breadcrumb.Item>
            </Breadcrumb>
            <div className="main-container">
                <div className="contacts-tab">
                <Tabs defaultActiveKey="1" className="general-tab">
                    <Tabs.TabPane tab="Nhân viên" key="1" >
                        <ListUsersPage/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Phòng ban" key="2">
                        <UsresByDepartmentPage />
                    </Tabs.TabPane>
                </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
