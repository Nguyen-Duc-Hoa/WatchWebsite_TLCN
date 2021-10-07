import { Button, Image, Space } from 'antd'
import React, { useState } from 'react'
import { faultTolerant } from './FaultTolerant'
import { AiOutlineUpload } from 'react-icons/ai'
import './UploadImage.scss'

// Khởi tạo đối tượng FileReader
const reader = new FileReader();

function UploadImage({image, setImage}) {
    const onChange = event => {
        // Lấy thông tin tập tin được đăng tải
        const files = event.target.files;

        // Đọc thông tin tập tin đã được đăng tải
        reader.readAsDataURL(files[0])

        // Lắng nghe quá trình đọc tập tin hoàn thành
        reader.onload = event => {
            // Lấy chuỗi Binary thông tin hình ảnh
            const img = event.target.result;

            setImage(img)
            // Thực hiện hành động gì đó, có thể append chuỗi giá trị này vào thẻ IMG
            console.log(img) // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAA.......
        }
    }

    return (
        <Space direction='vertical'>
            <Image
                width={200}
                height={200}
                src={image}
                fallback={faultTolerant}
            />
            <label for='inputFile' className='customBtnUpload'>
                Upload
                <input id='inputFile' type='file' accept=".jpg, .png" required onChange={onChange} />
            </label>
        </Space>
    )
}

export default UploadImage
