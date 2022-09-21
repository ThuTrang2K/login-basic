import { CloseCircleOutlined, FilterOutlined, HomeOutlined, PlusCircleOutlined, PrinterOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, DatePicker, Input, Pagination, Select, Space, Spin, Table, Tabs, Typography } from 'antd';
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context';
import vi from "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import Breadcrumbs from '../../../components/Layout/Breadcrumbs';
import moment from 'moment';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text } = Typography;
const OutgoingDocPage = observer(() => {
        const { internalDocsStore } = useContext(AuthContext);
        const [curentPage, setCurentPage] = useState(0);
    const navigate = useNavigate();
    const [openSelectList, setOpenSelectList] = useState(false);
    useEffect(() => {
        internalDocsStore.getListOutgoing(curentPage);
    }, [curentPage]);
    const columns = [
        {
            title: "Ngày đi",
            dataIndex: "outgoing_date",
            key: "outgoing_date",
            render: (text) =>
                text ? moment(text)
                .locale("vi", vi)
                .format("DD-MM-YYYY") : <div className="no-infor">Chưa rõ.</div>,
            width: "8%",
        },
        {
            title: "Số hiệu",
            dataIndex: "document_number",
            key: "document_number",
            render: (text) =>
            text ? <Text ellipsis
            style={ {  width: 90 } }
          >
            {text}
          </Text> : <div className="no-infor">Chưa rõ.</div>,
            width: "10%",
        },
        {
            title: "Trích yếu",
            dataIndex: "title",
            key: "title",
            render: (text) =>
                text ? <Text ellipsis
                style={ {  width: 400 } }
              >
                {text}
              </Text> : <div className="no-infor">Chưa rõ.</div>,
            width: "20%",
        },
        {
            title: "Cơ quan ban hành",
            dataIndex: "authority_issued",
            key: "authority_issued",
            render: (text) =>
                text ? text : <div className="no-infor">Chưa rõ.</div>,
            width: "15%",
        },
        {
            title: "Người ký",
            dataIndex: "signer",
            key: "signer",
            render: (text) =>
                text ? <Text ellipsis
                style={ {  width: 150 } }
              >
                {text}
              </Text> : <div className="no-infor">Chưa rõ.</div>,
            width: "15%",
        },
    ];
    const breadcrumb =[{url:'/internal-document/incoming-document', title: 'Quản lý VB nội bộ'},{url:'/internal-document/outgoing-document', title: 'Văn bản đi'}]
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
                    &nbsp; Tạo mới văn bản đi
                </Button>
            </div>

            <div className="main-container">
                <div className="general-tab">
                    <Tabs
                        defaultActiveKey="2"
                        className="general-tab"
                        onTabClick={(key) => {
                            key === "1"?navigate("/internal-document/incoming-document"):key === "2"? navigate("/internal-document/outgoing-document"): navigate("/internal-document/sign-document");
                        }}
                    >
                        <Tabs.TabPane tab="Văn bản đến" key="1">
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Văn bản đi" key="2">
                        <div className="general-flex-header">
                                {!openSelectList && (
                                    <Space direction="vertical">
                                        <Search
                                            className="general-search"
                                            placeholder="Tìm kiếm theo Trích yếu / Số hiệu"
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
                                        <p>Trích yếu / Số hiệu</p>
                                        <Search
                                            placeholder="Nhập từ khóa tìm kiếm"
                                            //   onSearch={onSearch}
                                        />
                                    </div>
                                    <div className="select-item">
                                        <p>Nhóm sổ văn bản</p>
                                        <Select
                                            placeholder="--Chọn nhóm sổ văn bản--"
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
                                        <p>Sổ văn bản</p>
                                        <Select
                                            placeholder="--Chọn sổ văn bản--"
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
                                        <p>Ngày ban hành</p>
                                        <RangePicker locale={locale}
                                            format={(value) => {
                                                return value.format(
                                                    "DD-MM-YYYY"
                                                );
                                            }}/>
                                    </div>
                                    <div className="select-item">
                                        <p>Loại văn bản</p>
                                        <Select
                                            placeholder="--Chọn loại văn bản--"
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
                                        <p>Mức độ sử lý</p>
                                        <Select
                                            placeholder="--Chọn độ khẩn--"
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
                                        <p>Cơ quan ban hành</p>
                                        <Select
                                            placeholder="--Chọn hoặc nhập cơ quan ban hành--"
                                            style={{
                                                width: "100%",
                                            }}
                                            // onChange={(value) => {
                                            //     props.setCurentPage(0);
                                            //     pro  ps.setSelects({
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
                                        <p>Người kí</p>
                                        <Search
                                            placeholder="Người kí"
                                            //   onSearch={onSearch}
                                        />
                                    </div>
                                </div>
                            )}
                            <Spin size="large"  spinning={internalDocsStore.loading}>
                            <Table
                                // style={{overflowX:"scroll"}}
                                columns={columns}
                                rowKey={(record) => record.code}
                                dataSource={internalDocsStore?.outgoing}
                                scroll={{
                                        x: 1100,
                                    }}
                            />
                            <Pagination
                                className="contacts-users-pagination"
                                defaultCurrent={curentPage + 1}
                                current={curentPage + 1}
                                pageSize={10}
                                total={internalDocsStore?.total_outgoing_count}
                                onChange={(page) => {
                                    setCurentPage(page - 1);
                                }}
                            />
                            </Spin>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Văn bản điện tử" key="3"></Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        </>
    );
});

export default OutgoingDocPage;