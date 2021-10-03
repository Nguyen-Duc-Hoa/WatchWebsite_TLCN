import React from 'react'
import './CartItem.scss'
import { InputNumber } from 'antd';

function CartItem({name, image, amount, number, price, changeCartNumberHandler, brand, id}) {
    return (
        <div className="cart__card">
            <img src={image} alt="" />
            <div className="card__info">
                <div>{name}</div>
                <p>Brand: {brand}</p>
                <InputNumber min={0} max={amount} defaultValue={number} value={number} onChange={(value) => changeCartNumberHandler(id, value)} />
            </div>
            <div className="price">${price}</div>
        </div>
    )
}

export default CartItem
