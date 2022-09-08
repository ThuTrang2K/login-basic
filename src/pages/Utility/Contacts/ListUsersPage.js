import { Avatar, Input, Pagination, Space, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import { observer } from "mobx-react-lite";
import { AuthContext } from "../../../context";
import useCapitalizeTheFirstLetter from "../../../hook/useCapitalizeFirstLetter";
import ListUsers from "../../../components/ListUsers";

const { Search } = Input;
const ListUsersPage = observer(() => {
    const { usersStore, authStore } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [curentPage, setCurentPage] = useState(0);
    useEffect(() => {
        usersStore.getListUsers(curentPage, name, authStore.user.company.code);
    }, [curentPage, name]);
    const usersList =
        usersStore?.users &&
        usersStore?.users.length > 0 &&
        usersStore?.users?.map((user) => ({
            ...user,
            position: user.position.name,
            department: user.department.name,
            name_capitalized: useCapitalizeTheFirstLetter(user.name_uppercase),
        }));
    const onSearch = (value) => setName(value);
    return (
        <>
            <Space direction="vertical">
                <Search
                    className="contacts-search"
                    placeholder="Tìm người dùng theo tên..."
                    onSearch={onSearch}
                    enterButton
                />
            </Space>
            <ListUsers
                curentPage={curentPage}
                dataSource={usersList}
                total={usersStore?.total_count}
                setCurentPage={setCurentPage}
            />
        </>
    );
});

export default ListUsersPage;
