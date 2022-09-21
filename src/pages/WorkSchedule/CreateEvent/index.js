import React, { useContext, useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ckeditor, { CKEditor } from "@ckeditor/ckeditor5-react";
import "./style.scss";
import {
    Button,
    Form,
    Input,
    DatePicker,
    Breadcrumb,
    TimePicker,
    TreeSelect,
    Upload,
    message,
} from "antd";
import "antd/dist/antd.css";
import { observer } from "mobx-react-lite";
import {
    ArrowLeftOutlined,
    HomeOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import vi from "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { AuthContext } from "../../../context";

const CreateEvent = observer(() => {
    const { eventStore, workSchedulesStore, fileStore,departmentsStore } =
        useContext(AuthContext);
    const [eventNotice, setEventNotice] = useState("");
    let navigate = useNavigate();
    const [form] = Form.useForm();
    useEffect(() => {
        departmentsStore.getListDepartmentsUsers();

        form.setFieldsValue({
            start_at: moment(),
        });
    }, []);
    const onFinish = async (fieldsValue) => {
        await Promise.all(
            fieldsValue?.file_ids?.fileList.map((item) =>
                fileStore.uploadFile(item)
            )
        );
        // for (const item of fieldsValue?.file_ids?.fileList) {
        //     await eventStore.uploadFile(item);
        // }
        const values = {
            ...fieldsValue,
            event_notice: eventNotice,
            start_date: fieldsValue["start_at"].toISOString(),
            end_at:
                fieldsValue["end_time"] &&
                fieldsValue["end_time"].toISOString(),
            start_at: moment(
                `${fieldsValue["start_at"].format("YYYY-MM-DD")} ${fieldsValue[
                    "start_time"
                ].format("HH:mm:ss")}`
            )
                .locale("vi", vi)
                .toISOString(),
            start_time: fieldsValue["start_time"].toISOString(),
            end_time:
                fieldsValue["end_time"] &&
                fieldsValue["end_time"].toISOString(),
            assignees: fieldsValue["assignees"]
                ? fieldsValue["assignees"].map((item) => {
                      return {
                          assignee_code: item,
                          assignee_type: "USER",
                          permission: "VIEW",
                      };
                  })
                : [],
            file_ids: fileStore.files,
        };
        console.log("value", values);

        await eventStore.createEvent(values);
        fileStore.files=[]
        await workSchedulesStore.getschedules(moment());
        navigate(-1);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const treeData = departmentsStore.departments;
    const tProps = {
        treeData,
        treeCheckable: true,
        placeholder: "--Chọn người nhận thông báo--",
        style: {
            width: "100%",
        },
    };

    const props = {
        name: "file",
        multiple: true,
        beforeUpload: (file) => {
            return false;
        },
        headers: {
            authorization: "authorization-text",
        },

        onChange(info) {
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
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
                <Breadcrumb.Item>
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>Lịch cơ quan</Breadcrumb.Item>
                <Breadcrumb.Item>Tạo lịch cơ quan</Breadcrumb.Item>
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
                <span className="create-title">Tạo mới sự kiện</span>
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 30,
                            }}
                        >
                            <Form.Item
                                style={{ width: "100%" }}
                                name="start_at"
                                label="Thời gian thực hiện"
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
                                name="start_time"
                                label="Thời gian bắt đầu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <TimePicker
                                    style={{ width: "100%" }}
                                    placeholder="Bắt đầu"
                                    showSecond={false}
                                    format={`HH:mm`}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="end_time"
                                label="Thời gian kết thúc"
                            >
                                <TimePicker
                                    style={{ width: "100%" }}
                                    placeholder="Kết thúc"
                                    showSecond={false}
                                    format={`HH:mm`}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Chủ trì"
                            name="host"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc!",
                                },
                            ]}
                        >
                            <Input placeholder="Chủ trì" />
                        </Form.Item>
                        <Form.Item
                            label="Địa điểm"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc!",
                                },
                            ]}
                        >
                            <Input placeholder="Địa điểm" />
                        </Form.Item>
                        <Form.Item label="Chuẩn bị" name="preparation">
                            <Input placeholder="Chuẩn bị" />
                        </Form.Item>
                        <Form.Item label="Nội dung sự kiện" name="event_notice">
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(event, editor) => {
                                    setEventNotice(editor.getData());
                                }}
                            />
                        </Form.Item>
                        <Form.Item label="Tài liệu đính kèm" name="file_ids">
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>
                                    Chọn tài liệu đính kèm
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Thành viên tham gia" name="attenders">
                            <Input placeholder="--Thành viện tham gia--" />
                        </Form.Item>
                        <Form.Item label="Thông báo" name="assignees">
                            <TreeSelect {...tProps} />
                        </Form.Item>

                        <Form.Item style={{ textAlign: "right" }}>
                            <Button
                                type="primary"
                                className="mx-2"
                                htmlType="submit"
                            >
                                Tạo sự kiện mới
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
});

export default CreateEvent;
