import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Input, Space, Tabs } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Listaccounts from "./components/ListAccounts";
import ListCommandaccounts from "./components/ListCommandAccounts";
import './style.scss'

const UserAccountsPage = () => {
    const navigate = useNavigate();
    const [tab, setTab]= useState("1");
    const [createAccount, setCreateAccount]= useState(false);

    return (
        <>
            {tab ==="1" ? <div className="general-flex-header">
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
                    <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
                </Breadcrumb>
                <Button
                    type="primary"
                    style={{ backgroundColor: "#2c65ac", border: "none" }}
                    onClick={()=>setCreateAccount(!createAccount)}
                >                    
                        <PlusCircleOutlined />
                        &nbsp; Thêm mới người dùng
                </Button>
            </div>: <div className="general-flex-header">
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
                    <Breadcrumb.Item>Quản lý phần mềm</Breadcrumb.Item>
                </Breadcrumb>
               
            </div>}
            
            <div className="main-container">
                <div className="general-tab">
                    <Tabs
                        defaultActiveKey="1"
                        className="general-tab"
                        onTabClick={(key) => {
                            setTab(key);
                            if (key === "1")
                                navigate("/admin/user-account-management");
                            else navigate("/admin/user-app-management");
                        }}
                    >
                        <Tabs.TabPane tab="Tài khoản" key="1" >
                            <Listaccounts createAccount={createAccount} setCreateAccount={setCreateAccount}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Phần mềm" key="2"  >
                        <ListCommandaccounts/>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default UserAccountsPage;
