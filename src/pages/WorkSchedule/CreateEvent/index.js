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
        placeholder: "--Ch???n ng?????i nh???n th??ng b??o--",
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
                <Breadcrumb.Item>L???ch c?? quan</Breadcrumb.Item>
                <Breadcrumb.Item>T???o l???ch c?? quan</Breadcrumb.Item>
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
                <span className="create-title">T???o m???i s??? ki???n</span>
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
                                    initialValues={moment()}
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
                        <Form.Item label="Th??ng b??o" name="assignees" >
                            <TreeSelect {...tProps}  />
                        </Form.Item>

                        <Form.Item style={{ textAlign: "right" }}>
                            <Button
                                type="primary"
                                className="mx-2"
                                htmlType="submit"
                            >
                                T???o s??? ki???n m???i
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
});

export default CreateEvent;
