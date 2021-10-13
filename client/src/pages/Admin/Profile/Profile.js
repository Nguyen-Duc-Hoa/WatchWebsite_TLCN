import React, { useState } from 'react'
import FormProfile from '../../../components/FormProfile/FormProfile'
import { Row, Col } from 'antd'
import UploadImage from '../../../components/UploadImage/UploadImage'

function Profile() {
    const [image, setImage] = useState('')
    return (
        <section className='admin'>
            <div className="heading">Profile</div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col lg={{ span: 16, order: 2 }} sm={{ span: 24, order: 2 }}>
                    <FormProfile style={{maxWidth: 600}}/>
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
