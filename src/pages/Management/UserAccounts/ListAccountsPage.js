import { observer } from "mobx-react-lite";
import {
    EditOutlined,
    HomeOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Breadcrumb,
    Button,
    Input,
    Modal,
    Pagination,
    Spin,
    Switch,
    Table,
    Tabs,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context";
import useCapitalizeTheFirstLetter from "../../../hook/useCapitalizeFirstLetter";
import AdvancedSearch from "./components/AdvancedSearch";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import "./style.scss";

const ListAccountsPage = observer(() => {
    const navigate = useNavigate();
    const {
        usersStore,
        authStore,
        departmentsStore,
        positionsStore,
        rolesStore,
    } = useContext(AuthContext);
    const [openSelectList, setOpenSelectList] = useState(false);
    const [statusCheck, setStatusCheck] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [account, setAccount] = useState("");
    const [selects, setSelects] = useState({
        keyword: "",
        department_code: "",
        status: "",
        direction: "",
        sort_by: "",
        has_admin: authStore.user.is_admin,
    });
    const [curentPage, setCurentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateUser, setupDateUser] = useState(false);
    useEffect(() => {
        departmentsStore.getListDepartmentsUsers();
        positionsStore.getListPosition();
        rolesStore.getListRoles();
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
        statusCheck,
        updateUser,
    ]);
    const usersList =
        usersStore?.users &&
        usersStore?.users.length > 0 &&
        usersStore?.users?.map((user) => ({
            ...user,
            company: user.company.name,
            company_code: user.company.code,
            position: user.position.name,
            position_code: user.position.code,
            department: user.department.name,
            department_code: user.department.code,
            // eslint-disable-next-line react-hooks/rules-of-hooks
            name_capitalized: useCapitalizeTheFirstLetter(user.name_uppercase),
        }));
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setCreateUser(false);
    };
    const handleCancel = () => {
        usersStore.error = "";
        setIsModalOpen(false);
        setCreateUser(false);
    };
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
            width: "20%",
        },
        {
            title: "ID",
            dataIndex: "username",
            key: "username",
            width: "8%",
        },
        {
            title: "Mã nhân viên",
            dataIndex: "ma_nv",
            key: "ma_nv",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "12%",
        },
        {
            title: "Điện thoại",
            dataIndex: "phone",
            key: "phone",
            render: (text) =>
                text ? <b>{text}</b> : <div className="no-infor">Chưa rõ.</div>,
        },
        {
            title: "Số máy nội bộ",
            dataIndex: "home_phone",
            key: "home_phone",
            render: (text) =>
                text ? <b>{text}</b> : <div className="no-infor">Chưa rõ.</div>,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <Switch
                    checked={text}
                    onChange={async (checked) => {
                        await usersStore.updateUserStatus(checked, record.code);
                        setStatusCheck(!statusCheck);
                    }}
                />
            ),
        },
        {
            title: "Công ty",
            dataIndex: "company",
            key: "company",
            // render: (text) =><div className="general-ellipsis">{text}</div>,
            width: "12%",
        },
        {
            title: "Tác vụ",
            dataIndex: "",
            key: "",
            width: 120,
            fixed: "right",
            render: (text, record) => (
                <>
                    <Button
                        onClick={() => {
                            setAccount(record);
                            showModal();
                        }}
                        type="primary"
                        style={{
                            backgroundColor: "#2c65ac",
                            border: "none",
                            margin: "0 auto",
                        }}
                    >
                        <EditOutlined /> Chỉnh sửa
                    </Button>
                </>
            ),
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
        <>
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
                    <Breadcrumb.Item>Quản lý tài khoản</Breadcrumb.Item>
                </Breadcrumb>
                <Button
                    type="primary"
                    style={{ backgroundColor: "#2c65ac", border: "none" }}
                    onClick={() => setCreateUser(!createUser)}
                >
                    <PlusCircleOutlined />
                    &nbsp; Thêm mới người dùng
                </Button>
            </div>

            <div className="main-container">
                <div className="general-tab">
                    <Tabs
                        defaultActiveKey="1"
                        className="general-tab"
                        onTabClick={(key) => {
                            if (key === "1")
                                navigate("/admin/user-account-management");
                            else navigate("/admin/user-app-management");
                        }}
                    >
                        <Tabs.TabPane tab="Tài khoản" key="1">
                            <AdvancedSearch props={props} />
                            <Spin spinning={usersStore.loading}>
                                <Table
                                    columns={columns}
                                    rowKey={(record) => record.code}
                                    dataSource={usersList}
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
                            </Spin>
                            {createUser && (
                                <Modal
                                    title="Thêm mới người dùng"
                                    visible={true}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    footer={false}
                                >
                                    <CreateUser
                                        departments={
                                            departmentsStore.departments
                                        }
                                        positions={positionsStore.positions}
                                        roles={rolesStore.roles}
                                        handleCancel={handleCancel}
                                    />
                                </Modal>
                            )}
                            <Modal
                                title="Sửa thông tin người dùng"
                                visible={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                footer={false}
                            >
                                <UpdateUser
                                    account={account}
                                    departments={departmentsStore.departments}
                                    positions={positionsStore.positions}
                                    roles={rolesStore.roles}
                                    handleCancel={handleCancel}
                                    updateUser={updateUser}
                                    setupDateUser={setupDateUser}
                                />
                            </Modal>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Phần mềm" key="2"></Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
});

export default ListAccountsPage;
