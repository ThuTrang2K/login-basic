import React, { useContext, useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ckeditor, { CKEditor } from "@ckeditor/ckeditor5-react";
import "./style.scss";
import {
    Button,
    Form,
    Input,
    DatePicker,
    TimePicker,
    TreeSelect,
    Upload,
    message,
} from "antd";
import "antd/dist/antd.css";
import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import vi from "moment/locale/vi";
import locale from "antd/es/date-picker/locale/vi_VN";
import { AuthContext } from "../../../context";
import { UploadOutlined } from "@ant-design/icons";

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
    const pre_assignees = eventStore.event?.assignees
        ?.filter((item) => item.permission !== "CREATE")
        .map((item) => item.assignee_code);
    eventStore.event &&
        form.setFieldsValue({
            start_at: moment(eventStore.event.start_at),
            start_time: moment(eventStore.event.start_at),
            end_time: eventStore.event?.end_at
                ? moment(eventStore.event?.end_at)
                : null,
            host: eventStore.event?.host,
            location: eventStore.event?.location,
            preparation: eventStore.event?.preparation,
            attenders: eventStore.event?.attenders,
            assignees: pre_assignees,
        });

    const onFinish = async (fieldsValue) => {
        const { assignees, ...rest } = fieldsValue;
        console.log(pre_assignees, assignees);
        const assign_person_update = {
            new_items: assignees
                .filter((item) => !pre_assignees.includes(item))
                .map((item) => ({
                    assignee_code: item,
                    assignee_type: "USER",
                    permission: "VIEW",
                })),
            remove_items: pre_assignees
                .filter((item) => !assignees.includes(item))
                .map((item) => ({
                    assignee_code: item,
                    assignee_type: "USER",
                    permission: "VIEW",
                })),
        };

        for (const item of fieldsValue?.file_ids?.fileList) {
            await eventStore.uploadFile(item);
        }

        const values = {
            ...rest,
            event_notice: eventNotice,
            start_date: rest["start_at"].toISOString(),
            end_at: rest["end_time"] && rest["end_time"].toISOString(),
            start_at: moment(
                `${rest["start_at"].format("YYYY-MM-DD")} ${rest[
                    "start_time"
                ].format("HH:mm:ss")}`
            )
                .locale("vi", vi)
                .toISOString(),
            start_time: rest["start_time"].toISOString(),
            file_ids: [],
            end_time: rest["end_time"] && rest["end_time"].toISOString(),
            assign_person_update: assign_person_update,
        };
        console.log("value", values);
        await eventStore.UpdateEvent(values, schedule_code);
        await workSchedulesStore.getschedules(moment());
        navigate(-1);
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

    //upload file
    const props = {
        name: "file",
        action: '',
        multiple: true,
        beforeUpload: (file) => {
            return false;
        },
        onChange(info) {
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
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
                            <Upload {...props} >
                                <Button icon={<UploadOutlined />}>
                                    Upload
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
