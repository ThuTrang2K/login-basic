import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Breadcrumb, Button, Form, Input, Upload } from "antd";
import {
    ArrowLeftOutlined,
    HomeOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../../context";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const UpdateNews = observer(() => {
    const navigate = useNavigate();
    const { news_id } = useParams();
    const { authStore, fileStore, generalNotifStore } = useContext(AuthContext);
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        async function fetchData() {
            await generalNotifStore.getNewsById(news_id);
            setFileList(
                generalNotifStore.newsDetail?.attachments &&
                    generalNotifStore.newsDetail?.attachments.map((item) => ({
                        uid: item.file_id,
                        name: item.file_name,
                        status: "done",
                    }))
            );
        }
        fetchData();
    }, [news_id]);
    const [form] = Form.useForm();
    const [content, setContent] = useState(
        generalNotifStore.newsDetail?.content
    );
    generalNotifStore.newsDetail &&
        form.setFieldsValue({
            subject: generalNotifStore.newsDetail?.subject,
        });
    const onFinish = async (fieldsValue) => {
        const allFiles = generalNotifStore?.newsDetail?.attachments
            ? generalNotifStore?.newsDetail?.attachments.map(
                  (file) => file.file_id
              )
            : [];
        const fileListNew = fieldsValue?.attachments_request?.fileList;
        const newFiles = fileListNew
            ? fileListNew.filter((file) => file.status !== "done")
            : [];
        const oldFiles = fileListNew
            ? fileListNew
                  .filter((file) => file.status === "done")
                  .map((file) => file.uid)
            : [];
        console.log(allFiles, oldFiles);
        newFiles &&
            (await Promise.all(
                newFiles.map((item) => fileStore.uploadFile(item))
            ));
        const attachments_request = {
            new_items: fileStore.files ? fileStore.files : [],
            remove_items: oldFiles
                ? allFiles.filter((file) => !oldFiles.includes(file))
                : [],
        };
        const values = {
            ...fieldsValue,
            content: content,
            id: news_id,
            attachments_request: attachments_request,
            author: {
                name_lowercase: authStore.user.name_lowercase,
                user_name: authStore.user.username,
            },
        };
        console.log("value", values);

        await generalNotifStore.UpdateNews(values);
        fileStore.files = [];
        navigate(-1);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const props = {
        name: "file",
        multiple: true,
        beforeUpload: (file) => {
            return false;
        },
        fileList: fileList,
        // fileList:generalNotifStore.newsDetail?.attachments
        // && generalNotifStore.newsDetail?.attachments.map((item) => ({
        //       uid: item.file_id,
        //       name: item.file_name,
        //       status: "done",
        //   })),
        onChange({ file, fileList }) {
            setFileList(fileList);
        },
    };
    if (!generalNotifStore.newsDetail) return null;
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
                    Th??ng b??o chung
                </Breadcrumb.Item>
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
                <span className="create-title">S???a th??ng tin</span>
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
                        label="Ti??u ?????"
                        name="subject"
                        rules={[
                            {
                                required: true,
                                message: "B???t bu???c!",
                            },
                        ]}
                    >
                        <Input placeholder="Nh???p ti??u ?????" />
                    </Form.Item>
                    <Form.Item label="N???i dung" name="content">
                        <CKEditor
                            name="content"
                            editor={ClassicEditor}
                            data={generalNotifStore.newsDetail?.content}
                            onChange={(event, editor) => {
                                setContent(editor.getData());
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="T??i li???u ????nh k??m"
                        name="attachments_request"
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>
                                Ch???n t??i li???u ????nh k??m
                            </Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "right" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: "#2c65ac",
                                border: "none",
                            }}
                        >
                            C???p nh???t th??ng b??o
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
});

export default UpdateNews;
