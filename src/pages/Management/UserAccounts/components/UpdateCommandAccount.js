import { Button, Form, Input, Modal } from "antd";
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { AuthContext } from "../../../../context";

//vt.pmu
//123456a@
const UpdateCommandAccount = observer(({commandAccount,setCommandAccount,setopenCommandManage}) => {
    const { usersStore } = useContext(AuthContext);
    const [form] = Form.useForm();
    commandAccount &&
            form.setFieldsValue({
                account_name: commandAccount.account_name,
                password:commandAccount.password
            });
    const handleDelete = (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa?",
            onOk: async() => {
                await usersStore.deleteCommandAccount(commandAccount.id);
                setCommandAccount();
                setopenCommandManage(false);
            },
        });
    };
    const onFinish = (fieldsValue) => {
        console.log("fieldsValue", fieldsValue);
        const values = {
            ...fieldsValue,
            grant_type: "password"
        };
            usersStore.updateCommandAccount(values)
    }
    return (
        <>
            <Form
                form={form}
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
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Bắt buộc!",
                        },
                    ]}
                >
                    <Input.Password  placeholder="Mật khẩu"/>
                </Form.Item>
                <Form.Item
                >
                    <div className="general-flex-header" style={{
                            marginTop: "24px",
                            gap: 16
                        }}>
                    <Button
                        danger
                        style={{
                            width: "100%",
                        }}
                        onClick={() => handleDelete()}
                    >
                        Xóa tài khoản
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            width:"100%",
                            backgroundColor: "#2c65ac",
                            border: "none",
                        }}
                    >
                        Lưu thay đổi
                    </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
});

export default UpdateCommandAccount;
