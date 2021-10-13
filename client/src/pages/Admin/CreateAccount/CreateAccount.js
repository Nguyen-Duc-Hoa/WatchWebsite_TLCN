import React from 'react'
import { Form, Button, Input } from 'antd'

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

function CreateAccount() {
    const onFinish = values => {
        console.log(values)
    }

    return (
        <section className='admin'>
            <div className="heading">Create Account</div>
            <Form
                {...layout}
                onFinish={onFinish}
                style={{maxWidth: 500}}
            >
                <Form.Item
                    label='Username'
                    rules={[
                        {
                            required: true,
                            message: 'Username is required!'
                        },
                        {
                            min: 4,
                            message: 'Username length must be at least 4 characters!'
                        },
                        {
                            max: 20,
                            message: 'Username length must be less than 20 characters!'
                        }
                    ]}
                    name='username'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Password'
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
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label='Confirm Password'
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
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </section>
    )
}

export default CreateAccount
