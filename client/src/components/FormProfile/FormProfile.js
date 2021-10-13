import React from 'react'
import { Form, Input, Button, DatePicker } from 'antd'

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

function FormProfile() {
    const onFinish = values => {
        console.log(values)
    }

    return (
        <Form {...layout} style={{maxWidth: 600}} onFinish={onFinish}>
            <Form.Item
                label='Full Name'
                name='name'
                rules={[
                    {
                        required: true,
                        message: 'Full Name is required!'
                    },
                    {
                        max: 50,
                        message: 'Full Name length is not over 50 character!'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Address'
                name='address'
                rules={[
                    {
                        required: true,
                        message: 'Address is required!'
                    },
                    {
                        max: 150,
                        message: 'Address length is not over 150 character!'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Phone Number'
                name='phone'
                rules={[
                    {
                        required: true,
                        message: 'Phone is required!'
                    },
                    {
                        validator: (_, value) => {
                            const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
                            return regex.test(value) ? Promise.resolve() : Promise.reject(new Error("Phone Number is not valid!"))
                        }
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label='Birthday'
                name='birthday'
                rules={[{ type: 'object'}]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form >
    )
}

export default FormProfile
