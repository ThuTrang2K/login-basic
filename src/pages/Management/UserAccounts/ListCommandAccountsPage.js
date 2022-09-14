import { observer } from "mobx-react-lite";
import { AlignLeftOutlined, HomeOutlined } from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Drawer,
    Modal,
    Pagination,
    Space,
    Switch,
    Table,
    Tabs,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvancedSearch from "./components/AdvancedSearch";
import useCapitalizeTheFirstLetter from "../../../hook/useCapitalizeFirstLetter";
import { AuthContext } from "../../../context";
import "./style.scss";

const ListCommandAccountsPage = observer(() => {
    const { usersStore, authStore, departmentsStore } = useContext(AuthContext);
    const navigate = useNavigate();
    const [openSelectList, setOpenSelectList] = useState(false);
    const [curentPage, setCurentPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState("");
    const [statusCheck, setStatusCheck] = useState(false);
    const [selects, setSelects] = useState({
        keyword: "",
        department_code: "",
        direction: "",
        sort_by: "",
    });
    useEffect(() => {
        departmentsStore.getListDepartmentsUsers();
        usersStore.getUserCommands();
    }, []);
    useEffect(() => {
        usersStore.getListUsers(
            curentPage,
            selects,
            authStore.user.company.code
        );
    }, [
        curentPage,
        selects.keyword,
        selects.department_code,
        selects.status,
        selects.direction,
        selects.sort_by,
        statusCheck
    ]);
    useEffect(() => {
        usersStore.getUserByUser_code(account.code);
    }, [account]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            title: "Họ tên",
            dataIndex: "name_uppercase",
            key: "name_uppercase",
            // eslint-disable-next-line react-hooks/rules-of-hooks
            render: (text) => <b>{useCapitalizeTheFirstLetter(text)}</b>,
            width: "20%",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: "15%",
        },
        {
            title: "Phần mềm",
            dataIndex: "commands",
            key: "commands",
            render: (text, record) =>
                text.length > 0 ? (
                    text.map((text) => (
                        <span className="command-item">{text.name}</span>
                    ))
                ) : (
                    <div className="no-infor">Không có.</div>
                ),
            width: "40%",
        },
        {
            title: "Tác vụ",
            dataIndex: "action",
            key: "action",
            width: "10%",
            render: (text, record) => (
                <>
                    <Button
                        onClick={() => {
                            setAccount(record);
                            showDrawer();
                        }}
                        type="primary"
                        style={{
                            backgroundColor: "#2c65ac",
                            border: "none",
                            margin: "0 auto",
                        }}
                    >
                        <AlignLeftOutlined /> Cấu hình
                    </Button>
                </>
            ),
        },
    ];
    const columns2 = [
        {
            title: "Dịch vụ",
            dataIndex: "name",
            key: "name",
            //   render: (text) => <a>{text}</a>,
            width: "40%",
        },
        {
            title: "Trạng thái",
            dataIndex: "age",
            key: "age",
            render: (text, record) => {
                const check = account.commands.some(command=>command.code=== record.code)
                let newCommands= account.commands.map(command=>command.code)
                return <Switch
                    checked={check}
                    
                    onChange={async (checked) => {
                        console.log(`record.code`,record.code)
                        console.log(`switch to ${checked}`);
                        checked? newCommands.push(record.code):newCommands= newCommands.filter(command=>command!==record.code);
                        console.log(`newCommands`,newCommands)
                        await usersStore.updateUserCommands(newCommands,account.code)
                        setStatusCheck(!statusCheck); 
                        showDrawer();                     
                    }}
                />
            },
            width: "30%",
        },
        {
            title: "Tác vụ",
            dataIndex: "action",
            key: "action",
            render: (text, record) => (
                <>
                    <Button
                        className="secondary-button"
                        onClick={() => {
                            // setAccount(record);
                            // showModal();
                        }}
                    >
                        Quản lý
                    </Button>
                </>
            ),
            width: "30%",
        },
    ];
    const props = {
        setSelects,
        selects,
        setOpenSelectList,
        openSelectList,
        departmentsStore,
        setCurentPage,
    };
    return (
        <div>
            <div className="general-flex-header">
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
            </div>
            <div className="main-container">
                <div className="general-tab">
                    <Tabs
                        defaultActiveKey="2"
                        className="general-tab"
                        onTabClick={(key) => {
                            if (key === "1")
                                navigate("/admin/user-account-management");
                            else navigate("/admin/user-app-management");
                        }}
                    >
                        <Tabs.TabPane tab="Tài khoản" key="1"></Tabs.TabPane>
                        <Tabs.TabPane tab="Phần mềm" key="2">
                            <AdvancedSearch props={props} />
                            <Table
                                // style={{overflowX:"scroll"}}
                                columns={columns}
                                rowKey={(record) => record.code}
                                dataSource={usersStore?.users}
                                scroll={{
                                    x: 1100,
                                }}
                            />
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
                            <Drawer
                                title="Phân quyền truy cập"
                                placement="left"
                                onClose={onClose}
                                visible={open}
                                width={420}
                            >
                                <div
                                    className="general-flex-header"
                                    style={{ margin: "0 32px" }}
                                >
                                    <div>
                                        <b>Tên đăng nhập</b>
                                        <div
                                            style={{
                                                color: "#2c65ac",
                                                marginTop: 16,
                                            }}
                                        >
                                            {account?.username &&
                                                account?.username}
                                        </div>
                                    </div>
                                    <div>
                                        <b>Họ tên</b>
                                        <div
                                            style={{
                                                color: "#2c65ac",
                                                marginTop: 16,
                                            }}
                                        >
                                            {account?.name_uppercase &&
                                                useCapitalizeTheFirstLetter(
                                                    account?.name_uppercase
                                                )}
                                        </div>
                                    </div>
                                </div>
                                <Table
                                    columns={columns2}
                                    dataSource={usersStore?.commands}
                                />
                                <Button
                                    style={{
                                        marginTop: 16,
                                        marginLeft: "auto",
                                        display: "block",
                                    }}
                                    className="secondary-button"
                                    onClick={onClose}
                                >
                                    Đóng cửa sổ
                                </Button>
                            </Drawer>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
});

export default ListCommandAccountsPage;
