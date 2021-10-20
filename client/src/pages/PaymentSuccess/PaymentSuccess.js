import { Result, Button } from 'antd'
import React, { useEffect } from 'react'
import './PaymentSuccess.scss'

function PaymentSuccess() {
    return (
        <section className='paymentSuccess'>
            <Result
                status="success"
                title="Payment success!"
                subTitle="Your order is confirmed. We will delivery your product as soon as repair!"
                extra={[
                    <Button size='large' type="primary" key="console">
                        Continue shopping
                    </Button>,
                    <Button size='large'>View order</Button>,
                ]}
            />
        </section>
    )
}

export default PaymentSuccess
