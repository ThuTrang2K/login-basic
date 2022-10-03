import { Button, Form, Input, message, Modal } from "antd";
import React, { useContext } from "react";

const RenameFileModal = ({
    open,
    setOpen,
    file,
    fileIndex,
    setFiles,
    files,
    setFileIndex,
}) => {
    const [form] = Form.useForm();
    form.setFieldsValue({
        file: file.name.slice(
            0,
            Math.max(0, file.name.lastIndexOf(".")) || Infinity
        ),
    });
    const onFinish = async (fieldsValue) => {
        console.log("value", fieldsValue);
        files[fileIndex - 1] = {
            ...file,
            name: `${fieldsValue.file}${file.name
                .slice(Math.max(0, file.name.lastIndexOf(".")) || Infinity)
                .toLowerCase()}`,
        };
        setFiles([...files]);
        setFileIndex();
        setOpen(false);
    };
    return (
        <Modal
            title="Đổi tên file"
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
                            <Form.Item name="file">
                                <Input
                                    addonAfter={file.name
                                        .slice(
                                            Math.max(
                                                0,
                                                file.name.lastIndexOf(".")
                                            ) || Infinity
                                        )
                                        .toLowerCase()}
                                />
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
                                    Đổi tên
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RenameFileModal;
