import React, { useEffect } from 'react'
import { Menu } from 'antd';
import { useHistory, useRouteMatch } from 'react-router';
import './Menu.scss'
import { GrUserAdmin } from 'react-icons/gr'
import { RiBook2Line } from 'react-icons/ri'

const { SubMenu } = Menu;


function AdminMenu() {
    const history = useHistory();
    const { path, url } = useRouteMatch()

    useEffect(() => {
        clickMenuHandler('/admin/Home')
    }, [])

    const clickMenuHandler = value => {
        history.push(value)
    }
    
    return (
        <Menu
            mode="inline"
            style={{ width: '100%', height: '100%', minHeight: '100vh' }}
            defaultSelectedKeys={['Home']}
            defaultOpenKeys={['Employee']}
        >
            <SubMenu key="Employee" icon={<RiBook2Line />} title="Employee">
                <Menu.Item key="Home" onClick={() => clickMenuHandler('/admin/Home')}>Home</Menu.Item>
                <Menu.Item key="ManageAccount" onClick={() => clickMenuHandler('/admin/ManageAccount')}>User Accounts</Menu.Item>
                <Menu.Item key="Order" onClick={() => clickMenuHandler('/admin/Order')}>Orders</Menu.Item>
                <Menu.Item key="Comments" onClick={() => clickMenuHandler('/admin/Comments')}>Comments</Menu.Item>
                <Menu.Item key="Products" onClick={() => clickMenuHandler('/admin/Products')}>Products</Menu.Item>
            </SubMenu>
            <SubMenu key="Admin" icon={<GrUserAdmin />} title="Admin">
                <Menu.Item key="Energy" onClick={() => clickMenuHandler('/admin/Energy')}>Energy</Menu.Item>
                <Menu.Item key="Brands" onClick={() => clickMenuHandler('/admin/Brands')}>Brands</Menu.Item>
                <Menu.Item key="Materials" onClick={() => clickMenuHandler('/admin/Materials')}>Materials</Menu.Item>
                <Menu.Item key="WaterResistence" onClick={() => clickMenuHandler('/admin/WaterResistence')}>Water Resistence</Menu.Item>
                <Menu.Item key="Sizes" onClick={() => clickMenuHandler('/admin/Sizes')}>Sizes</Menu.Item>
                <Menu.Item key="Employees" onClick={() => clickMenuHandler('/admin/Employees')}>Employees</Menu.Item>
                <Menu.Item key="Statistic" onClick={() => clickMenuHandler('/admin/Statistic')}>Statistic</Menu.Item>
            </SubMenu>
        </Menu>
    )
}

export default AdminMenu
