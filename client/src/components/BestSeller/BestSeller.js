import React, {useState, useEffect} from 'react'
import './BestSeller.scss'
import { useWindowDimensions } from '../../hook/useWindowDemension';
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

function BestSeller() {
    const windowDimensions = useWindowDimensions()
    const [resizeFlag, setResizeFlag] = useState(false);
    useEffect(() => {
        // console.log(resizeFlag)
        setResizeFlag(windowDimensions.width > 750)
    }, [windowDimensions])

    return (
        <section className="best-seller">
            <div className="heading">Best Seller</div>

            <Swiper
                slidesPerView={resizeFlag ? 5 : 3}
                loop={true}
                loopFillGroupWithBlank={true}
                spaceBetween={20}
                pagination={{
                    clickable: true
                }}
            >
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card">
                        <img src="https://cdn.shopify.com/s/files/1/1063/3618/products/tag-heuer-carrera_360x.png?v=1568783338" alt="" />
                        <div>Casio</div>
                        <p>Big Pilots</p>
                        <p>$9,600</p>
                    </div>
                </SwiperSlide>

            </Swiper>
        </section>
    )
}

export default BestSeller
