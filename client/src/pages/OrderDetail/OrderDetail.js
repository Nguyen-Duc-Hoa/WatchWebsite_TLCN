import React from 'react'
import './OrderDetail.scss'
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb'
import OrderCard from '../../components/OrderCard/OrderCard'
import {Row, Col} from 'antd'

const breadcrumbRoute = [
    { name: 'Home', link: '/' },
    { name: 'Order History', link: '/' },
    { name: 'Order Detail', link: '/' },
]

const data = {
    product: [
        {
            image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/Breitling-cosmonaute_360x.png?v=1568783338',
            name: 'Mansur Gavriel',
            number: 2,
            price: 485.75,
            brand: 'Gucci'
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/Breitling-cosmonaute_360x.png?v=1568783338',
            name: 'Mansur Gavriel',
            number: 2,
            price: 485.75,
            brand: 'Gucci'
        },
    ],
    total: 1865.5,
    status: 'Đã giao',
    name: 'Jhong Le',
    address: '1 Vo Van Ngan',
    phone: '0123456798',
    email: 'jhong@gmail.com'
}

function OrderDetail() {
    return (
        <section className="orderDetail">
            <Breadcrumbing route={breadcrumbRoute} />
            <Row>
                <Col span={6}>Name:</Col>
                <Col span={18}>{data.name}</Col>
            </Row>
            <Row>
                <Col span={6}>Address:</Col>
                <Col span={18}>{data.address}</Col>
            </Row>
            <Row>
                <Col span={6}>Phone number:</Col>
                <Col span={18}>{data.phone}</Col>
            </Row>
            <Row>
                <Col span={6}>Email:</Col>
                <Col span={18}>{data.email}</Col>
            </Row>
            <Row>
                <Col span={6}>Status:</Col>
                <Col span={18}>{data.status}</Col>
            </Row>
            {data.product.map((ele, index) =>
                <OrderCard {...ele} key={index} />
            )}
            <div className="total"><span>Total:</span> ${data.total}</div>
        </section>
    )
}

export default OrderDetail
