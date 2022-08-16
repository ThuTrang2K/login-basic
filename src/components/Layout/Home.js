import { Breadcrumb } from "antd";
import React from "react";

const Home = () => {
    return (
        <Breadcrumb
            style={{
                margin: "16px 0",
                fontWeight:500,
                fontSize:12,
            }}
        >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default Home;
