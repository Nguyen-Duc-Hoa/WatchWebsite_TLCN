import React from 'react'
import { Avatar, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import './Avatar.scss'
import { RiLogoutCircleRLine } from 'react-icons/ri'

const menu = (
    <Menu>
        <Menu.Item danger><RiLogoutCircleRLine /> Log out</Menu.Item>
    </Menu>
);

function AvatarUser() {
    return (
        <div className='avatar'>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Dropdown overlay={menu}>
                <div className="userName">
                    Henry <DownOutlined />
                </div>
            </Dropdown>
        </div>
    )
}

export default AvatarUser
