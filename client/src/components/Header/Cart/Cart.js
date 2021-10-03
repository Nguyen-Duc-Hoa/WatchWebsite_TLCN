import React from 'react'
import './Cart.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CartItem from './CartItem/CartItem';
import { IoMdClose } from 'react-icons/io'
import CustomButton from '../../CustomButton/CustomButton'
import { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actionTypes'

const products = [
    {
        name: 'Citizens Navihawk',
        price: 524,
        brand: 'Citizen',
        amount: 10,
        number: 2,
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/products/99986640/main/large/jy8037-50e_high_res-1439896505-1302.jpg'
    },
    {
        name: 'Citizen Navihawk',
        price: 524,
        brand: 'Citizen',
        amount: 10,
        number: 2,
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/products/99986640/main/large/jy8037-50e_high_res-1439896505-1302.jpg'
    },
    {
        name: 'Citizen Navihawk',
        price: 524,
        brand: 'Citizen',
        amount: 10,
        number: 2,
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/products/99986640/main/large/jy8037-50e_high_res-1439896505-1302.jpg'
    },
    {
        name: 'Citizen Navihawk',
        price: 524,
        brand: 'Citizen',
        amount: 10,
        number: 2,
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/products/99986640/main/large/jy8037-50e_high_res-1439896505-1302.jpg'
    },
    {
        name: 'Citizen Navihawk',
        price: 524,
        brand: 'Citizen',
        amount: 10,
        number: 2,
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/products/99986640/main/large/jy8037-50e_high_res-1439896505-1302.jpg'
    },
    {
        name: 'Citizen Navihawk',
        price: 524,
        brand: 'Citizen',
        amount: 10,
        number: 2,
        image: 'https://d1rkccsb0jf1bk.cloudfront.net/products/99986640/main/large/jy8037-50e_high_res-1439896505-1302.jpg'
    }
]

function Cart({ showCart, onCloseCart, onCloseOverlay }) {
    const [cartList, setCartList] = useState(products)

    const closeCartHandler = () => {
        onCloseOverlay()
        onCloseCart()
    }

    const changeCartNumberHandler = (id, value) => {
        console.log(id, value)
        if (value === 0) {
            const updateCart = cartList.filter((ele, index) => (id !== index))
            setCartList(updateCart)
        }
        else {
            const updateCart = cartList.map((ele, index) => (index === id ? { ...ele, number: value } : ele))
            setCartList(updateCart)
        }
    }

    const calcSubtotal = cartList.reduce((total, item) => {
        return total + item.price * item.number
    }, 0)
    return (
        <div className={`sidebar__cart ${showCart && 'active'}`}>
            <div className="cart__header">
                <div>Cart</div>
                <div className="cart__close" onClick={closeCartHandler}>
                    <IoMdClose />
                </div>
            </div>
            <TransitionGroup component='div' className='cart__body'>
                {
                    cartList.map(({ name, image, price, brand, amount, number }, index) => (
                        <CSSTransition key={index} classNames='fade' timeout={300}>
                            <CartItem
                                id={index}
                                image={image}
                                name={name}
                                amount={amount}
                                number={number}
                                price={price}
                                brand={brand}
                                changeCartNumberHandler={changeCartNumberHandler}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
            <div className="cart__footer">
                <div className="subtotal">
                    <div>SUBTOTAL</div>
                    <p>${calcSubtotal}</p>
                </div>
                <CustomButton
                    block={true}
                    height='45px'
                    fontSize='16px'
                    backgroundColor='black'
                    color='white'
                >
                    Check out
                </CustomButton>
            </div>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        showCart: state.ui.showCart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseCart: () => dispatch({ type: actionTypes.CLOSE_CART }),
        onCloseOverlay: () => dispatch({ type: actionTypes.CLOSE_OVERLAY })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
