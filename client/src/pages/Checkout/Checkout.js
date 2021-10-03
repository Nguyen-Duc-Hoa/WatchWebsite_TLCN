import React from 'react'
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb'
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm'
import CheckoutProducts from '../../components/CheckoutProducts/CheckoutProducts'
import './Checkout.scss'

const breadCrumbRoute = [
    { link: '/', name: 'Home' },
    { link: '/Checkout', name: 'Checkout' },
]

function Checkout() {
    return (
        <section className='checkout'>
            <Breadcrumbing route={breadCrumbRoute} />
            <div className="checkout__content">
                <CheckoutForm />
                <CheckoutProducts />
            </div>
        </section>
    )
}

export default Checkout
