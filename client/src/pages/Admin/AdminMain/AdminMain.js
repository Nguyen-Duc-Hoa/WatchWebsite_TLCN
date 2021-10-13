import React from 'react'
import { Switch } from 'react-router-dom'
import AdminLayout from '../../../components/Layouts/AdminLayout';
import Login from '../Login/Login';
import Energy from '../Energy/Energy';
import Products from '../Products/Products';
import AdminResult from '../../../components/Result/Result'
import PublicRoute from '../../../components/Routes/PublicRoute';
import ManageAccount from '../ManageAccount/ManageAccount';
import Order from '../Order/Order';
import OrderDetail from '../OrderDetail/OrderDetail';
import Product from '../UpdateProduct/Product';
import Comments from '../Comments/Comments';
import Sizes from '../Sizes/Sizes';
import Materials from '../Materials/Materials'
import WaterResistence from '../WaterResistence/WaterResistence';
import Brands from '../Brands/Brands';
import UpdateBrand from '../UpdateBrand/UpdateBrand';
import Profile from '../Profile/Profile';
import Employee from '../Employee/Employee';
import CreateAccount from '../CreateAccount/CreateAccount';
import ChangePassword from '../ChangePassword/ChangePassword';
import Statistic from '../Statistic/Statistic';

function AdminMain() {
    return (
        <Switch>
            <PublicRoute
                exact={true}
                component={AdminResult}
                path='/admin/Home'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={ManageAccount}
                path='/admin/ManageAccount'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Order}
                path='/admin/Order'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={OrderDetail}
                path='/admin/Order/:id'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Products}
                path='/admin/Products'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Product}
                path='/admin/Product/:id'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Comments}
                path='/admin/Comments'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Login}
                path='/admin/Login'
            />
            <PublicRoute
                exact={true}
                component={Energy}
                path='/admin/Energy'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Sizes}
                path='/admin/Sizes'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Materials}
                path='/admin/Materials'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={WaterResistence}
                path='/admin/WaterResistence'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Brands}
                path='/admin/Brands'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={UpdateBrand}
                path='/admin/Brand/:id'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Profile}
                path='/admin/Profile'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Employee}
                path='/admin/Employees'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={CreateAccount}
                path='/admin/CreateAccount'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={ChangePassword}
                path='/admin/ChangePassword'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Statistic}
                path='/admin/Statistic'
                layout={AdminLayout}
            />
        </Switch>
    )
}

export default AdminMain
