import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context";

const { Option } = Select;
const CreateUser = observer(
    ({ departments, positions, roles, handleCancel }) => {
        const { usersStore, authStore } = useContext(AuthContext);
        const navigate = useNavigate();
        const onFinish = async (fieldsValue) => {
            const values = {
                company_code: authStore.user.company.code,
                department_code: fieldsValue.department,
                email: fieldsValue.email,
                gender: fieldsValue.gender,
                home_phone: !fieldsValue.home_phone
                    ? ""
                    : fieldsValue.home_phone,
                name: fieldsValue.name_lowercase,
                password: !fieldsValue.password ? "" : fieldsValue.password,
                phone: fieldsValue.phone,
                position_code: fieldsValue.position,
                username: fieldsValue.username,
                ma_nv: fieldsValue.ma_nv,
            };
            await usersStore.createUser(values);
            !usersStore.error && navigate(0);
        };
        return (
            <div className="create-event-container">
                {usersStore.error &&
                    !usersStore.loading &&
                    message.error(usersStore.error)}
                <Spin spinning={usersStore.loading}>
                    <div
                        style={{ marginTop: 0, padding: 0 }}
                        className="create-form"
                    >
                        <div className="">
                            <Form
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
                                        label="T??n ????ng nh???p"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: "B???t bu???c!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="T??n ????ng nh???p" />
                                    </Form.Item>
                                    <Form.Item
                                        style={{ width: "100%" }}
                                        name="password"
                                        label="M???t kh???u"
                                    >
                                        <Input.Password placeholder="M???t kh???u" />
                                    </Form.Item>
                                </div>
                                <Form.Item
                                    label="Ph??ng ban"
                                    name="department"
                                    rules={[
                                        {
                                            required: true,
                                            message: "B???t bu???c!",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Ph??ng ban">
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
                                    label="H??? t??n"
                                    name="name_lowercase"
                                    rules={[
                                        {
                                            required: true,
                                            message: "B???t bu???c!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="H??? t??n" />
                                </Form.Item>

                                <Form.Item label="M?? nh??n vi??n" name="ma_nv">
                                    <Input placeholder="M?? nh??n vi??n" />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: "B???t bu???c!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    label="Gi???i t??nh"
                                    name="gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: "B???t bu???c!",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Gi???i t??nh">
                                        <Option value="0" key="n???">
                                            N???
                                        </Option>
                                        <Option value="1" key="nam">
                                            Nam
                                        </Option>
                                        <Option value="2" key="khac">
                                            Kh??c
                                        </Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="??i???n tho???i"
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "B???t bu???c!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="??i???n tho???i" />
                                </Form.Item>

                                <Form.Item
                                    label="S??? m??y n???i b???"
                                    name="home_phone"
                                >
                                    <Input placeholder="S??? m??y n???i b???" />
                                </Form.Item>
                                <Form.Item
                                    label="Ch???c danh"
                                    name="position"
                                    rules={[
                                        {
                                            required: true,
                                            message: "B???t bu???c!",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Ch???c danh">
                                        {positions.map((position) => (
                                            <Option
                                                value={position.code}
                                                key={position.name}
                                            >
                                                {position.name}
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
                                        H???y
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
                                        T???o m???i
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </Spin>
            </div>
        );
    }
);

export default CreateUser;
