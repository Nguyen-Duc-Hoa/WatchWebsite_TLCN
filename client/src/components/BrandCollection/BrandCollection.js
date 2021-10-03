import React, {useState, useEffect} from 'react'
import { useWindowDimensions } from '../../hook/useWindowDemension';
import './BrandCollection.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination]);



const brands = [
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/__Citizen.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/__CASIO.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/OliviaBurtonLogo.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/_HugoBoss.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/001_Rotary.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/__tissot.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/__1Gucci.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/__TOMMY1.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/__AX_exchange.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/_Fossil.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/__MK.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/Swatch_Logo.svg',
    'https://d1rkccsb0jf1bk.cloudfront.net/logos/__Sekonda1.svg'
]

function BrandCollection() {
    const windowDimensions = useWindowDimensions()
    const [resizeFlag, setResizeFlag] = useState(false);
    useEffect(() => {
        console.log(resizeFlag)
        if(windowDimensions.width > 750) {
            setResizeFlag(true)
        }
        else {
            setResizeFlag(false)
        }
    }, [windowDimensions])

    

    return (
        <section className='brandCollection'>
            <div className="heading">Brand Collection</div>
            <Swiper
                slidesPerView={resizeFlag ? 4 : 2}
                loop={true}
                loopFillGroupWithBlank={true}
                spaceBetween={20}
                pagination={{
                    clickable: true
                }}
            >

                {
                    brands.map((ele, index) => (
                        <SwiperSlide key={index}>
                            <div className="swiper-card">
                                <img src={ele} alt="" />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default BrandCollection
