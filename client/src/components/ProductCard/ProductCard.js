import React from 'react'
import './ProductCard.scss'

function ProductCard({image, name, price, brand}) {
    return (
        <div className='productCard'>
            <div className="imageAndButton">
                <img src={`data:image/png;base64,${image}`} alt="" />
                <button>Choose</button>
            </div>
            <div className="name">{name}</div>
            <div className="price">{brand}</div>
            <div className="price">${price}</div>
        </div>
    )
}

export default ProductCard
