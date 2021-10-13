import React from 'react'
import { Form, Button, Input } from 'antd'

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

function ChangePassword() {
    return (
        <section className='admin'>
            <div className="heading">Change password</div>
            <Form {...layout} style={{ maxWidth: 400 }}>
                <Form.Item
                    label='Current Password'
                    name="currentPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your current password!',
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
                    label='New Password'
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
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
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your new password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
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

export default ChangePassword
