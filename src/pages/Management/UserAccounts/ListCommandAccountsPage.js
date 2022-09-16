import { observer } from "mobx-react-lite";
import { AlignLeftOutlined, HomeOutlined } from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Drawer,
    Empty,
    Pagination,
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
import UpdateCommandAccount from "./components/UpdateCommandAccount";
import CreateCommandAccount from "./components/CreateCommandAccount";

const ListCommandAccountsPage = observer(() => {
    const { usersStore, authStore, departmentsStore } = useContext(AuthContext);
    const navigate = useNavigate();
    const [openSelectList, setOpenSelectList] = useState(false);
    const [curentPage, setCurentPage] = useState(0);
    const [openCommandAccess, setOpenCommandAccess] = useState(false);
    const [openCommandManage, setopenCommandManage] = useState(false);
    const [account_code, setAccount_code] = useState("");
    const [user, setUser] = useState({});
    const [statusChange, setStatusChange] = useState(false);
    const [command, setCommand] = useState("");
    const [commandAccount, setCommandAccount] = useState();
    const [openCreateAccount, setOpenCreateAccount] = useState(false);
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
        async function fetchData() {
            await usersStore.getListUsers(
                curentPage,
                selects,
                authStore.user.company.code
            );
            usersStore?.users?.forEach((user) => {
                user.code === account_code && setUser(user);
            });
        }
        fetchData();
    }, [
        curentPage,
        selects.keyword,
        selects.department_code,
        selects.status,
        selects.direction,
        selects.sort_by,
        statusChange,
    ]);
    useEffect(() => {
        usersStore?.users?.forEach((user) => {
            user.code === account_code && setUser(user);
        });
        usersStore.getAccountsByUser_code(account_code);
    }, [account_code, commandAccount]);
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
                        <span className="command-item" key={text.code}>
                            {text.name}
                        </span>
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
                        onClick={async () => {
                            setAccount_code(record.code);
                            setOpenCommandAccess(true);
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
                const check = user?.commands?.some(
                    (command) => command.code === record.code
                );
                let newCommands = user?.commands?.map(
                    (command) => command.code
                );
                return (
                    <Switch
                        checked={check}
                        onChange={async (checked) => {
                            checked
                                ? newCommands.push(record.code)
                                : (newCommands = newCommands.filter(
                                      (command) => command !== record.code
                                  ));
                            await usersStore.updateUserCommands(
                                newCommands,
                                user.code
                            );
                            setStatusChange(!statusChange);
                        }}
                    />
                );
            },
            width: "30%",
        },
        {
            title: "Tác vụ",
            dataIndex: "action",
            key: "action",
            render: (text, record) => {
                const check = user?.commands?.some(
                    (command) => command.code === record.code
                );
                return (
                    <Button
                        className="secondary-button"
                        disabled={!check}
                        onClick={() => {
                            usersStore?.accounts.forEach((account) => {
                                account.command.code === record.code &&
                                    setCommandAccount(account);
                            });
                            setCommand(record);
                            setopenCommandManage(true);
                        }}
                    >
                        Quản lý
                    </Button>
                );
            },
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
                                style={
                                    openCommandManage && {
                                        transform: "translateX(200px)",
                                        transition: "all .25s linear ",
                                    }
                                }
                                title="Phân quyền truy cập"
                                placement="left"
                                onClose={() => setOpenCommandAccess(false)}
                                visible={openCommandAccess}
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
                                            {user?.username && user?.username}
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
                                            {user?.name_uppercase &&
                                                useCapitalizeTheFirstLetter(
                                                    user?.name_uppercase
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
                                    onClick={() => setOpenCommandAccess(false)}
                                >
                                    Đóng cửa sổ
                                </Button>
                            </Drawer>
                            <Drawer
                                title={
                                    openCreateAccount
                                        ? `Thêm tài khoản "${command.name}"`
                                        : `Thông tin tài khoản "${command.name}"`
                                }
                                placement="left"
                                onClose={() => {
                                    setopenCommandManage(false);
                                    setOpenCreateAccount(false);
                                }}
                                visible={openCommandManage}
                                width={420}
                            >
                                <div className="create-event-container">
                                    <div
                                        style={{ marginTop: 0, padding: 0 }}
                                        className="create-form"
                                    >
                                        <div className="">
                                            {openCreateAccount ? (
                                                <CreateCommandAccount
                                                    setCommandAccount={
                                                        setCommandAccount
                                                    }
                                                    setOpenCreateAccount={
                                                        setOpenCreateAccount
                                                    }
                                                    setopenCommandManage={
                                                        setopenCommandManage
                                                    }
                                                    command={command}
                                                    user={user}
                                                />
                                            ) : !commandAccount ? (
                                                <div>
                                                    <Empty
                                                        style={{ fontSize: 12 }}
                                                        description="Chưa có tài khoản"
                                                    />
                                                    <Button
                                                        onClick={() => {
                                                            setOpenCreateAccount(
                                                                true
                                                            );
                                                        }}
                                                        type="primary"
                                                        style={{
                                                            fontSize: 12,
                                                            backgroundColor:
                                                                "#2c65ac",
                                                            border: "none",
                                                            width: "100%",
                                                            marginTop: 16,
                                                        }}
                                                    >
                                                        Tạo tài khoản
                                                    </Button>
                                                </div>
                                            ) : (
                                                <UpdateCommandAccount
                                                    setCommandAccount={
                                                        setCommandAccount
                                                    }
                                                    setopenCommandManage={
                                                        setopenCommandManage
                                                    }
                                                    commandAccount={
                                                        commandAccount
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Drawer>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
});

export default ListCommandAccountsPage;
