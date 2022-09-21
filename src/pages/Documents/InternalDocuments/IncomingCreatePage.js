import {
    Avatar,
    Button,
    Checkbox,
    Collapse,
    DatePicker,
    Form,
    Input,
    Modal,
    Select,
    TimePicker,
    Tooltip,
    Upload,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Layout/Breadcrumbs";
import vi from "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { AuthContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./style.scss";
import {
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import ListUsersModel from "./components/ListUsersModel";

const { Option } = Select;
const IncomingCreatePage = observer(() => {
    const { internalDocsStore } = useContext(AuthContext);
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const [bookGroupId, setBookGroupId] = useState(
        internalDocsStore?.bookGroups[0]?.id
    );
    const [bookId, setBookId] = useState(internalDocsStore?.books[0]?.id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectUsers, setSelectUsers] = useState({
        leader: "",
    });
    useEffect(() => {
        internalDocsStore.getListBookGroups("DEN");
        internalDocsStore.getListUsers();
        internalDocsStore.getListCompanies();
        internalDocsStore.getListAuthorityIssueds("INCOMING");
    }, []);
    useEffect(() => {
        internalDocsStore.getListBooks(bookGroupId);
    }, [bookGroupId]);
    useEffect(() => {
        internalDocsStore.getIncomingNumber(bookId);
    }, [bookId]);
    const showModal = () => {
        setIsModalOpen(true);
    };

    
    const onFinish = async (fieldsValue) => {
        const values = {
            // ...fieldsValue,
            // start_date: fieldsValue["start_at"].toISOString(),
            // end_at:
            //     fieldsValue["end_time"] &&
            //     fieldsValue["end_time"].toISOString(),
            // start_at: moment(
            //     `${fieldsValue["start_at"].format("YYYY-MM-DD")} ${fieldsValue[
            //         "start_time"
            //     ].format("HH:mm:ss")}`
            // )
            //     .locale("vi", vi)
            //     .toISOString(),
            // start_time: fieldsValue["start_time"].toISOString(),
            // end_time:
            //     fieldsValue["end_time"] &&
            //     fieldsValue["end_time"].toISOString(),
        };
        console.log("value", values);

        // await eventStore.createEvent(values);
        navigate(-1);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const breadcrumb = [
        {
            url: "/internal-document/incoming-document",
            title: "Quản lý VB nội bộ",
        },
        { url: "/internal-document/incoming-document", title: "Văn bản đến" },
        {
            url: "/internal-document/incoming-document/create",
            title: "Tạo văn bản đến",
        },
    ];
    const props = {
        name: "file",
        multiple: true,
        beforeUpload: (file) => {
            return false;
        },
        headers: {
            authorization: "authorization-text",
        },
    };
    return (
        <div className="create-event-container">
            <div className="general-flex-header">
                <Breadcrumbs items={breadcrumb} />
            </div>

            <div className="create-form">
                <div className="">
                    <Form
                        form={form}
                        className=""
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="flex-column">
                            <Form.Item
                                style={{ width: "100%" }}
                                name="book_group_id"
                                label="Nhóm sổ văn bản"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Select
                                    defaultValue={[
                                        `${internalDocsStore?.bookGroups[0]?.name}`,
                                    ]}
                                    placeholder="--Chọn nhóm sổ văn bản--"
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(value) => {
                                        setBookGroupId(value);
                                    }}
                                >
                                    {internalDocsStore?.bookGroups.length > 0 &&
                                        internalDocsStore?.bookGroups.map(
                                            (bookGroup) => (
                                                <Option
                                                    value={bookGroup.id}
                                                    key={bookGroup.name}
                                                >
                                                    {bookGroup.name}
                                                </Option>
                                            )
                                        )}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="book_id"
                                label="Sổ văn bản"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Select
                                    defaultValue={
                                        internalDocsStore?.books[0]?.name
                                    }
                                    placeholder="--Chọn nhóm sổ văn bản--"
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={(value) => {
                                        setBookId(value);
                                    }}
                                >
                                    {internalDocsStore?.books.length > 0 &&
                                        internalDocsStore?.books.map((book) => (
                                            <Option
                                                value={book.id}
                                                key={book.name}
                                            >
                                                {book.name}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="flex-column">
                            <Form.Item
                                label="Số hiệu"
                                name="document_number"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số hiệu văn bản" />
                            </Form.Item>
                            <Form.Item
                                label="Số đến"
                                name="location"
                                value={internalDocsStore?.incoming_number}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số đến" />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Trích yếu"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc!",
                                },
                            ]}
                        >
                            <textarea
                                placeholder="Nhập trích yếu văn bản"
                                name=""
                                id=""
                                className="incoming-textarea"
                                rows="10"
                            ></textarea>
                        </Form.Item>
                        <div className="flex-column">
                            <Form.Item
                                style={{ width: "100%" }}
                                name="outgoing_date"
                                label="Ngày đến"
                                rules={[
                                    {
                                        type: "object",
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <DatePicker
                                    locale={locale}
                                    style={{ width: "100%" }}
                                    // defaultValue={moment()}
                                    initialValues={moment()}
                                    format={`DD/MM/YYYY`}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="date_issued"
                                label="Ngày văn bản"
                            >
                                <DatePicker
                                    locale={locale}
                                    style={{ width: "100%" }}
                                    // defaultValue={moment()}
                                    initialValues={moment()}
                                    format={`DD/MM/YYYY`}
                                />
                            </Form.Item>
                        </div>
                        <div className="flex-column">
                            <Form.Item
                                style={{ width: "100%" }}
                                name="signer"
                                label="Người ký"
                            >
                                <Input placeholder="Nhập tên người ký"></Input>
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="urgency_level"
                                label="Độ khẩn"
                            >
                                <Select
                                    placeholder="--Chọn độ khẩn--"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <Option value={"001"} key={"Khẩn"}>
                                        Khẩn
                                    </Option>
                                    <Option value={"002"} key={"Hỏa tốc"}>
                                        Hỏa tốc
                                    </Option>
                                    <Option
                                        value={"003"}
                                        key={"Hỏa tốc hẹn giờ"}
                                    >
                                        Hỏa tốc hẹn giờ
                                    </Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Tài liệu đính kèm"
                            name="file_ids"
                            rules={[
                                {
                                    type: "object",
                                    required: true,
                                    message: "Bắt buộc!",
                                },
                            ]}
                        >
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>
                                    Chọn tài liệu đính kèm
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Cơ quan ban hành"
                            name="authority_issued_id"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc!",
                                },
                            ]}
                        >
                            <div className="flex-column">
                                <Select
                                    placeholder="--Chọn cơ quan ban hành--"
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    {internalDocsStore?.authorityIssueds
                                        ?.length > 0 &&
                                        internalDocsStore?.authorityIssueds?.map(
                                            (authorityIssued) => (
                                                <Option
                                                    value={authorityIssued.id}
                                                    key={authorityIssued.name}
                                                >
                                                    {authorityIssued.name}
                                                </Option>
                                            )
                                        )}
                                </Select>
                                <Button
                                    style={{ width: 80 }}
                                    className="secondary-button"
                                >
                                    Tạo mới
                                </Button>
                            </div>
                        </Form.Item>
                        <div style={{ marginTop: 54, fontWeight: 600 }}>
                            Thông tin phân phát
                        </div>
                        <div className="box-shadow">
                            <div className="flex-column">
                                <div>
                                    <span>Lãnh đạo sử lý:</span>
                                    <Tooltip
                                        title="Chọn người dùng"
                                        color="rgb(44, 101, 172)"
                                        key="rgb(44, 101, 173)"
                                    >
                                        <Button
                                            className="button-icon button-user secondary-button"
                                            onClick={showModal}
                                        >
                                            <UserOutlined />
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <span>Người sử lý:</span>
                                    <Tooltip
                                        title="Chọn người dùng"
                                        color="rgb(44, 101, 172)"
                                        key="rgb(44, 101, 173)"
                                    >
                                        <Button
                                            className="button-icon button-user secondary-button"
                                            onClick={showModal}
                                        >
                                            <UserOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        title="Chọn nhóm"
                                        color="rgb(255, 192, 105)"
                                        key="rgb(44, 101, 174)"
                                    >
                                        <Button className="button-icon secondary-button button-group">
                                            <TeamOutlined />
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <span>Phối hợp/ Theo dõi:</span>
                                    <Tooltip
                                        title="Chọn người dùng"
                                        color="rgb(44, 101, 172)"
                                        key="rgb(44, 101, 175)"
                                    >
                                        <Button
                                            className="button-icon button-user secondary-button"
                                            onClick={showModal}
                                        >
                                            <UserOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip
                                        title="Chọn nhóm"
                                        color="rgb(255, 192, 105)"
                                        key="rgb(44, 101, 172)"
                                    >
                                        <Button className="button-icon secondary-button button-group">
                                            <TeamOutlined />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="flex-column">
                                <Form.Item
                                    style={{ width: "100%" }}
                                    name="start_at"
                                    label="Ngày bắt đầu"
                                >
                                    <DatePicker
                                        locale={locale}
                                        style={{ width: "100%" }}
                                        // defaultValue={moment()}
                                        initialValues={moment()}
                                        format={`DD/MM/YYYY`}
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    name="start_at"
                                    label="Ngày kết thúc"
                                >
                                    <DatePicker
                                        locale={locale}
                                        style={{ width: "100%" }}
                                        // defaultValue={moment()}
                                        initialValues={moment()}
                                        format={`DD/MM/YYYY`}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item style={{ textAlign: "right" }}>
                            <Button
                                className="secondary-button"
                                style={{
                                    marginTop: "16px",
                                    marginRight: 8,
                                }}
                                // onClick={() => handleCancel()}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{
                                    marginTop: "16px",
                                    backgroundColor: "#2c65ac",
                                    border: "none",
                                }}
                            >
                                Tạo văn bản
                            </Button>
                        </Form.Item>
                        <ListUsersModel setIsModalOpen={setIsModalOpen} companies={internalDocsStore?.companies} isModalOpen={isModalOpen} users={internalDocsStore?.users} selectUsers={selectUsers} setSelectUsers={setSelectUsers}/>
                    </Form>
                </div>
            </div>
        </div>
    );
});

export default IncomingCreatePage;

//
