import { observer } from "mobx-react-lite";
import { AlignLeftOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Pagination, Table, Tabs } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdvancedSearch from "./components/AdvancedSearch";
import useCapitalizeTheFirstLetter from "../../../hook/useCapitalizeFirstLetter";
import { AuthContext } from "../../../context";

const ListCommandAccountsPage = observer(() => {
    const navigate = useNavigate();
    const { usersStore, authStore, departmentsStore} = useContext(AuthContext);
    const [openSelectList, setOpenSelectList] = useState(false);
    const [selects, setSelects] = useState({
        keyword: "",
        department_code: "",
        direction: "",
        sort_by: "",
    });
    const [curentPage, setCurentPage] = useState(0);
    useEffect(() => {
        departmentsStore.getListDepartmentsUsers();
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
    ]);
    
    const columns = [
        {
            title: "Họ tên",
            dataIndex: "name_uppercase",
            key: "name_uppercase",
            // eslint-disable-next-line react-hooks/rules-of-hooks
            render: (text) => (<b>{useCapitalizeTheFirstLetter(text)}</b>),
            width: "25%",
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
            render: (text,record) => text.map(text=>text.name),
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
                        // onClick={() => {
                        //     setAccount(record);
                        //     showModal();
                        // }}
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
    const props={setSelects,selects,setOpenSelectList,openSelectList,departmentsStore,setCurentPage}
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
                        <Tabs.TabPane tab="Tài khoản" key="1" >
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Phần mềm" key="2"  >
                        <AdvancedSearch props={props}/>
    <Table
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
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
});

export default ListCommandAccountsPage;