/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Button } from "antd";
import "./style.scss";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";
import SideMenu from "../components/Layout/SideMenu";

const { Header, Content, Footer } = Layout;

const HomePage = () => {
    const { authStore } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!authStore.user) navigate("/login");
    }, []);
    return (
        <>
            {" "}
            <Layout>
                <Header
                    className="header"
                    style={{
                        position: "fixed",
                        zIndex: 1,
                        width: "100%",
                    }}
                >
                    <div className="logo" />
                    <div className="login-dropdown">
                        <span>
                            {authStore.user
                                ? authStore.user.name_uppercase
                                : ""}
                        </span>
                        <Button
                            onClick={() => {
                                authStore.logOut(navigate);
                            }}
                        >
                            Đăng Xuất
                        </Button>
                    </div>
                </Header>
                <Layout>
                    <SideMenu />
                    <Layout
                        style={{
                            padding: "0 24px 24px",
                            marginTop: 46,
                        }}
                    >
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: "24px 16px",
                                margin: 0,
                                minHeight: "100vh",
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
};

export default HomePage;
