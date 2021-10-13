import React from 'react'
import { Table, Button, Space, Image } from 'antd'
import Pagination from '../../../components/Pagination/Pagination'
import { AiOutlineAppstoreAdd, AiTwotoneDelete } from 'react-icons/ai'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id > b.id,
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
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        align: 'center',
        render: source => <Image width={160} src={source}/>
    },
    {
        title: 'Action',
        dataIndex: 'edit',
        key: 'edit',
        render: () => <a>Edit</a>
    }
]

const originData = [
    {
        key: 1,
        id: 1,
        name: 'Piaget',
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/logos/OliviaBurtonLogo.svg'
    },
    {
        key: 2,
        id: 2,
        name: 'Piaget',
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/logos/OliviaBurtonLogo.svg'
    },
    {
        key: 3,
        id: 3,
        name: 'Piaget',
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/logos/OliviaBurtonLogo.svg'
    },
    {
        key: 4,
        id: 4,
        name: 'Piaget',
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/logos/OliviaBurtonLogo.svg'
    },
    {
        key: 5,
        id: 5,
        name: 'Piaget',
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/logos/OliviaBurtonLogo.svg'
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

function Brands() {
    return (
        <section className='admin'>
            <div className="heading">Brands</div>
            <div className="buttonLayout">
                <Space>
                    <Button size='large' type='primary'><AiOutlineAppstoreAdd className='icon' /> Add</Button>
                    <Button size='large' type='danger'><AiTwotoneDelete className='icon' /> Delete</Button>
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={originData}
                bordered={true}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                pagination={{ position: ['none', 'none'] }}
                footer={() => (
                    <Pagination
                        currentPage={3}
                        noPadding={true}
                        totalPage={5}
                    />
                )}
            />
        </section>
    )
}

export default Brands
