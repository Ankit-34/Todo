import React from "react";
import '../Style/Form.css'
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const onFinish = (values) => {
        let email = values.username;
        let password = values.password;
        if(email === "default@email.com" && password === "Default@2022")
        {
            localStorage.setItem("username", email);
            localStorage.setItem("password", password);
            localStorage.setItem("accessToken", "ankit.ganatra");
            navigate('/');
        }
        else{
            alert("Invalid credentials");
        }
        // console.log(email, password);
    };
    
    return (
        <>
            <Form
                className="form"
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: "Please input your username!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please input your password!" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    className="field"
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox className="field">Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Login;
