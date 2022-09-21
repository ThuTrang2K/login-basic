import {
    CloseCircleOutlined,
    FilterOutlined,
    HomeOutlined,
    PlusCircleOutlined,
    PrinterOutlined,
} from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    DatePicker,
    Input,
    Pagination,
    Select,
    Space,
    Spin,
    Table,
    Tabs,
} from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context";
import vi from "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const SignDocPage =observer(() => {
    const { internalDocsStore } = useContext(AuthContext);
    const [curentPage, setCurentPage] = useState(0);
    const navigate = useNavigate();
    const [openSelectList, setOpenSelectList] = useState(false);
    useEffect(() => {
        internalDocsStore.getListElectronic(curentPage);
    }, [curentPage]);
    const columns = [
        {
            title: "Tiêu đề",
            dataIndex: "",
            key: "",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "15%",
        },
        {
            title: "Người trình ký",
            dataIndex: "",
            key: "",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "15%",
        },
        {
            title: "Lãnh đạo ký",
            dataIndex: "",
            key: "",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "15%",
        },
        {
            title: "Trạng thái",
            dataIndex: "",
            key: "",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "15%",
        },
        {
            title: "Ngày trình",
            dataIndex: "",
            key: "",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "15%",
        },
    ];
    const breadcrumb =[{url:'/internal-document/incoming-document', title: 'Quản lý VB nội bộ'},{url:'/internal-document/sign-document', title: 'Phát hành văn bản điện tử'}]
    return (
        <>
            <div className="general-flex-header">
                <Breadcrumbs items={breadcrumb}/>
                <Button
                    type="primary"
                    style={{ backgroundColor: "#2c65ac", border: "none" }}
                    // onClick={() => setCreateUser(!createUser)}
                >
                    <PlusCircleOutlined />
                    &nbsp; Tạo trình ký
                </Button>
            </div>

            <div className="main-container">
                <div className="general-tab">
                    <Tabs
                        defaultActiveKey="3"
                        className="general-tab"
                        onTabClick={(key) => {
                            key === "1"
                                ? navigate(
                                      "/internal-document/incoming-document"
                                  )
                                : key === "2"
                                ? navigate(
                                      "/internal-document/outgoing-document"
                                  )
                                : navigate("/internal-document/sign-document");
                        }}
                    >
                        <Tabs.TabPane tab="Văn bản đến" key="1"></Tabs.TabPane>
                        <Tabs.TabPane tab="Văn bản đi" key="2"></Tabs.TabPane>
                        <Tabs.TabPane tab="Văn bản điện tử" key="3">
                            <div className="general-flex-header">
                                {!openSelectList && (
                                    <Space direction="vertical">
                                        <Search
                                            className="general-search"
                                            placeholder="Tìm kiếm theo trình ký theo tiêu đề..."
                                            // onSearch={(value) => {
                                            //     props.setCurentPage(0);
                                            //     props.setSelects({
                                            //         ...props.selects,
                                            //         keyword: value,
                                            //     });
                                            // }}
                                            enterButton
                                        />
                                    </Space>
                                )}
                                <div
                                    style={{
                                        display: "flex",
                                        marginLeft: "auto",
                                    }}
                                >
                                    <Button
                                        onClick={() => {
                                            setOpenSelectList(!openSelectList);
                                            // setSelects({});
                                        }}
                                    >
                                        {!openSelectList ? (
                                            <>
                                                <FilterOutlined /> &nbsp; Tìm
                                                kiếm nâng cao
                                            </>
                                        ) : (
                                            <>
                                                <CloseCircleOutlined />
                                                &nbsp; Tắt tìm kiếm nâng cao
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        style={{
                                            marginLeft: 8,
                                        }}
                                        onClick={() => {}}
                                    >
                                        <PrinterOutlined />
                                        In
                                    </Button>
                                </div>
                            </div>
                            {openSelectList && (
                                <div className="select-list-wrap">
                                    <div className="select-item">
                                        <p>Tiêu đề</p>
                                        <Search
                                            placeholder="Nhập trích yếu văn bản"
                                            //   onSearch={onSearch}
                                        />
                                    </div>
                                    <div className="select-item">
                                        <p>Trạng thái</p>
                                        <Select
                                            placeholder="--Chọn trạng thái--"
                                            style={{
                                                width: "100%",
                                            }}
                                            // onChange={(value) => {
                                            //     props.setCurentPage(0);
                                            //     props.setSelects({
                                            //         ...props.selects,
                                            //         department_code: value,
                                            //     });
                                            // }}
                                        >
                                            {/* {props.departmentsStore?.departments.length > 0 &&
                                props.departmentsStore?.departments.map(
                                    (department) => (
                                        <Option
                                            value={department.code}
                                            key={department.title}
                                        >
                                            {department.title}
                                        </Option>
                                    )
                                )} */}
                                        </Select>
                                    </div>
                                    <div className="select-item">
                                        <p>Ngày trình</p>
                                        <RangePicker
                                            locale={locale}
                                            format={(value) => {
                                                return value.format(
                                                    "DD-MM-YYYY"
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                            <Spin size="large"  spinning={internalDocsStore.loading}>
                            <Table
                                // style={{overflowX:"scroll"}}
                                columns={columns}
                                rowKey={(record) => record.code}
                                dataSource={internalDocsStore.electronic}
                                scroll={{
                                    x: 1100,
                                }}
                            />
                            <Pagination
                                className="contacts-users-pagination"
                                defaultCurrent={curentPage + 1}
                                current={curentPage + 1}
                                pageSize={10}
                                total={internalDocsStore?.total_electronic_count}
                                onChange={(page) => {
                                    setCurentPage(page - 1);
                                }}
                            />
                            </Spin>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
});

export default SignDocPage;
