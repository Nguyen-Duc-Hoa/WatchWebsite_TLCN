import React, { useState } from 'react'
import { Table, Tag } from 'antd';
import Pagination from '../../../components/Pagination/Pagination'

const columns = [
    {
        title: 'Order ID',
        dataIndex: 'orderId',
        key: 'orderId',
        sorter: (a, b) => a.orderId > b.orderId,
        sortDirections: ['descend'],
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name > b.name,
        sortDirections: ['descend'],
    },
    {
        title: 'Payment Status',
        dataIndex: 'paymentStatus',
        key: 'paymentStatus',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Delevery Status',
        dataIndex: 'deliveryStatus',
        key: 'deliveryStatus',
        render: status => {
            if (status === 'Waiting') {
                return <Tag color='#1890ff'>{status}</Tag>
            }
            if (status === 'Confirmed') {
                return <Tag color='#52c41a'>{status}</Tag>
            }
            if (status === 'Delivering') {
                return <Tag color='#faad14'>{status}</Tag>
            }
            if (status === 'Completed') {
                return <Tag color='#eb2f96'>{status}</Tag>
            }
            else {
                return <Tag color='#f5222d'>{status}</Tag>
            }
        },
        filters: [
            {
                text: 'Waiting',
                value: 'Waiting',
            },
            {
                text: 'Confirmed',
                value: 'Confirmed',
            },
            {
                text: 'Delivering',
                value: 'Delivering',
            },
            {
                text: 'Completed',
                value: 'Completed',
            },
            {
                text: 'Cancelled',
                value: 'Cancelled',
            },
        ],
        onFilter: (value, record) => record.deliveryStatus.indexOf(value) === 0,
    },
    {
        title: 'Actions',
        dataIndex: 'Update',
        key: 'Update',
        render: () => (<a>Update</a>)
    }
]

function Order() {
    const [data, setData] = useState([
        {
            orderId: 1,
            name: 'Brown',
            paymentStatus: 'Approve',
            address: 'New York No. 1 Lake Park',
            deliveryStatus: 'Waiting'
        },
        {
            orderId: 2,
            name: 'Red',
            paymentStatus: 'Approve',
            address: 'New York No. 1 Lake Park',
            deliveryStatus: 'Cancelled'
        },
        {
            orderId: 3,
            name: 'Red',
            paymentStatus: 'Approve',
            address: 'New York No. 1 Lake Park',
            deliveryStatus: 'Delivering'
        },
        {
            orderId: 4,
            name: 'White',
            paymentStatus: 'Approve',
            address: 'New York No. 1 Lake Park',
            deliveryStatus: 'Completed'
        },
        {
            orderId: 5,
            name: 'Black',
            paymentStatus: 'Approve',
            address: 'New York No. 1 Lake Park',
            deliveryStatus: 'Confirmed'
        },
    ])

    return (
        <section className='admin'>
            <div className="heading">Order</div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ position: ['none', 'none'] }}
                footer={() => (
                    <Pagination
                        currentPage={3}
                        noPadding={true}
                        totalPage={5} />
                )}
                bordered={true}
            />
        </section>
    )
}

export default Order
