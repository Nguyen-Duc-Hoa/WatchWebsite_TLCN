import React from 'react'
import Breadcrumbing from '../../components/Breadcrumb/Breadcrumb'
import { Button, Image, InputNumber, Space } from 'antd';
import './Product.scss'
import { CgFacebook } from 'react-icons/cg'
import { AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai'
import { Tabs } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Tooltip, List } from 'antd';
import moment from 'moment';
import Commenting from '../../components/Comment/Comment';
import AddComment from '../../components/AddComment/AddComment';

const { TabPane } = Tabs

const breadCrumbRoute = [
    { link: '/', name: 'Home' },
    { link: '/Products', name: 'Products' },
    { link: '/Products/1', name: 'Big Bang' }
]

const data = [
    {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
    {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

function Product() {
    return (
        <section className='product'>
            <Breadcrumbing route={breadCrumbRoute} />
            <div className="content">
                <div className="image">
                    <Image
                        width={'100%'}
                        src={'https://cdn.shopify.com/s/files/1/1063/3618/products/hublot-big-bang_900x.png?v=1568783338'}
                    />
                </div>
                <div className="info">
                    <div className="name">Big Bang</div>
                    <div className="price">$153,00</div>
                    <div className="stock">Only <span>6</span> item(s) left in stock!</div>
                    <Space direction='vertical'>
                        <InputNumber min={1} max={10} defaultValue={1} />
                        <Button size='large'>Add to cart</Button>
                    </Space>
                    <div>Case material: Stainless steel</div>
                    <div>Gender: Men's</div>
                    <div>Water resistence: 10</div>
                    <div>Automatic</div>
                    <div>Share:</div>
                    <span className='icon-social'><CgFacebook /></span>
                    <span className='icon-social'><AiOutlineTwitter /></span>
                    <span className='icon-social'><AiOutlineInstagram /></span>
                </div>
            </div>
            <div className="descriptionAndComments">
                <Tabs defaultActiveKey="1" centered size='large'>
                    <TabPane tab="Description" key="1">
                        <Text strong>
                            he garments labelled as Committed are products that have been produced using sustainable fibers or processes, reducing their environmental impact. Mango's goal is to support the implementation of practices more committed to the environment, and therefore increase the number of sustainable garments in the collection.
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam eum officiis impedit amet? Eos quos nulla, corrupti aut ratione reprehenderit odio consequuntur esse ipsam fugiat. A, voluptate animi. Perspiciatis, quos.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ex mollitia aut qui, recusandae nobis ipsum eveniet enim ducimus modi quidem, amet velit molestiae delectus? Excepturi voluptas sit sapiente repellendus?
                        </Text>
                    </TabPane>
                    <TabPane tab="Reviews" key="2">
                        {
                            <List
                                className="comment-list"
                                header={`${data.length} replies`}
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <li>
                                        <Commenting
                                            author={item.author}
                                            avatar={item.avatar}
                                            content={item.content}
                                            datetime={item.datetime}
                                        ></Commenting>
                                    </li>
                                )}
                            />
                        }
                        <AddComment />
                    </TabPane>
                </Tabs>
            </div>
        </section>
    )
}

export default Product
