import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Tabs } from "antd";
import React from "react";
import "./style.scss";
import Users from "./Users";
import UsresByDepartment from "./UsresByDepartment";

const Contacts = () => {
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
                <Tabs defaultActiveKey="1" className="contacts-tab">
                    <Tabs.TabPane tab="Nhân viên" key="1" >
                        <Users/>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Phòng ban" key="2">
                        <UsresByDepartment />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Contacts;
