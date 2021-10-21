import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import { Button, Space, Typography } from "antd";
import { useHistory } from "react-router";

const { Paragraph } = Typography;


const cardStyle = {
  style: {
    base: {
      color: "#000",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      lineHeight: '23px',
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

export default function PaymentForm() {
  const history = useHistory();
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://localhost:44336/api/Orders/Payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: [
          { id: "product1", quantity: 2 },
          { id: "product2", quantity: 3 }
        ]
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      fetch("https://localhost:44336/api/Orders/CreateOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 3,
          orderDate: new Date(),
          transaction: payload.paymentIntent.id,
          paymentStatus: payload.paymentIntent.status,
          address: '123 Main st, VN',
          name: 'Duc huy',
          phone: '0908849505',
          products: [
            {id: 'product1', quantity: 2},
            {id: 'product2', quantity: 3},
          ]
        })
      })

      setError(null);
      setProcessing(false);
      setSucceeded(true);
      history.push('/paymentSuccess')
    }
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <Paragraph
        style={{
          padding: '10px 25px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
      </Paragraph>
      <Paragraph>
        {error && (
          <div>
            {error}
          </div>
        )}
      </Paragraph>
      <Space>
        <Button
          disabled={processing || disabled || succeeded}
          id="submit"
          htmlType='submit'
          type='primary'
          size='large'
        >
          Pay now
        </Button>

        <Button size='large'>Return to information</Button>
      </Space>
    </form>
  );
}

