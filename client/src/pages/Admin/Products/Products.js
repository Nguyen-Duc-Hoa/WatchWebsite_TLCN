import React from 'react'
import { Button, Space, Table, Tag } from 'antd'
import Pagination from '../../../components/Pagination/Pagination'
import { AiOutlineAppstoreAdd, AiTwotoneDelete } from 'react-icons/ai'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name > b.name,
        sortDirections: ['descend'],
    },
    {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
        render: sex => (
            sex === 'Men'
                ?
                <Tag color='#52c41a'>{sex}</Tag>
                :
                <Tag color='#eb2f96'>{sex}</Tag>
        ),
        filters: [
            {
                text: 'Men',
                value: 'Men'
            },
            {
                text: 'Women',
                value: 'Women'
            },
        ],
        onFilter: (value, record) => record.sex.indexOf(value) === 0,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
        sorter: (a, b) => a.brand > b.brand,
        sortDirections: ['descend'],
        filters: [
            {
                text: 'Gucci',
                value: 'Gucci'
            },
            {
                text: 'Piaget',
                value: 'Piaget'
            },
            {
                text: 'Lange & Söhne',
                value: 'Lange & Söhne'
            },
            {
                text: 'Audemars Piguet',
                value: 'Audemars Piguet'
            },
        ],
        onFilter: (value, record) => record.brand.indexOf(value) === 0,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.amount > b.amount,
        sortDirections: ['descend'],
        filters: [
            {
                text: 'Less than 10',
                value: '<10'
            },
            {
                text: 'From 10 to 50',
                value: '10-50'
            },
            {
                text: 'More than 50',
                value: '>50'
            },
        ],
        onFilter: (value, record) => {
            if (value === '<10') {
                return parseInt(record.amount) < 10
            }
            else if (value === '10-50') {
                return parseInt(record.amount) >= 10 && parseInt(record.amount) <= 50
            }
            else if (value === '>50') {
                return parseInt(record.amount) > 50
            }
        }
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price > b.price,
        sortDirections: ['descend'],
        filters: [
            {
                text: 'Less than 200',
                value: '<200'
            },
            {
                text: 'From 200 to 500',
                value: '200-500'
            },
            {
                text: 'More than 500',
                value: '>500'
            },
        ],
        onFilter: (value, record) => {
            if (value === '<200') {
                return parseFloat(record.price) < 200
            }
            else if (value === '200-500') {
                return parseFloat(record.price) >= 200 && parseFloat(record.price) <= 500
            }
            else if (value === '>500') {
                return parseFloat(record.price) > 500
            }
        }
    },
    {
        title: 'Actions',
        dataIndex: 'Edit',
        key: 'Edit',
        render: () => (<a>Edit</a>)
    }
]

const data = [
    {
        key: 1,
        name: 'abcd',
        brand: 'Gucci',
        amount: 8,
        price: 350,
        sex: 'Men'
    },
    {
        key: 2,
        name: 'abc',
        brand: 'Piaget',
        amount: 16,
        price: 180,
        sex: 'Women'
    },
    {
        key: 3,
        name: 'abc',
        brand: 'Gucci',
        amount: 8,
        price: 350,
        sex: 'Men'
    },
    {
        key: 4,
        name: 'abc',
        brand: 'Lange & Söhne',
        amount: 60,
        price: 950.5,
        sex: 'Men'
    },
    {
        key: 5,
        name: 'abc',
        brand: 'Audemars Piguet',
        amount: 10,
        price: 200,
        sex: 'Women'
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

function Products() {
    return (
        <section className='admin'>
            <div className="heading">Products</div>
            <div className="buttonLayout">
                <Space>
                    <Button size='large' type='primary'><AiOutlineAppstoreAdd className='icon' /> Add</Button>
                    <Button size='large' type='danger'><AiTwotoneDelete className='icon' /> Delete</Button>
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={data}
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

export default Products
