import React, { useContext, useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ckeditor, { CKEditor } from "@ckeditor/ckeditor5-react";
import "./style.scss";
import {
    Button,
    Checkbox,
    Form,
    Input,
    DatePicker,
    Radio,
    Breadcrumb,
    Select,
    TimePicker,
    TreeSelect,
} from "antd";
import "antd/dist/antd.css";
import { AuthContext, StudentContext } from "../../context";
import { observer } from "mobx-react-lite";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import vi from "moment/locale/vi";

const CreateEvent = observer(() => {
    const { eventStore, workSchedulesStore } = useContext(AuthContext);
    const [eventNotice, setEventNotice] = useState("");
    let navigate = useNavigate();
    useEffect(() => {
        eventStore.getListDepartmentsUsers();
        console.log(eventStore.departments);
    }, []);
    const onFinish = (fieldsValue) => {
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
        };
        console.log("value", values);
        eventStore.createEvent(values);
        workSchedulesStore.getschedules();
        setTimeout(() => navigate(-1), 500);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const treeData = eventStore.departments;
    const tProps = {
        treeData,
        // value,
        // onChange,
        treeCheckable: true,
        // showCheckedStrategy: SHOW_PARENT,
        placeholder: "--Chọn người nhận thông báo--",
        style: {
            width: "100%",
        },
    };

    // const options =eventStore.departments;
    const [form] = Form.useForm();
    form.setFieldsValue({
        start_at: moment(),
    });
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
                                    style={{ width: "100%" }}
                                    // defaultValue={moment()}
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
                            <Input type="file" />
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
