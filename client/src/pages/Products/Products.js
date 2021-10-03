import React from 'react';
import { Breadcrumb } from 'antd';
import './Products.scss';
import GallaryCard from '../../components/GalleryCard/GalleryCard'
import FilterBar from '../../components/FilterBar/FilterBar';
import { Row, Col } from 'antd';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb'

const products = [
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
    {
        name: 'Big Bang',
        image: 'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_360x.png?v=1568783338',
        price: '17,937'
    },
]

const breadCrumbRoute = [
    {link: '/', name: 'Home'},
    {link: '/Products', name: 'Products'}
]

function Products() {
    return (
        <section className="products">
            <Breadcrumbing route={breadCrumbRoute}/>
            <GallaryCard
                className='banner'
                image='https://cdn.shopify.com/s/files/1/1063/3618/files/gallerie-003_3024x.jpg?v=1592242046'
                heading='We love these'
                text='Browser our collection of favorites'
                btnText='Explore' />
            <div className="body">
                <FilterBar />
                <div className='product-list'>
                    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                        {
                            products.map((ele, index) => (
                                <Col xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 12 }}>
                                    <ProductCard
                                        image={ele.image}
                                        name={ele.name}
                                        price={ele.price}
                                        key={index} />
                                </Col>
                            ))
                        }
                    </Row>
                    <Pagination
                        currentPage={3}
                        totalPage={5} />
                </div>
            </div>
        </section>
    )
}

export default Products
