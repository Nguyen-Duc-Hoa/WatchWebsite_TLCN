import React from 'react'
import './OrderHistory.scss'
import { Table, Tag } from 'antd';
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb';

const { Column } = Table;

const data = [
    {
        key: 1,
        name: 'Jhong Le',
        placed: '3/10/2021',
        status: 'Đã giao',
        cost: '$754.5'
    },
    {
        key: 2,
        name: 'Jhong Le',
        placed: '3/10/2021',
        status: 'Đã giao',
        cost: '$754.5'
    },
    {
        key: 3,
        name: 'Jhong Le',
        placed: '3/10/2021',
        status: 'Đã giao',
        cost: '$754.5'
    },
]

const breadcrumbRoute = [
    {name: 'Home', link: '/'},
    {name: 'Order History', link: '/'}
]

function OrderHistory() {
    return (
        <section className='orderHistory'>
            <Breadcrumbing route={breadcrumbRoute}/>
            <Table dataSource={data}>
                <Column title='Name' key='name' dataIndex='name' />
                <Column title='Placed' key='placed' dataIndex='placed' />
                <Column
                    title='Status'
                    key='status'
                    dataIndex='status'
                    render={stt => <Tag color='geekblue'>{stt}</Tag>}
                />
                <Column title='Cost' key='cost' dataIndex='cost' />
                <Column
                    title='Action'
                    key='action'
                    render={() => <a>Detail</a>}
                />
            </Table>
        </section>
    )
}

export default OrderHistory
