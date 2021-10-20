import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutProducts from '../../components/CheckoutProducts/CheckoutProducts'
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb'
import './Payment.scss'
import { Button, Space } from 'antd'
import PaymentForm from "../../components/PaymentForm/PaymentForm";

const breadCrumbRoute = [
    { link: '/', name: 'Home' },
    { link: '/Checkout', name: 'Checkout' },
    { link: '/Shipping', name: 'Shipping' },
]

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with a fake API key.
const stripePromise = loadStripe("pk_test_51JLIp1IZZBbB9jhOSEmU0HhjLSotrTVGMU7pFcr6wXn75rgcuwHDMFHSQcjzz8OI4f3UosYsfnMKD0qNKLeKiCTU003nNWpvLF");

function Shipping() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://localhost:44336/api/Orders/Payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: [
                    { id: "product1" },
                    { id: "product2" }
                ]
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


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
                    <div className="heading">Payment</div>
                    {clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <PaymentForm />
                        </Elements>
                    )}
                </div>
                <CheckoutProducts />
            </div>
        </section>
    )
}

export default Shipping