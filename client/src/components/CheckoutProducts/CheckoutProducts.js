import React, { useEffect, useState } from 'react'
import './CheckoutProducts.scss'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import CheckoutCard from './CheckoutCard/CheckoutCard'
import {useWindowDimensions} from '../../hook/useWindowDemension'

const products = [
    {
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/iwc-big-pilots_360x.png?v=1568783338',
        name: 'Cosmonaute',
        price: 395.4,
        number: 1,
        brand: 'Casio'
    },
    {
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/iwc-big-pilots_360x.png?v=1568783338',
        name: 'Cosmonaute',
        price: 395.4,
        number: 3,
        brand: 'Casio'
    },
]

function CheckoutProducts() {
    const windowDimensions = useWindowDimensions();
    const [resizeFlag, setResizeFlag] = useState(false);
    const [showHeader, setShowHeader] = useState(false)

    useEffect(() => {
        if(windowDimensions.width <= 1080 && !resizeFlag) {
            setResizeFlag(true)
        }
        else if (windowDimensions.width > 1080 && resizeFlag){
            setResizeFlag(false)
        }
    }, [windowDimensions])

    return (
        <div className="content__detail">
            {resizeFlag && <div className="detail__header" onClick={() => setShowHeader(prevState => !prevState)}>
                <div>Show order summary <span>{showHeader ? <IoIosArrowDown /> : <IoIosArrowUp />}</span></div>
                <p>$117,5</p>
            </div>}
            <div className={`detail__body ${showHeader && 'active'}`}>
                {
                    products.map(({image, name, number, price, brand}, index) => (
                        <CheckoutCard
                            image={image}
                            name={name}
                            number={number}
                            price={price}
                            brand={brand}
                            key={index}/>
                    ))
                }
                <div className="underline"></div>
                <div className="subtotal">
                    <div>Subtotal</div>
                    <p>$1250</p>
                </div>
                <div className="shipping">
                    <div>Shipping</div>
                    <p>Free</p>
                </div>
                <div className="underline"></div>
                <div className="total">
                    <div>Total</div>
                    <p>$1250</p>
                </div>
            </div>
        </div>
    )
}

export default CheckoutProducts
