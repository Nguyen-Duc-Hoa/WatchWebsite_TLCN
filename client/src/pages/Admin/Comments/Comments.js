import React from 'react'
import { Table, Button } from 'antd'
import Pagination from '../../../components/Pagination/Pagination'
import '../Products/Products.scss'
import { AiTwotoneDelete } from 'react-icons/ai'
import AddComment from '../../../components/AddComment/AddComment'

const columns = [
    {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username > b.username,
        sortDirections: ['descend'],
    },
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        sorter: (a, b) => a.product > b.product,
        sortDirections: ['descend'],
    },
    {
        title: 'Content',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => a.date > b.date
    },
    {
        title: 'Action',
        dataIndex: 'reply',
        key: 'reply',
        render: () => (
            <a>Reply</a>
        )
    },
]

const data = [
    {
        key: 1,
        username: 'Jhong Lee',
        product: 'Haaigh',
        content: 'Excellent customer service! Whenever I needed something they were there for me.',
        date: '10/7/2021 15:02:37'
    },
    {
        key: 2,
        username: 'Jhong Lee',
        product: 'Haaigh',
        content: 'Excellent customer service! Whenever I needed something they were there for me.',
        date: '10/7/2021 12:02:37'
    },
    {
        key: 3,
        username: 'Jhong Lee',
        product: 'Haaigh',
        content: 'Excellent customer service! Whenever I needed something they were there for me.',
        date: '10/7/2021 14:02:37'
    },
    {
        key: 4,
        username: 'Jhong Lee',
        product: 'Haaigh',
        content: 'I love this product so much! I will repurchase soon.',
        date: '10/7/2021 9:02:37'
    },
]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        // Column configuration not to be checked
        name: record.name,
    }),
};

function Comments() {
    return (
        <section className='adminComments'>
            <div className="heading">Comments</div>
            <div className="buttonLayout">
                <Button size='large' type='danger'><AiTwotoneDelete className='icon' /> Delete</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
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
            <AddComment replyUser='@Jhong Lee' />
        </section>
    )
}

export default Comments
