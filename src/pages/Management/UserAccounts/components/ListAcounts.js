import { Avatar, Button, Input, Pagination, Space, Switch, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AuthContext } from "../../../../context";
import useCapitalizeTheFirstLetter from "../../../../hook/useCapitalizeFirstLetter";
import { EditOutlined, FilterOutlined } from "@ant-design/icons";

const { Search } = Input;
const ListAcounts = observer(() => {
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
            company: user.company.name,
            position: user.position.name,
            department: user.department.name,
            name_capitalized: useCapitalizeTheFirstLetter(user.name_uppercase),
        }));
    const columns = [
        {
            title: "Thông tin",
            dataIndex: "name_capitalized",
            key: "name_capitalized",
            render: (text) => (
                <div className="contacts-flex">
                    <Avatar>{text.at(0)}</Avatar>
                    <span className="contacts-name">{text}</span>
                </div>
            ),
            // width: "25%",
        },
        {
            title: "ID",
            dataIndex: "username",
            key: "username",
            // width: "5%",
        },
        {
            title: "Mã nhân viên",
            dataIndex: "ma_nv",
            key: "ma_nv",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            // width: "10%",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            // width: "10%",
        },
        {
            title: "Điện thoại",
            dataIndex: "phone",
            key: "phone",
            render: (text) =>
                text ? <b>{text}</b> : <div className="no-infor">Chưa rõ.</div>,
            // width: "5%",
        },
        {
            title: "Số máy nội bộ",
            dataIndex: "home_phone",
            key: "home_phone",
            render: (text) =>
                text ? <b>{text}</b> : <div className="no-infor">Chưa rõ.</div>,
            // width: "10%",
        },
        {
            title: "Trạng thái",
            dataIndex: "",
            key: "",
            render: (text) => (
                <Switch
                    defaultChecked
                    onChange={(checked) => {
                        console.log(`switch to ${checked}`);
                    }}
                />
            ),
            // width: "10%",
        },
        {
            title: "Công ty",
            dataIndex: "company",
            key: "company",
            // render: (text) =><div className="general-ellipsis">{text}</div>,
            // width: "15%",
        },
        {
            title: "Tác vụ",
            dataIndex: "department",
            key: "department",
            width: 120,
            fixed: 'right',
            render: (text) => (
                <Button
                    type="primary"
                    style={{ backgroundColor: "#2c65ac", border: "none" ,margin:"0 auto"}}
                >
                    <EditOutlined /> Chỉnh sửa
                </Button>
            ),
        },
    ];
    const onSearch = (value) => {};
    return (
        <>  
            <div className="general-flex-header">
            <Space direction="vertical">
                <Search
                    className="general-search"
                    placeholder="Tìm kiếm theo tên hoặc username"
                    onSearch={onSearch}
                    enterButton
                />
            </Space>
            <Button><FilterOutlined />Tìm kiếm nâng cao</Button>
            </div>
            {/* <div className="general-table-wrapper "> */}
                <Table
                    columns={columns}
                    rowKey={(record) => record.code}
                    dataSource={usersList}
                    scroll={{
      x: 1100,
    }}
                />
            {/* </div> */}
           
            <Pagination
                className="contacts-users-pagination"
                defaultCurrent={curentPage + 1}
                current={curentPage + 1}
                pageSize={10}
                total={usersStore?.total_count}
                onChange={(page) => {
                    setCurentPage(page - 1);
                }}
            />
        </>
    );
});

export default ListAcounts;
