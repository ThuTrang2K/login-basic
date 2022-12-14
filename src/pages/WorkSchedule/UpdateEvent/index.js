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
import { StarOutlined, UploadOutlined } from "@ant-design/icons";

const UpdateEvent = observer(() => {
    const { eventStore, workSchedulesStore,fileStore,departmentsStore } = useContext(AuthContext);
    const [eventNotice, setEventNotice] = useState(
        eventStore?.event?.event_notice
    );
    let navigate = useNavigate();
    const { schedule_code } = useParams();
    useEffect(() => {
        departmentsStore.getListDepartmentsUsers();
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
        const newFile = fieldsValue?.file_ids?.fileList.filter((file)=>file.status!=="done")||[];
        const oldFile = fieldsValue?.file_ids?.fileList.filter((file)=>file.status==="done").map((file)=>file.uid) || eventStore.event.file_ids.map((file)=>file.file_id)
        console.log("oldFile",oldFile);
        await Promise.all(
            newFile.map((item) =>
            fileStore.uploadFile(item)
            )
        );
        // for (const item of newFile) {
        //     await eventStore.uploadFile(item);
        // }

        const { assignees, ...rest } = fieldsValue;
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
            file_ids: [...fileStore.files,...oldFile] ,
            end_time: rest["end_time"] && rest["end_time"].toISOString(),
            assign_person_update: assign_person_update,
        };
        console.log("value", values);
        await eventStore.UpdateEvent(values, schedule_code);
        fileStore.files=[];
        await workSchedulesStore.getschedules(moment());
        navigate(-1);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const treeData = departmentsStore.departments;
    const tProps = {
        treeData,
        // value,
        // onChange,
        treeCheckable: true,
        placeholder: "--Ch???n ng?????i nh???n th??ng b??o--",
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
        defaultFileList:eventStore.event.file_ids.map(item=>({uid:item.file_id, name: item.file_title,status: 'done'})),showUploadList: {
            // showDownloadIcon: true,
            // downloadIcon: 'Download',
            showRemoveIcon: true,
            // removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
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
                                label="Th???i gian th???c hi???n"
                                rules={[
                                    {
                                        type: "object",
                                        required: true,
                                        message: "B???t bu???c!",
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
                                label="Th???i gian b???t ?????u"
                                rules={[
                                    {
                                        required: true,
                                        message: "B???t bu???c!",
                                    },
                                ]}
                            >
                                <TimePicker
                                    style={{ width: "100%" }}
                                    placeholder="B???t ?????u"
                                    showSecond={false}
                                    format={`HH:mm`}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="end_time"
                                label="Th???i gian k???t th??c"
                            >
                                <TimePicker
                                    style={{ width: "100%" }}
                                    placeholder="K???t th??c"
                                    showSecond={false}
                                    format={`HH:mm`}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Ch??? tr??"
                            name="host"
                            rules={[
                                {
                                    required: true,
                                    message: "B???t bu???c!",
                                },
                            ]}
                        >
                            <Input placeholder="Ch??? tr??" />
                        </Form.Item>
                        <Form.Item
                            label="?????a ??i???m"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: "B???t bu???c!",
                                },
                            ]}
                        >
                            <Input placeholder="?????a ??i???m" />
                        </Form.Item>
                        <Form.Item label="Chu???n b???" name="preparation">
                            <Input placeholder="Chu???n b???" />
                        </Form.Item>
                        <Form.Item label="N???i dung s??? ki???n" name="event_notice">
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
                        <Form.Item label="T??i li???u ????nh k??m" name="file_ids">
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>
                                    Ch???n t??i li???u ????nh k??m
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Th??nh vi??n tham gia" name="attenders">
                            <Input placeholder="--Th??nh vi???n tham gia--" />
                        </Form.Item>
                        <Form.Item label="Th??ng b??o" name="assignees">
                            <TreeSelect {...tProps} />
                        </Form.Item>

                        <Form.Item style={{ textAlign: "right" }}>
                            <Button
                                type="primary"
                                className="mx-2"
                                htmlType="submit"
                            >
                                C???p nh???t s??? ki???n
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
});

export default UpdateEvent;
