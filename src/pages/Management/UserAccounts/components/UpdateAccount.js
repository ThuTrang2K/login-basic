import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context";

const { Option } = Select;
const UpdateAccount = observer(
    ({ account, positions, roles, handleCancel, departments,setupDateUser ,updateUser}) => {
        const { usersStore } = useContext(AuthContext);
        const navigate = useNavigate();
        const [form] = Form.useForm();
        console.log("departments", departments);
        console.log("account", account);
        account &&
            form.setFieldsValue({
                username: account.username,
                department: account.department_code,
                name_lowercase: account.name_lowercase,
                ma_nv: account.ma_nv,
                email: account.email,
                gender: account.gender.toString(),
                phone: account.phone,
                home_phone: account.home_phone,
                roles: account.roles,
                position: account.position_code,
            });
        const onFinish = async (fieldsValue) => {
            console.log("fieldsValue", fieldsValue);
            const values = {
                company_code: account.company_code,
                department_code: fieldsValue.department,
                email: fieldsValue.email,
                gender: fieldsValue.gender,
                home_phone: fieldsValue.home_phone,
                name: fieldsValue.name_lowercase,
                password: !fieldsValue.password ? "" : fieldsValue.password,
                phone: fieldsValue.phone,
                position_code: fieldsValue.position,
                username: fieldsValue.username,
                ma_nv:fieldsValue.ma_nv
            };
            console.log("value", values);
            await Promise.all([
                usersStore.updateUserRoles(fieldsValue.roles, account.code),
                usersStore.updateUserById(values, account.code),
            ]);
            setupDateUser(!updateUser);
            handleCancel();
        };
        return (
            <div className="create-event-container">
                <div
                    style={{ marginTop: 0, padding: 0 }}
                    className="create-form"
                >
                    <div className="">
                        <Form
                            form={form}
                            className=""
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 16,
                                }}
                            >
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Tên đăng nhập"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Bắt buộc!",
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled
                                        placeholder="Tên đăng nhập"
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    name="password"
                                    label="Mật khẩu"
                                >
                                    <Input.Password placeholder="Mật khẩu" />
                                </Form.Item>
                            </div>
                            <Form.Item
                                label="Phòng ban"
                                name="department"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Select placeholder="Phòng ban">
                                    {departments.map((department) => (
                                        <Option
                                            value={department.code}
                                            key={department.title}
                                        >
                                            {department.title}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Họ tên"
                                name="name_lowercase"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Input placeholder="Họ tên" />
                            </Form.Item>

                            <Form.Item label="Mã nhân viên" name="ma_nv">
                                <Input placeholder="Mã nhân viên" />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Select placeholder="Giới tính">
                                    <Option value="0" key="nữ">
                                        Nữ
                                    </Option>
                                    <Option value="1" key="nam">
                                        Nam
                                    </Option>
                                    <Option value="2" key="nam">
                                        Khác
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Input placeholder="Điện thoại" />
                            </Form.Item>

                            <Form.Item label="Số máy nội bộ" name="home_phone">
                                <Input placeholder="Số máy nội bộ" />
                            </Form.Item>
                            <Form.Item
                                label="Chức danh"
                                name="position"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chức danh"
                                    defaultValue={account.position_code}
                                >
                                    {positions.map((position) => (
                                        <Option
                                            value={position.code}
                                            key={position.code}
                                        >
                                            {position.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Chức năng"
                                name="roles"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bắt buộc!",
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Chức năng"
                                    defaultValue={account.roles}
                                    mode="multiple"
                                    allowClear
                                >
                                    {roles.map((role) => (
                                        <Option
                                            value={role.name}
                                            key={role.explain}
                                        >
                                            {role.explain}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item style={{ textAlign: "right" }}>
                                <Button
                                    className="secondary-button"
                                    style={{
                                        marginTop: "16px",
                                        backgroundColor: "#fff",
                                        marginRight: 8,
                                    }}
                                    onClick={() => handleCancel()}
                                >
                                    Hủy
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
                                    Lưu thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
);

export default UpdateAccount;
