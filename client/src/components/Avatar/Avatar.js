import React from 'react'
import { Avatar, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import './Avatar.scss'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { AiOutlineProfile, AiOutlineKey } from 'react-icons/ai'

const menu = (
    <Menu>
        <Menu.Item icon={<AiOutlineProfile />}>Profile</Menu.Item>
        <Menu.Item icon={<AiOutlineKey />}>Password</Menu.Item>
        <Menu.Item danger icon={<RiLogoutCircleRLine />}>Log out</Menu.Item>
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
