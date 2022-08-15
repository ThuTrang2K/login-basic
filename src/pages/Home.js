/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import {
    LaptopOutlined,
    NotificationOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space, Breadcrumb, Layout, Menu, Button } from "antd";
import "./style.scss";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    }
);

const Home = () => {
    const { authStore, user } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(user);
    useEffect(() => {
        if (!authStore.user && !user) navigate("/login");
    }, []);
    return (
        <>
            <Layout>
                <Header className="header">
                    <div className="logo"></div>
                    <div className="login-dropdown">
                        <span >{authStore.user
                            ? authStore.user.username
                            : user
                            ? user.username
                            : ""}</span>
                        <Button
                            onClick={() => {
                                authStore.logOut(navigate);
                            }}
                        >Đăng Xuất</Button>
                    </div>
                </Header>
                <Content
                    style={{
                        padding: "0 50px",
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: "16px 0",
                        }}
                    >
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout
                        className="site-layout-background"
                        style={{
                            padding: "24px 0",
                        }}
                    >
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                authStore={authStore}
                                mode="inline"
                                defaultSelectedKeys={["1"]}
                                defaultOpenKeys={["sub1"]}
                                style={{
                                    height: "100%",
                                }}
                                items={items2}
                            />
                        </Sider>
                        <Content
                            style={{
                                padding: "0 24px",
                                minHeight: 280,
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                ></Footer>
            </Layout>
        </>
    );
};

export default Home;
