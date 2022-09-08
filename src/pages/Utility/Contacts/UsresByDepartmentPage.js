import { Layout, Menu } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context";
import { observer } from "mobx-react-lite";
import useCapitalizeTheFirstLetter from "../../../hook/useCapitalizeFirstLetter";
import ListUsers from "../../../components/ListUsers";

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const UsresByDepartmentPage = observer(() => {
    const { usersStore, departmentsStore, authStore } = useContext(AuthContext);
    const [department_code, setDepartment_code] = useState("");
    const [name, setName] = useState("");
    const [curentPage, setCurentPage] = useState(0);
    useEffect(() => {
        async function fetchDepartments() {
            await departmentsStore.getListDepartmentsUsers();
            setDepartment_code(departmentsStore?.departments[0].code);
        }
        fetchDepartments();
    }, []);
    useEffect(() => {
        usersStore.getListUsersByDepartment(
            curentPage,
            name,
            department_code,
            authStore.user.company.code
        );
    }, [curentPage, department_code]);
    const usersList =
        usersStore?.usersbyDepartment &&
        usersStore?.usersbyDepartment.map((user) => ({
            ...user,
            position: user.position.name,
            department: user.department.name,
            name_capitalized: useCapitalizeTheFirstLetter(user.name_uppercase),
        }));
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
                            departmentsStore?.departments[Number(item.key)].code
                        );
                    }}
                    items={
                        departmentsStore?.departments.length > 0 &&
                        departmentsStore?.departments.map((department, index) =>
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
                <ListUsers
                    curentPage={curentPage}
                    dataSource={usersList}
                    total={usersStore?.total_count_Department}
                    setCurentPage={setCurentPage}
                />
            </Content>
        </Layout>
    );
});

export default UsresByDepartmentPage;
