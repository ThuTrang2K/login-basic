import {
    CloseCircleOutlined,
    FilterOutlined,
    PlusCircleOutlined,
    PrinterOutlined,
} from "@ant-design/icons";
import {
    Badge,
    Button,
    DatePicker,
    Input,
    Pagination,
    Select,
    Space,
    Spin,
    Table,
    Tabs,
    Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context";
import AdvancedSearch from "../../Management/UserAccounts/components/AdvancedSearch";
import "./style.scss";
import vi from "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import { observer } from "mobx-react-lite";
import moment from "moment";

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;
const IncomingDocPage = observer(() => {
    const { internalDocsStore ,authorityIssuedsStore} = useContext(AuthContext);
    const [curentPage, setCurentPage] = useState(0);
    const navigate = useNavigate();
    const [openSelectList, setOpenSelectList] = useState(false);
    const [selects, setSelects] = useState({
        title: "",
        incoming_date: "",
        date_issued: "",
        signer: "",
        authority_name: "",
    });
    const [searchCount, setSearchCount] = useState(0);
    useEffect(() => {
        authorityIssuedsStore.getListAuthorityIssueds("INCOMING");
    }, []);
    useEffect(() => {
        console.log("hello");
        internalDocsStore.getListIncoming(curentPage, selects);
        setSearchCount(Object.values(selects).filter((item) => item).length);
    }, [curentPage, selects]);
    const columns = [
        {
            title: "Số đến",
            dataIndex: "incoming_number",
            key: "incoming_number",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "7%",
        },
        {
            title: "Số hiệu",
            dataIndex: "document_number",
            key: "document_number",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "12%",
        },
        {
            title: "Ngày đến",
            dataIndex: "incoming_date",
            key: "incoming_date",
            render: (text) =>
                text ? (
                    moment(text).locale("vi", vi).format("DD-MM-YYYY")
                ) : (
                    <div className="no-infor">Chưa rõ.</div>
                ),
            width: "8%",
        },
        {
            title: "Ngày văn bản",
            dataIndex: "date_issued",
            key: "date_issued",
            render: (text) =>
                text ? (
                    moment(text).locale("vi", vi).format("DD-MM-YYYY")
                ) : (
                    <div className="no-infor">Chưa rõ.</div>
                ),
            width: "8%",
        },
        {
            title: "Trạng thái",
            dataIndex: "document_status",
            key: "document_status",
            render: (text) =>
                text === "INPROGRESS" ? (
                    <div className="inprogress">Đã bút phê</div>
                ) : (
                    <div className="pending">Chờ sử lý</div>
                ),
            width: "10%",
        },
        {
            title: "Trích yếu",
            dataIndex: "title",
            key: "title",
            render: (text) =>
                text ? (
                    <Text ellipsis style={{ width: 230 }}>
                        {text}
                    </Text>
                ) : (
                    <div className="no-infor">Chưa rõ.</div>
                ),
            width: "12%",
        },
        {
            title: "Cơ quan ban hành",
            dataIndex: "authority_issued_name",
            key: "authority_issued_name",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "20%",
        },
        {
            title: "Lãnh đạo xử lý",
            dataIndex: "handler",
            key: "handler",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "15%",
        },
    ];
    const breadcrumb = [
        {
            url: "/internal-document/incoming-document",
            title: "Quản lý VB nội bộ",
        },
        { url: "/internal-document/incoming-document", title: "Văn bản đến" },
    ];
    return (
        <>
            <div className="general-flex-header">
                <Breadcrumbs items={breadcrumb} />
                <Button
                    type="primary"
                    style={{ backgroundColor: "#2c65ac", border: "none" }}
                    onClick={() =>
                        navigate("/internal-document/incoming-document/create")
                    }
                >
                    <PlusCircleOutlined />
                    &nbsp; Tạo mới văn bản đến
                </Button>
            </div>

            <div className="main-container">
                <div className="general-tab">
                    <Tabs
                        defaultActiveKey="1"
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
                        <Tabs.TabPane tab="Văn bản đến" key="1">
                            <div className="general-flex-header">
                                {!openSelectList && (
                                    <Space direction="vertical">
                                        <Search
                                            allowClear
                                            defaultValue={selects.title}
                                            className="general-search"
                                            placeholder="Tìm kiếm theo Trích yếu / Số hiệu / Số đến"
                                            onSearch={(value) => {
                                                setCurentPage(0);
                                                setSelects({
                                                    ...selects,
                                                    title: value,
                                                });
                                            }}
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
                                    <Badge
                                        style={{
                                            backgroundColor: "rgb(91, 140, 0)",
                                        }}
                                        count={searchCount}
                                    >
                                        <Button
                                            onClick={() => {
                                                setOpenSelectList(
                                                    !openSelectList
                                                );
                                                setSelects({
                                                    title: selects.title,
                                                });
                                            }}
                                        >
                                            {!openSelectList ? (
                                                <>
                                                    <FilterOutlined /> &nbsp;
                                                    Tìm kiếm nâng cao
                                                </>
                                            ) : (
                                                <>
                                                    <CloseCircleOutlined />
                                                    &nbsp; Tắt tìm kiếm nâng cao
                                                </>
                                            )}
                                        </Button>
                                    </Badge>

                                    <Button
                                        style={{
                                            marginLeft: 14,
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
                                        <p>Trích yếu / Số hiệu / Số đến</p>
                                        <Search
                                            placeholder="Nhập từ khóa tìm kiếm"
                                            allowClear
                                            defaultValue={selects.title}
                                            onSearch={(value) => {
                                                setCurentPage(0);
                                                setSelects({
                                                    ...selects,
                                                    title: value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="select-item">
                                        <p>Ngày đến</p>
                                        <RangePicker
                                            locale={locale}
                                            format={(value) => {
                                                return value.format(
                                                    "DD-MM-YYYY"
                                                );
                                            }}
                                            allowClear
                                            onChange={(date) => {
                                                setCurentPage(0);
                                                setSelects({
                                                    ...selects,
                                                    incoming_date: date,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="select-item">
                                        <p>Ngày ban hành</p>
                                        <RangePicker
                                            locale={locale}
                                            format={(value) => {
                                                return value.format(
                                                    "DD-MM-YYYY"
                                                );
                                            }}
                                            allowClear
                                            onChange={(date) => {
                                                setCurentPage(0);
                                                setSelects({
                                                    ...selects,
                                                    date_issued: date,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="select-item">
                                        <p>Người kí</p>
                                        <Search
                                            allowClear
                                            placeholder="Người kí"
                                            onSearch={(value) => {
                                                setCurentPage(0);
                                                setSelects({
                                                    ...selects,
                                                    signer: value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="select-item">
                                        <p>Cơ quan ban hành</p>
                                        <Select
                                            showSearch
                                            allowClear
                                            placeholder="--Chọn hoặc nhập cơ quan ban hành--"
                                            style={{
                                                width: "100%",
                                            }}
                                            onChange={(value) => {
                                                setCurentPage(0);
                                                setSelects({
                                                    ...selects,
                                                    authority_name: value,
                                                });
                                            }}
                                        >
                                            {internalDocsStore?.authorityIssueds
                                                ?.length > 0 &&
                                                internalDocsStore?.authorityIssueds.map(
                                                    (authorityIssued) => (
                                                        <Option
                                                            value={
                                                                authorityIssued.name
                                                            }
                                                            key={
                                                                authorityIssued.id
                                                            }
                                                        >
                                                            {
                                                                authorityIssued.name
                                                            }
                                                        </Option>
                                                    )
                                                )}
                                        </Select>
                                    </div>
                                </div>
                            )}
                            <Spin
                                size="large"
                                spinning={internalDocsStore.loading}
                                tip="Đang tải văn bản..."
                            >
                                <Table
                                    style={{cursor:"pointer"}}
                                    columns={columns}
                                    rowKey={(record) => record.code}
                                    dataSource={internalDocsStore?.incoming}
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: (event) => {
                                                navigate(
                                                    `view/${record.code}`
                                                );
                                            }, // click row
                                        };
                                    }}
                                    scroll={{
                                        x: 1200,
                                    }}
                                />
                                <Pagination
                                    className="contacts-users-pagination"
                                    defaultCurrent={curentPage + 1}
                                    current={curentPage + 1}
                                    pageSize={10}
                                    total={
                                        internalDocsStore?.total_incoming_count
                                    }
                                    onChange={(page) => {
                                        setCurentPage(page - 1);
                                    }}
                                />
                            </Spin>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Văn bản đi" key="2"></Tabs.TabPane>
                        <Tabs.TabPane
                            tab="Văn bản điện tử"
                            key="3"
                        ></Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
});

export default IncomingDocPage;
