import React, { useState } from 'react'
import { Table, Popover, Popconfirm, Form, Typography, Space, Button, Input } from 'antd';
import Pagination from '../../../components/Pagination/Pagination'
import { AiOutlineAppstoreAdd, AiTwotoneDelete } from 'react-icons/ai'
import EditTableCell from '../../../components/EditTableCell/EditTableCell';
import { useMergedColumns } from '../../../hook/useMergedColums';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

const originData = [
    {
        key: '1',
        id: 1,
        value: 38
    },
    {
        key: '2',
        id: 2,
        value: 40
    },
    {
        key: '3',
        id: 3,
        value: 42
    },
    {
        key: '4',
        id: 4,
        value: 46
    },
]

function Sizes() {
    const [data, setData] = useState(originData)
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [visible, setVisible] = useState(false)

    const isEditing = record => record.key === editingKey

    const onFinish = values => {
        console.log(values)
    }

    const handleVisibleChange = visible => {
        console.log(visible)
        setVisible(visible)
    }

    const edit = record => {
        form.setFieldsValue({
            name: '',
            ...record
        })
        setEditingKey(record.key)
    }

    const cancel = () => {
        setEditingKey('');
    };

    const save = async key => {
        try {
            const row = await form.validateFields()
            const newData = [...data]
            const index = newData.findIndex(item => item.key === key)
            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, { ...item, ...row })
                setData(newData)
                setEditingKey('')
            }
            else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        }
        catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id > b.id,
            sortDirections: ['descend'],
        },
        {
            title: 'Value (mm)',
            dataIndex: 'value',
            key: 'value',
            sorter: (a, b) => a.value > b.value,
            sortDirections: ['descend'],
            editable: true
        },
        {
            title: 'Actions',
            dataIndex: 'edit',
            key: 'edit',
            render: (_, record) => {
                const editable = isEditing(record)
                return editable ? (
                    <span>
                        <a
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </a>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                )
            }
        }
    ]

    const mergedColumns = useMergedColumns(columns, isEditing)

    return (
        <section className='admin'>
            <div className="heading">Sizes</div>
            <div className="buttonLayout">
                <Space>
                    <Popover
                        content={
                            <Form onFinish={onFinish}>
                                <Form.Item
                                    name='name'
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder='Value (mm)' />
                                </Form.Item>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit'>Submit</Button>
                                </Form.Item>
                            </Form>
                        }
                        placement="leftBottom"
                        title="Add here"
                        trigger="click"
                        visible={visible}
                        onVisibleChange={handleVisibleChange}
                    >
                        <Button size='large' type='primary'><AiOutlineAppstoreAdd className='icon' /> Add</Button>
                    </Popover>
                    <Button size='large' type='danger'><AiTwotoneDelete className='icon' /> Delete</Button>
                </Space>
            </div>
            <Form form={form} component={false}>
                <Table
                    columns={mergedColumns}
                    dataSource={data}
                    components={{
                        body: {
                            cell: EditTableCell,
                        },
                    }}
                    rowClassName="editable-row"
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    pagination={{ position: ['none', 'none'] }}
                    footer={() => (
                        <Pagination
                            currentPage={3}
                            noPadding={true}
                            totalPage={5} />
                    )}
                    bordered={true} />
            </Form>
        </section>
    )
}

export default Sizes
