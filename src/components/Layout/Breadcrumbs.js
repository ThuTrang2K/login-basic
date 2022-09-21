import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import './style.scss'

const Breadcrumbs = ({items}) => {
    return (
        <Breadcrumb
            style={{
                margin: "16px 0",
                fontWeight: 500,
                fontSize: 12,
            }}
        >
            <Breadcrumb.Item>
                <Link to="/">
                    <HomeOutlined />
                </Link>
            </Breadcrumb.Item>
            {items.map((item) => (
                <Breadcrumb.Item>
                    <Link to={item.url}>{item.title}</Link>
                </Breadcrumb.Item>
            ))}{" "}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
