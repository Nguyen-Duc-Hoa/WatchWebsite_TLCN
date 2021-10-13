import React from 'react'
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb'
import './Register.scss'
import { Form, Input, Button, Typography } from 'antd';

const breadcrumbingRoute = [
    { name: 'Home', link: '/' },
    { name: 'Create Account', link: 'register' }
]

const { Text } = Typography

const formItemLayout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    },
};

const regexPhoneNumber = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

function Register() {
    return (
        <section className='register'>
            <Breadcrumbing route={breadcrumbingRoute} />
            <div className="heading">Personal Infomation</div>
            <div className="register__form">
                <Form
                    name='register'
                    {...formItemLayout}
                >
                    <Form.Item
                        name='username'
                        placeholder='Your username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            },
                            {
                                min: 6,
                                message: 'Username length must be more than 6 characters!'
                            },
                            {
                                max: 15,
                                message: 'Username length must be less than 15 characters!'
                            }
                        ]}
                    >
                        <Input size='large' placeholder='Username' />
                    </Form.Item>

                    <Form.Item
                        name='email'
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input size='large' placeholder='E-mail' />
                    </Form.Item>

                    <Form.Item
                        name='phoneNumber'
                        rule={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                            {
                                validator: (_, value) => value.match(regexPhoneNumber) ? Promise.resolve() : Promise.reject(new Error('Phone number invalid!'))
                            }
                        ]}
                    >
                        <Input size='large' placeholder='Phone number' />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password length must be more than 6 characters!'
                            },
                            {
                                max: 15,
                                message: 'Password length must be less than 15 characters!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password size='large' placeholder='Your password' />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password size='large' placeholder='Confirm password' />
                    </Form.Item>

                    <Text style={{display: 'block', marginBottom: 24}}>Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</Text>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' block size='large'>Register</Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    )
}

export default Register
