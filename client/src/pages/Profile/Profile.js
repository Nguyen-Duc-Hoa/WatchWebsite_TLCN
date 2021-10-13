import { Row, Col } from 'antd'
import React, { useState } from 'react'
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb'
import FormProfile from '../../components/FormProfile/FormProfile'
import UploadImage from '../../components/UploadImage/UploadImage'
import './Profile.scss'

const breadCrumbRoute = [
    { name: 'Home', link: '/' },
    { name: 'Profile', link: '/' }
]

function Profile() {
    const [image, setImage] = useState('')
    return (
        <section className='userProfile'>
            <Breadcrumbing route={breadCrumbRoute} />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col lg={{ span: 16, order: 2 }} sm={{ span: 24, order: 2 }}>
                    <FormProfile />
                </Col>
                <Col lg={{ span: 6, order: 2 }} sm={{ span: 24, order: 1 }}>
                    <UploadImage
                        image={image}
                        setImage={setImage}
                    />
                </Col>
            </Row>
        </section>
    )
}

export default Profile
