import React, { useEffect, useState } from 'react';
import './FilterBar.scss';
import {
    Form,
    Select,
    Radio,
    Checkbox,
    Space,
    Button
} from 'antd'
import { useWindowDimensions } from '../../hook/useWindowDemension'
import { RiFilter3Fill } from 'react-icons/ri'

const { Option } = Select;
const formItemLayout = {
    wrapperCol: {
        span: 24,
    },
};

const options = [
    { label: 'Citizen', value: 'Citizen' },
    { label: 'Casio', value: 'Casio' },
    { label: 'Tissot', value: 'Tissot' },
    { label: 'Rotary', value: 'Rotary' },
    { label: 'Gucci', value: 'Gucci' },
    { label: 'Hugo', value: 'Hugo' },
]

function FilterBar() {
    const windowDemnsion = useWindowDimensions()
    const [resizeFlag, setResizeFlag] = useState(false)
    const [showFilerBar, setShowFilterBar] = useState(false)

    console.log(resizeFlag)

    useEffect(() => {
        if (windowDemnsion.width <= 980 && resizeFlag) {
            setResizeFlag(true)
        }
        else if (windowDemnsion.width > 980 && !resizeFlag) {
            setResizeFlag(false)
        }
    }, [windowDemnsion])

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const filterBarBtnHandler = () => {
        setShowFilterBar(!showFilerBar)
    }

    return (
        <div className={`filterBar`}>
            {
                resizeFlag &&
                <Button
                    onClick={filterBarBtnHandler}
                    icon={<RiFilter3Fill />}
                    style={{
                        background: '#000',
                        color: 'white',
                        height: '40px'
                    }}
                >
                    Filter
                </Button>
            }
            <Form
                name='filter'
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    sortBy: 'bestSelling'
                }}
                className={`${resizeFlag === true && showFilerBar === false && 'hide'}`}
            >
                <div className="heading">Sort by</div>
                <Form.Item
                    name='sortBy'
                // wrapperCol={{ span: 14 }}
                >
                    <Select>
                        <Option value='bestSelling'>Best Selling</Option>
                        <Option value='highToLow'>Price, hight to low</Option>
                        <Option value='lowToHigh'>Price, low to high</Option>
                        <Option value='A-Z'>Alphabeltically, A-Z</Option>
                        <Option value='Z-A'>Alphabeltically, Z-A</Option>
                    </Select>
                </Form.Item>

                <div className="heading">Gender</div>
                <Form.Item
                    name='sex'
                >
                    <Radio.Group>
                        <Space direction='vertical'>
                            <Radio value='men'>Men</Radio>
                            <Radio value='women'>Women</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <div className="heading">Prices</div>
                <Form.Item
                    name='price'
                >
                    <Radio.Group>
                        <Space direction='vertical'>
                            <Radio value="0-50">$0-$50</Radio>
                            <Radio value="50-100">$50-$100</Radio>
                            <Radio value="100-150">$100-$150</Radio>
                            <Radio value="150-200">$150-$200</Radio>
                            <Radio value="200-300">$200-$300</Radio>
                            <Radio value="300-400">$300-$400</Radio>
                            <Radio value=">400">More than $400</Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <div className="heading">Brand</div>
                <Form.Item
                    name='brand'
                >
                    <Checkbox.Group options={options} />
                </Form.Item>

                <Form.Item>
                    <Button
                        htmlType='submit'
                        style={{
                            background: '#000',
                            color: 'white'
                        }}
                    >
                        Select
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FilterBar
