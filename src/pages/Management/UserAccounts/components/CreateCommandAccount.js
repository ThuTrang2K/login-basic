import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { AuthContext } from "../../../../context";
import { Button, Form, Input, message, Spin } from "antd";

const CreateCommandAccount = observer(
    ({
        setOpenCreateAccount,
        setCommandAccount,
        command,
        user,
        setopenCommandManage,
    }) => {
        const { usersStore } = useContext(AuthContext);
        const onFinish = async (fieldsValue) => {
            const values = {
                account_name: fieldsValue.account_name,
                password: fieldsValue.password,
                command_code: command.code,
                user_code: user.code,
            };
            await usersStore.createCommandAccount({
                username: fieldsValue.account_name,
                password: fieldsValue.password,
                grant_type: "password",
            });
            console.log("usersStore.error", usersStore.error);
            !usersStore.error && (await usersStore.createAccount(values));
            if (!usersStore.error) {
                setCommandAccount(values);
                setopenCommandManage(false);
                setOpenCreateAccount(false);
            }
        };
        return (
            <>
                {usersStore.error &&
                    !usersStore.loading &&
                    message.error(usersStore.error)}
                <Spin spinning={usersStore.loading}>
                    <Form
                        className=""
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Tên tài khoản"
                            name="account_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc!",
                                },
                            ]}
                        >
                            <Input placeholder="Họ tên" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Xác nhận mật khẩu"
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Bắt buộc!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("password") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "Mật khẩu xác nhận không trùng khớp!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Xác nhận mật khẩu" />
                        </Form.Item>
                        <Form.Item>
                            <div
                                className="general-flex-header"
                                style={{
                                    marginTop: "24px",
                                    gap: 16,
                                }}
                            >
                                <Button
                                    className="secondary-button"
                                    style={{
                                        width: "100%",
                                    }}
                                    onClick={() => {
                                        usersStore.error = "";
                                        setOpenCreateAccount(false);
                                    }}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        width: "100%",
                                        backgroundColor: "#2c65ac",
                                        border: "none",
                                    }}
                                >
                                    Thêm tài khoản
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>
            </>
        );
    }
);

export default CreateCommandAccount;
