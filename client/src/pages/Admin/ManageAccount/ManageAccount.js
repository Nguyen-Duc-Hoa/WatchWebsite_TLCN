import React, { useState } from 'react'
import { Table } from 'antd'
import { FaLock, FaUnlockAlt } from 'react-icons/fa'
import './ManageAccount.scss'
import Pagination from '../../../components/Pagination/Pagination'

const columns = [
    {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => a.username > b.username,
        sortDirections: ['descend'],
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        sorter: (a, b) => a.address > b.address,
        sortDirections: ['descend'],
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (status, record) => {
            return (
                <>
                    {status ?
                        <FaLock
                            className='icon'
                            onClick={() => console.log(record)}
                        /> :
                        <FaUnlockAlt
                            className='icon'
                            onClick={() => console.log(record)}
                        />}
                </>
            )
        }
    }
]



function ManageAccount() {
    const [data, setData] = useState([
        {
            key: '1',
            username: 'John Brown',
            phone: '0123456789',
            address: 'New York No. 1 Lake Park',
            status: true,
        },
        {
            key: '2',
            username: 'Jim Green',
            phone: '0123456789',
            address: 'London No. 1 Lake Park',
            status: false,
        },
        {
            key: '3',
            username: 'Joe Black',
            phone: '0123456789',
            address: 'Sidney No. 1 Lake Park',
            status: false,
        },
    ])
    return (
        <section className='manageAccount'>
            <div className="heading">User Account</div>
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
                bordered={true} />
        </section>
    )
}

export default ManageAccount
