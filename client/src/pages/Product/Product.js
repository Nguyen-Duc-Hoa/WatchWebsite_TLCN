import React, { useEffect, useState } from 'react'
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
import { useParams } from 'react-router';

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
    const [comments, setComments] = useState([])
    const [replyUserName, setReplyUserName] = useState()
    const [replyCommentId, setReplyCommentId] = useState()
    let { id } = useParams()

    useEffect(() => {
        fetchComments()
    }, [])

    const fetchComments = () => {
        fetch(`https://localhost:44336/api/Comments?productId=${id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                setComments(result)
            })
    }

    const handleReply = (id, author, replyFrom) => {
        setReplyCommentId(replyFrom || id)
        setReplyUserName(author)
    }

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
            <section className="descriptionAndComments">
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
                                header={`5 replies`}
                                itemLayout="horizontal"
                                dataSource={comments}
                                renderItem={item => (
                                    <li>
                                        <Commenting
                                            key={item.Id}
                                            id={item.Id}
                                            author={item.User.Name}
                                            avatar={item.User.Avatar}
                                            content={item.Content}
                                            datetime={item.Date}
                                            onReply={handleReply}
                                        >
                                            {item.Replies &&
                                                item.Replies.map(rep =>
                                                    <Commenting
                                                        key={rep.Id}
                                                        id={rep.Id}
                                                        author={rep.User.Name}
                                                        avatar={rep.User.Avatar}
                                                        content={rep.Content}
                                                        datetime={rep.Date}
                                                        replyFrom={rep.ReplyFrom}
                                                        onReply={handleReply}
                                                    />)
                                            }
                                        </Commenting>
                                    </li>
                                )}
                            />
                        }
                        <AddComment
                            setComments={setComments}
                            replyUserName={replyUserName}
                            replyCommentId={replyCommentId}
                            productId={id}
                            setReplyCommentId={setReplyCommentId}
                            setReplyUserName={setReplyUserName}
                        />
                    </TabPane>
                </Tabs>
            </section>
        </section>
    )
}

export default Product
