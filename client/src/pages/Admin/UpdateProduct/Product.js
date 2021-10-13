import React, { useState } from 'react'
import { Form, Input, Button, Select, InputNumber, Row, Col, Space } from 'antd';
import UploadImage from '../../../components/UploadImage/UploadImage';

const { Option } = Select;

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};


const validateMessage = {
    required: '${label} is required!'
}

function Product() {
    const [form] = Form.useForm();
    const [image, setImage] = useState('')

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = values => {
        console.log(values)
    }

    return (
        <section className='admin'>
            <div className="heading">Add/Edit product</div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col lg={{ span: 16, order: 2 }} sm={{ span: 24, order: 2 }}>
                    <Form
                        onFinish={onFinish}
                        form={form}
                        {...layout}
                        initialValues={{ amount: 1 }}
                        validateMessages={validateMessage}
                        style={{maxWidth: 600}}
                    >
                        <Form.Item
                            name='name'
                            label='Product Name'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12}>
                                <Form.Item
                                    name='amount'
                                    label='Amount'
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <InputNumber min={0} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='brand'
                                    label='Brand'
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Please select a brand">
                                        <Option value="Gucci">Gucci</Option>
                                        <Option value="Piaget">Piaget</Option>
                                        <Option value="Lange & Söhne">Lange & Söhne</Option>
                                        <Option value="Audemars Piguet">Audemars Piguet</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>



                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12}>
                                <Form.Item
                                    name='material'
                                    label='Material'
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Please select a material">
                                        <Option value="Stainless Steel">Stainless Steel</Option>
                                        <Option value="Titanium">Titanium</Option>
                                        <Option value="Ruby">Ruby</Option>
                                        <Option value="Plastic">Plastic</Option>
                                        <Option value="Ceramic">Ceramic</Option>
                                        <Option value="Gold">Gold</Option>
                                        <Option value="Tungsten">Tungsten</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='energy'
                                    label='Energy'
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Please select a energy">
                                        <Option value="Quartz crystal">Quartz crystal</Option>
                                        <Option value="Coil cover">Coil cover</Option>
                                        <Option value="The stem">The stem</Option>
                                        <Option value="The circuit">The circuit</Option>
                                        <Option value="Battery strap">Battery strap</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12}>
                                <Form.Item
                                    name='size'
                                    label='Size'
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Please select a size">
                                        <Option value="46">46 mm</Option>
                                        <Option value="42">42 mm</Option>
                                        <Option value="40">40 mm</Option>
                                        <Option value="38">38 mm</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='water resistence'
                                    label='Water resistence'
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select placeholder="Please select a level">
                                        <Option value="none">None</Option>
                                        <Option value="3">3 BAR</Option>
                                        <Option value="5">5 BAR</Option>
                                        <Option value="10">10 BAR</Option>
                                        <Option value="20">30 BAR</Option>
                                        <Option value=">30">More 30 BAR</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name='description'
                            label='Description'
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onReset} disabled={!image}>
                                    Reset
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Col>
                <Col lg={{ span: 6, order: 2 }} sm={{ span: 24, order: 1 }}>
                    <UploadImage
                        image={image}
                        setImage={setImage}
                    />
                </Col>
            </Row>

        </section>
    )
}

export default Product
