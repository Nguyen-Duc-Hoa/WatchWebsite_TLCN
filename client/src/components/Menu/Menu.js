import React from 'react'
import { Menu } from 'antd';
import { useHistory } from 'react-router';
import './Menu.scss'
import { GrUserAdmin } from 'react-icons/gr'
import { RiBook2Line } from 'react-icons/ri'

const { SubMenu } = Menu;


function AdminMenu() {
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
                <Menu.Item key="1" onClick={() => clickMenuHandler('/admin/Home')}>Home</Menu.Item>
                <Menu.Item key="2" onClick={() => clickMenuHandler('/admin/ManageAccount')}>User Accounts</Menu.Item>
                <Menu.Item key="3" onClick={() => clickMenuHandler('/admin/Order')}>Orders</Menu.Item>
                <Menu.Item key="4" onClick={() => clickMenuHandler('/admin/Comments')}>Comments</Menu.Item>
                <Menu.Item key="5" onClick={() => clickMenuHandler('/admin/Products')}>Products</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<GrUserAdmin />} title="Admin">
                <Menu.Item key="6" onClick={() => clickMenuHandler('/admin/Energy')}>Energy</Menu.Item>
                <Menu.Item key="7" onClick={() => clickMenuHandler('/admin/Brands')}>Brands</Menu.Item>
                <Menu.Item key="8" onClick={() => clickMenuHandler('/admin/Materials')}>Materials</Menu.Item>
                <Menu.Item key="9" onClick={() => clickMenuHandler('/admin/WaterResistence')}>Water Resistence</Menu.Item>
                <Menu.Item key="10" onClick={() => clickMenuHandler('/admin/Sizes')}>Sizes</Menu.Item>
                <Menu.Item key="11" onClick={() => clickMenuHandler('/admin/Employees')}>Employees</Menu.Item>
                <Menu.Item key="12" onClick={() => clickMenuHandler('/admin/Statistic')}>Statistic</Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default AdminMenu
