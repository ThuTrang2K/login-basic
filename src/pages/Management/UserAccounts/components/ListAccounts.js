import {
    Avatar,
    Button,
    Form,
    Input,
    Modal,
    Pagination,
    Select,
    Space,
    Switch,
    Table,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AuthContext } from "../../../../context";
import useCapitalizeTheFirstLetter from "../../../../hook/useCapitalizeFirstLetter";
import {
    CloseCircleOutlined,
    EditOutlined,
    FilterOutlined,
} from "@ant-design/icons";
import UpdateAccount from "./UpdateAccount";

const { Search } = Input;
const { Option } = Select;
const ListAccounts = observer(() => {
    const { usersStore, authStore, departmentsStore,positionsStore,rolesStore } = useContext(AuthContext);
    const [openSelectList, setOpenSelectList] = useState(false);
    const [statusCheck, setStatusCheck] = useState(false);
    const [account, setAccount] = useState("");
    const [selects, setSelects] = useState({
        keyword: "",
        department_code: "",
        status: "",
        direction: "",
        sort_by: "",
    });
    const [curentPage, setCurentPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        departmentsStore.getListDepartmentsUsers();
        positionsStore.getListPosition();
        rolesStore.getListRoles();
        console.log(departmentsStore.departments);
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
            department_code:user.department.code,
            name_capitalized: useCapitalizeTheFirstLetter(user.name_uppercase),
        }));
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
            dataIndex: "status",
            key: "status",
            render: (text, record) => (
                <Switch 
                    checked={text}
                    onChange={async (checked) => {
                        console.log(`switch to ${checked}`);
                        await usersStore.UpdateUserStatus(checked, record.code);
                        await setStatusCheck(!statusCheck);
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

    return (
        <>
            <div className="general-flex-header">
                <Space direction="vertical">
                    <Search
                        className="general-search"
                        placeholder="Tìm kiếm theo tên hoặc username"
                        onSearch={(value) => {
                            setSelects({ ...selects, keyword: value });
                        }}
                        enterButton
                    />
                </Space>
                <Button
                    onClick={() => {
                        setOpenSelectList(!openSelectList);
                        setSelects({});
                    }}
                >
                    {!openSelectList ? (
                        <>
                            <FilterOutlined /> &nbsp; Tìm kiếm nâng cao
                        </>
                    ) : (
                        <>
                            <CloseCircleOutlined />
                            &nbsp; Tắt tìm kiếm nâng cao
                        </>
                    )}
                </Button>
            </div>
            {openSelectList && (
                <div className="select-list">
                    <div className="select-item">
                        <p>Sắp xếp theo</p>
                        <Select
                            placeholder="Sắp xếp theo"
                            style={{
                                width: "100%",
                            }}
                            onChange={(value) => {
                                setSelects({ ...selects, sort_by: value });
                            }}
                        >
                            <Option value="nameUppercase">Họ tên</Option>
                            <Option value="username">Tên đăng nhập</Option>
                        </Select>
                    </div>
                    <div className="select-item">
                        <p>Thứ tự</p>
                        <Select
                            placeholder="Lựa chọn"
                            style={{
                                width: "100%",
                            }}
                            onChange={(value) => {
                                setSelects({ ...selects, direction: value });
                            }}
                        >
                            <Option value="ASC">Tăng dần</Option>
                            <Option value="DESC">Giảm dần</Option>
                        </Select>
                    </div>
                    <div className="select-item">
                        <p>Trạng thái</p>
                        <Select
                            placeholder="Trạng thái"
                            style={{
                                width: "100%",
                            }}
                            onChange={(value) => {
                                setSelects({ ...selects, status: value });
                            }}
                        >
                            <Option value="true">Active</Option>
                            <Option value="false">Inactive</Option>
                        </Select>
                    </div>
                    <div className="select-item">
                        <p>Phòng ban</p>
                        <Select
                            placeholder="Phòng ban"
                            style={{
                                width: "100%",
                            }}
                            onChange={(value) => {
                                setSelects({
                                    ...selects,
                                    department_code: value,
                                });
                            }}
                        >
                            {departmentsStore?.departments.length > 0 &&
                                departmentsStore?.departments.map(
                                    (department) => (
                                        <Option value={department.code}>
                                            {department.title}
                                        </Option>
                                    )
                                )}
                        </Select>
                    </div>
                </div>
            )}

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
            <Modal
                title="Sửa thông tin người dùng"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <UpdateAccount account={account} departments={departmentsStore.departments}  positions={positionsStore.positions} roles={rolesStore.roles} handleCancel={handleCancel}/>
            </Modal>
        </>
    );
});

export default ListAccounts;
