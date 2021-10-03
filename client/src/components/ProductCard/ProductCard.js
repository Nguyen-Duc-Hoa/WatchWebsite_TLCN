import React from 'react'
import './ProductCard.scss'

function ProductCard({image, name, price}) {
    return (
        <div className='productCard'>
            <div className="imageAndButton">
                <img src={image} alt="" />
                <button>Choose</button>
            </div>
            <div className="name">{name}</div>
            <div className="price">${price}</div>
        </div>
    )
}

export default ProductCard
