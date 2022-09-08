import { Layout, Menu } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context";
import { observer } from "mobx-react-lite";
import Users from "./Users";

const UsresByDepartment = observer(() => {
    const { usersStore, eventStore } = useContext(AuthContext);
    const [department_code, setDepartment_code] = useState("");
    useEffect(() => {
        async function fetchDepartments() {
            await eventStore.getListDepartmentsUsers();
            setDepartment_code(eventStore?.departments[0].code);
        }
        fetchDepartments();
    }, []);
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    return (
        <Layout className="site-layout-background" style={{}}>
            <Sider
                className="site-layout-background contact-sidebar"
                width={200}
                style={{ height: 700, overflowY: "scroll" }}
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={["0"]}
                    defaultOpenKeys={["sub1"]}
                    style={{
                        height: "100%",
                    }}
                    onClick={(item, key) => {
                        setDepartment_code(
                            eventStore?.departments[Number(item.key)].code
                        );
                    }}
                    items={
                        eventStore?.departments.length > 0 &&
                        eventStore?.departments.map((department, index) =>
                            getItem(department.title, `${index}`)
                        )
                    }
                />
            </Sider>
            <Content
                style={{
                    padding: "0 24px",
                    minHeight: 280,
                    overflowX: "scroll",
                    overflowY: "hidden",
                }}
                className="contact-content"
            >
                <Users
                    style={{ width: "1210px" }}
                    department_code={department_code}
                />
            </Content>
        </Layout>
    );
});

export default UsresByDepartment;
