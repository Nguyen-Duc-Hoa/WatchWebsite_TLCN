import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import UploadImage from '../../../components/UploadImage/UploadImage'

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

function UpdateBrand() {
    const [image, setImage] = useState('')

    return (
        <section className='admin'>
            <div className="heading">Add/Edit Brand</div>
            <UploadImage image={image} setImage={setImage} />
            <Form {...layout} style={{ maxWidth: 400 }}>
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[{
                        required: true,
                        message: 'Name is required!'
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit' disabled={!image}>Submit</Button>
                </Form.Item>
            </Form>
        </section>
    )
}

export default UpdateBrand
