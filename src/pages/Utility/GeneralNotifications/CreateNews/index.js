import {
    ArrowLeftOutlined,
    HomeOutlined,
    LoadingOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Breadcrumb, Button, Form, Input, message, Spin } from "antd";
import Upload from "antd/lib/upload/Upload";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context";
import { observer } from "mobx-react-lite";

import "./style.scss";

const CreateNews = observer(() => {
    let navigate = useNavigate();
    const [form] = Form.useForm();
    const { authStore, generalNotifStore, fileStore } = useContext(AuthContext);
    const [content, setContent] = useState("");
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
    const onFinish = async (fieldsValue) => {
        console.log(
            "fieldsValue?.attachments_request",
            fieldsValue?.attachments_request
        );
        await Promise.all(
            fieldsValue?.attachments_request?.fileList.map((item) =>
                fileStore.uploadFile(item)
            )
        );
        const values = {
            ...fieldsValue,
            content: content,
            attachments_request: { new_items: fileStore.files },
            author: {
                name_lowercase: authStore.user.name_lowercase,
                user_name: authStore.user.username,
            },
        };
        console.log("value", values);
        await generalNotifStore.createNews(values);
        fileStore.files = [];
        navigate(-1);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className="create-event-container">
            <Breadcrumb
                style={{
                    margin: "16px 0",
                    fontWeight: 500,
                    fontSize: 12,
                }}
            >
                <Breadcrumb.Item
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item
                    style={{
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/utility/general-notifications")}
                >
                    Thông báo chung
                </Breadcrumb.Item>
                <Breadcrumb.Item>Đăng thông báo</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ marginBottom: "16px" }}>
                <span
                    className="back-button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <ArrowLeftOutlined />
                </span>
                <span className="create-title">Đăng thông báo</span>
            </div>
            <div className="create-form">
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
                    <Form.Item
                        label="Tiêu đề"
                        name="subject"
                        rules={[
                            {
                                required: true,
                                message: "Bắt buộc!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tiêu đề" />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="content">
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                setContent(editor.getData());
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Tài liệu đính kèm"
                        name="attachments_request"
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>
                                Chọn tài liệu đính kèm
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                marginLeft:'auto',
                                border: "none",
                                minWidth: "150px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "8px 16px",
                            }}
                        >
                            {!generalNotifStore.loading ? (
                                "Đăng thông báo"
                            ) : (
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{ fontSize: 24 }}
                                            spin
                                        />
                                    }
                                />
                            )}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
});

export default CreateNews;
