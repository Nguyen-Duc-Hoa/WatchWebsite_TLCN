import React, { useState } from 'react'
import { Table, Button } from 'antd'
import { FaLock, FaUnlockAlt } from 'react-icons/fa'
import Pagination from '../../../components/Pagination/Pagination'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'

const columns = [
    {
        title: 'Full Name',
        dataIndex: 'fullname',
        key: 'fullname',
        sorter: (a, b) => a.fullname > b.fullname,
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

const originData = [
    {
        key: '1',
        fullname: 'John Brown',
        phone: '0123456789',
        address: 'New York No. 1 Lake Park',
        status: true,
    },
    {
        key: '2',
        fullname: 'Jim Green',
        phone: '0123456789',
        address: 'London No. 1 Lake Park',
        status: false,
    },
    {
        key: '3',
        fullname: 'Joe Black',
        phone: '0123456789',
        address: 'Sidney No. 1 Lake Park',
        status: false,
    },
]

function Employee() {
    const [data, setData] = useState(originData)

    return (
        <section className='admin'>
            <div className="heading">Employee</div>
            <div className="buttonLayout">
                <Button size='large' type='primary'><AiOutlineAppstoreAdd className='icon' /> Create new account</Button>
            </div>
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

export default Employee
