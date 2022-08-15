import React, { useContext, useEffect } from "react";
import "./style.scss";
import { Button, Checkbox, Form, Input } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

const Login = () => {
    const navigate = useNavigate();
    const {authStore}= useContext(AuthContext)
    useEffect(()=>{
        if( authStore.user) navigate("/")
    },[])
    const onFinish = (values) => {
        const newUser ={
            client_id:"vimc",
            ...values,
            grant_type: 'password',
            scope:'openid'
        }
        authStore.loginUser(newUser,navigate)
        console.log(authStore.error);

    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            <div className="login-page">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <img
                        className="logo-vimc"
                        src="https://stg.sso.fafu.com.vn/auth/resources/vpytb/login/keycloak/img/logo-vimc.png"
                        alt=""
                    />
                    <div className="error-login">{authStore.error}</div>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Login;
