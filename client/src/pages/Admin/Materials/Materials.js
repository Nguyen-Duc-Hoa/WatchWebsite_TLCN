import React, { useState } from 'react'
import { Table, Popover, Popconfirm, Form, Typography, Space, Button, Input } from 'antd';
import Pagination from '../../../components/Pagination/Pagination'
import { AiOutlineAppstoreAdd, AiTwotoneDelete } from 'react-icons/ai'
import EditTableCell from '../../../components/EditTableCell/EditTableCell';
import { useMergedColumns } from '../../../hook/useMergedColums';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        // Column configuration not to be checked
        id: record.id,
    }),
};

const originData = [
    {
        key: '1',
        id: 1,
        name: 'Stainless Steel'
    },
    {
        key: '2',
        id: 2,
        name: 'Titanium'
    },
    {
        key: '3',
        id: 3,
        name: 'Ruby'
    },
    {
        key: '4',
        id: 4,
        name: 'Plastic'
    },
    {
        key: '5',
        id: 5,
        name: 'Ceramic'
    },
    {
        key: '6',
        id: 6,
        name: 'Gold'
    },
    {
        key: '7',
        id: 7,
        name: 'Tungsten'
    },
]

function Materials() {
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
            sorter: (a, b) => a.id > b.id,
            sortDirections: ['descend'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name > b.name,
            sortDirections: ['descend'],
            editable: true
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            // href="javascript:;"
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
                );
            },
        },
    ]

    const mergedColumns = useMergedColumns(columns, isEditing)

    return (
        <section className='admin'>
            <div className="heading">Materials</div>
            <div className="buttonLayout">
                <Space>
                    <Popover
                        content={
                            <Form onFinish={onFinish}>
                                <Form.Item
                                    name='name'
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder='Material name' />
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
                    bordered={true}
                    footer={() => (
                        <Pagination
                            currentPage={3}
                            noPadding={true}
                            totalPage={5} />
                    )}
                />
            </Form>
        </section>
    )
}

export default Materials
