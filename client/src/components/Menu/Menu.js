import React from 'react'
import { Menu } from 'antd';
import { useHistory } from 'react-router';
import './Menu.scss'
import { GrUserAdmin } from 'react-icons/gr'
import { RiBook2Line } from 'react-icons/ri'

const { SubMenu } = Menu;


function AdminMenu({ collapsed }) {
    const history = useHistory();

    const clickMenuHandler = value => {
        history.push(value)
    }

    return (
        <Menu
            mode="inline"
            style={{ width: '100%', height: '100%', minHeight: '100vh' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
        >
            <SubMenu key="sub1" icon={<RiBook2Line />} title="Employee">
                <Menu.Item key="1" onClick={() => clickMenuHandler('/employee/Home')}>Home</Menu.Item>
                <Menu.Item key="2" onClick={() => clickMenuHandler('/employee/ManageAccount')}>User accounts</Menu.Item>
                <Menu.Item key="3" onClick={() => clickMenuHandler('/employee/Order')}>Orders</Menu.Item>
                <Menu.Item key="4" onClick={() => clickMenuHandler('/employee/Comments')}>Comments</Menu.Item>
                <Menu.Item key="5" onClick={() => clickMenuHandler('/employee/Products')}>Products</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<GrUserAdmin />} title="Admin">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default AdminMenu
