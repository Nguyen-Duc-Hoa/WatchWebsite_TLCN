import React, { useState } from 'react'
import { Button, Divider, Table, Space } from 'antd'
import './OrderDetail.scss'
import OrderState from '../../../components/OrderState/OrderState'
import Pagination from '../../../components/Pagination/Pagination'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name > b.name,
        sortDirections: ['descend'],
    },
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        sorter: (a, b) => a.number > b.number,
        sortDirections: ['descend'],
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price > b.price,
        sortDirections: ['descend'],
        render: (price) => (
            <div>${price}</div>
        )
    },
]

const data = [
    {
        name: 'Gaggi',
        number: 1,
        price: '752.8'
    },
    {
        name: 'Gaggi',
        number: 3,
        price: '752.8'
    },
    {
        name: 'Gaggi',
        number: 2,
        price: '752.8'
    },
]

function OrderDetail() {
    const [currentStep, setCurrentStep] = useState(0)

    return (
        <section className='admin orderDetailAdmin'>
            <div className="heading">Order # 3154</div>
            <Divider />
            <div className="personalInfo">
                <div className="billedTo">
                    <div className="title">Billed To:</div>
                    <div>John Smith</div>
                    <div>0901234567</div>
                    <div>1234 Main Apt. 4B Springfield, ST 54321</div>
                </div>
                <div className="shippedBy">
                    <div className="title">Shipped By:</div>
                    <div>Kayle</div>
                </div>
            </div>
            <div className="payment">
                <div className="paymentInfo">
                    <div className="title">Payment Method:</div>
                    <div>Visa ending **** 4242</div>
                </div>
                <div className="paymentDate">
                    <div className="title">Order Date:</div>
                    <div>October 16, 2019</div>
                </div>
            </div>
            <OrderState currentStep={currentStep} setCurrentStep={setCurrentStep} />
            <div className="title">Order Summary</div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ position: ['none', 'none'] }}
                bordered={true} />
            <div className="subtotal">
                <div className="title">Sub Total</div>
                <div>$4563</div>
            </div>
            <div className="shippingCost">
                <div className="title">Shipping</div>
                <div>Free</div>
            </div>
            <div className="total">
                <div className="title">Total</div>
                <div className='price'>$4563</div>
            </div>
            <Button type='primary'>Update</Button>
        </section>
    )
}

export default OrderDetail
