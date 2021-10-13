import React from 'react'
import { Form, Input, Button, Space, Row, Col } from 'antd';
import './CheckoutForm.scss'

const formItemLayout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    },
};

function CheckoutForm() {
    return (
        <div className='form-order'>
            <Form
                {...formItemLayout}
                size='large'
            >
                <div className="heading">Contact information</div>
                <Form.Item
                    name='email'
                    rules={[{ required: true, message: 'Email is required', type: 'email' }]}
                >
                    <Input placeholder='Email here' defaultValue={'john@abc.com'} />
                </Form.Item>

                <div className="heading">Shipping address</div>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                        <Form.Item
                            name='firstName'
                            rules={[{ required: true, message: 'First name is required!' }]}
                        >
                            <Input placeholder='First name' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name='lastName'
                            rules={[{ required: true, message: 'Last name is required!' }]}
                        >
                            <Input placeholder='Last name' />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name='address'
                    rules={[{ required: true, message: 'Address is required!' }]}
                >
                    <Input placeholder='Address' />
                </Form.Item>

                <Form.Item
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
                    <Input placeholder='Phone' />
                </Form.Item>

                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Continue Shipping
                        </Button>
                        <Button>Return</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CheckoutForm
