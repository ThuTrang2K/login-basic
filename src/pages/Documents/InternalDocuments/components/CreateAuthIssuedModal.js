import { Button, Form, Input, message, Modal } from "antd";
import React, { useContext } from "react";
import { AuthContext } from "../../../../context";

const CreateAuthIssuedModal = ({ open, setOpen }) => {
    const { authorityIssuedsStore } = useContext(AuthContext);
    const [form] = Form.useForm();
    form.setFieldsValue({
        type: "Văn bản đến"
    });
    const onFinish = async (fieldsValue) => {
        console.log("value",fieldsValue );

        await authorityIssuedsStore.createAuthorityIssued({...fieldsValue, type: "INCOMING"});
        await authorityIssuedsStore.getListAuthorityIssueds("INCOMING");
        authorityIssuedsStore.error ? message.error(authorityIssuedsStore.error) : setOpen(false);
    };
    return (
        <Modal
            title="Tạo mới cơ quan ban hành"
            visible={open}
            onCancel={() => setOpen(false)}
            footer={false}
        >
            <div className="create-event-container">
                <div style={{ padding: 0 }} className="create-form">
                    <div className="">
                        <Form
                            form={form}
                            className=""
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Loại cơ quan ban hành"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Văn bản đến"
                                    value={"Văn bản đến"}
                                    disabled
                                />
                            </Form.Item>
                            <Form.Item
                                label="Tên cơ quan ban hành"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên cơ quan ban hành" />
                            </Form.Item>
                            <Form.Item style={{ textAlign: "right" }}>
                                <Button
                                    className="secondary-button"
                                    style={{
                                        marginTop: "16px",
                                        marginRight: 8,
                                    }}
                                    onClick={() => setOpen(false)}
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
                                    Tạo mới
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CreateAuthIssuedModal;
