import React from 'react'
import CheckoutProducts from '../../components/CheckoutProducts/CheckoutProducts'
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb'
import './Shipping.scss'
import { Button, Space } from 'antd'

const breadCrumbRoute = [
    { link: '/', name: 'Home' },
    { link: '/Checkout', name: 'Checkout' },
    { link: '/Shipping', name: 'Shipping' },
]

function Shipping() {
    return (
        <section className='shipping'>
            <Breadcrumbing route={breadCrumbRoute} />
            <div className="shipping__info">
                <div className='info__content'>
                    <div className="content__top">
                        <div className="content__item content__item--first">
                            <div className='title'>Contact</div>
                            <div className='text'>john@gmail.com</div>
                            <a href="">Change</a>
                        </div>
                        <div className="content__item">
                            <div className='title'>Ship to</div>
                            <div className='text'>1 Vo Van Ngan, Thanh pho Thu Duc</div>
                            <a href="">Change</a>
                        </div>
                    </div>
                    <div className="heading">Shipping method</div>
                    <div className="content__bottom">
                        <div className="circle"></div>
                        <div className="method">Standard</div>
                        <div className="price">Free</div>
                    </div>
                    <Space>
                        <Button size='large' type='primary'>Stripe button</Button>
                        <Button size='large'>Return to information</Button>
                    </Space>
                </div>
                <CheckoutProducts />
            </div>
        </section>
    )
}

export default Shipping
