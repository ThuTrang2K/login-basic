import React, { useContext, useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ckeditor, { CKEditor } from "@ckeditor/ckeditor5-react";
import "./style.scss";
import { Button, Form, Input, DatePicker, TimePicker, TreeSelect } from "antd";
import "antd/dist/antd.css";
import { AuthContext } from "../../context";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import vi from "moment/locale/vi";

const UpdateEvent = observer(() => {
    const { eventStore, workSchedulesStore } = useContext(AuthContext);
    const [eventNotice, setEventNotice] = useState(
        eventStore?.event?.event_notice
    );
    let navigate = useNavigate();
    const { schedule_code } = useParams();
    useEffect(() => {
        eventStore.getListDepartmentsUsers();
        eventStore.getEventById(schedule_code);
    }, []);
    const [form] = Form.useForm();

    eventStore.event &&
        form.setFieldsValue({
            start_at: moment(eventStore.event.start_at),
            start_time: moment(eventStore.event.start_at),
            end_time: eventStore.event?.end_at ? moment(eventStore.event?.end_at): null,
            host: eventStore.event?.host,
            location: eventStore.event?.location,
            preparation: eventStore.event?.preparation,
            attenders: eventStore.event?.attenders,
            assignees: eventStore.event.assignees.map((item) => {
                return { value: item.name_uppercase };
            }),
        });

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
            assignees:
                (fieldsValue["assignees"] &&
                    fieldsValue["assignees"].map((item) => {
                        return {
                            assignee_code: item,
                            assignee_type: "USER",
                            permission: "VIEW",
                        };
                    })) ||
                [],
        };
        console.log("value", values);
        eventStore.UpdateEvent(values, schedule_code);
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
        placeholder: "--Chọn người nhận thông báo--",
        style: {
            width: "100%",
        },
    };

    if (!eventStore.event) return null;
    return (
        <div className="create-event-container">
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
                                name="event_notice"
                                value="hello"
                                id="event_notice"
                                data={eventStore.event.event_notice}
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
                                Cập nhật sự kiện
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
});

export default UpdateEvent;
