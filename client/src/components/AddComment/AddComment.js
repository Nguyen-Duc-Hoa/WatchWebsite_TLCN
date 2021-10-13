import React, { useState } from 'react'
import { Form, Tooltip, Input, Button } from 'antd'
import Commenting from '../Comment/Comment'
import moment from 'moment';

const { TextArea } = Input;

function AddComment({ replyUser }) {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {
        if (!value) {
            return
        }
        setLoading(true)
    }

    const handleChange = e => {
        setValue(e.target.value)
    }

    return (
        <Commenting
            avatar='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            actions={true}
            author='Duc Hoa'
            datetime={
                (<Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>)
            }
            content={
                <Editor
                    replyUser={replyUser}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    loading={loading}
                    value={value} />
            } />
    )
}

export default AddComment

function Editor({ handleSubmit, handleChange, loading, value, replyUser }) {
    return (
        <Form
            onSubmit={handleSubmit}
            initialValues={{content: replyUser}}
        >
            <Form.Item
                name='content'
            >
                <TextArea rows={4} onChange={handleChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button style={{ background: '#000', color: 'white' }} htmlType="submit" loading={loading} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </Form >
    )
}