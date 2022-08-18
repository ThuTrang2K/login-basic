import React, { useContext } from "react";
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
} from "antd";
import "antd/dist/antd.css";
import { AuthContext, StudentContext } from "../../context";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const UpdateEvent = observer(({ handleClose }) => {
    const { eventStore } = useContext(AuthContext);
    let navigate = useNavigate();
    const onFinish = (fieldsValue) => {
        // const values = {
        //     ...fieldsValue,
        //     birthday: fieldsValue["birthday"].toISOString(),
        //     gender: fieldsValue["gender"] === "male" ? 1 : 0,
        // };
        // console.log("value", values);
        // eventStore.addUser(values);
        handleClose();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const options = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
    const [form] = Form.useForm();
    form.setFieldsValue({
        start_at: moment(),
    });
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
                                name="start"
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
                                    format={`hh:mm`}
                                />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                name="end_at"
                                label="Thời gian kết thúc"
                            >
                                <TimePicker
                                    style={{ width: "100%" }}
                                    placeholder="Kết thúc"
                                    showSecond={false}
                                    format={`hh:mm`}
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
                            <CKEditor editor={ClassicEditor} />
                        </Form.Item>
                        <Form.Item label="Tài liệu đính kèm" name="file_ids">
                            <Input type="file" />
                        </Form.Item>
                        <Form.Item label="Thành viên tham gia" name="attenders">
                            <Input placeholder="--Thành viện tham gia--" />
                        </Form.Item>
                        <Form.Item label="Thông báo">
                            <Select
                                mode="multiple"
                                style={{
                                    width: "100%",
                                }}
                                placeholder="Please select"
                                defaultValue={["1", "2"]}
                                // onChange={handleChange}
                                options={options}
                            />
                        </Form.Item>

                        <Form.Item style={{ textAlign: "right" }}>
                            <Button
                                type="primary"
                                className="mx-2"
                                htmlType="submit"
                                onClick={handleClose}
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
