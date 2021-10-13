import React from 'react'
import './Login.scss'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const formItemLayout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    },
};

const validataMessage = {
    required: '${label} is required!'
}

function Login() {
    const onFinish = values => {
        console.log(values)
    }

    return (
        <div className="wrapper">
            <div className='adminLogin'>
                <div className="welcomeHeader">
                    <img src="/welcome-image.png" alt="" />
                    <div className='heading'>Welcome</div>
                </div>
                <div className="formLogin">
                    <Form
                        validateMessages={validataMessage}
                        size='large'
                        onFinish={onFinish}
                        {...formItemLayout}>
                        <Form.Item
                            name='username'
                            rules={[{
                                required: true
                            }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[{
                                required: true
                            }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                block={true}
                                style={{ borderRadius: 20 }}
                                type='primary'
                                htmlType='submit'
                            >
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login
