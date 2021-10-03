import React from 'react';
import CustomButton from '../CustomButton/CustomButton';
import './GalleryCard.scss'

function Gallery({heading, image, text, btnText, className}) {
    return (
        <div className={`gallery__card ${className}`}>
            <div className="gallery__text">
                <div>{heading}</div>
                <p>{text}</p>
                <CustomButton
                    backgroundColor='#000'
                    color='white'
                    height='50px'
                    borderColor='#000'
                >
                    {btnText}
                </CustomButton>
            </div>
            <img src={image} alt="" />
        </div>
    )
}

export default Gallery
