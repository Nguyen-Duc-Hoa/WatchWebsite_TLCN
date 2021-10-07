import React from 'react'
import { Switch } from 'react-router-dom'
import AdminLayout from '../../../components/Layouts/AdminLayout';
import Products from '../Products/Products';
import AdminResult from '../../../components/Result/Result'
import PublicRoute from '../../../components/Routes/PublicRoute';
import ManageAccount from '../ManageAccount/ManageAccount';
import Order from '../Order/Order';
import OrderDetail from '../OrderDetail/OrderDetail';
import Product from '../Product/Product';
import Comments from '../Comments/Comments';

function AdminMain() {
    return (
        <Switch>
            <PublicRoute
                exact={true}
                component={AdminResult}
                path='/employee/Home'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={ManageAccount}
                path='/employee/ManageAccount'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Order}
                path='/employee/Order'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={OrderDetail}
                path='/employee/Order/:id'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Products}
                path='/employee/Products'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Product}
                path='/employee/Product/:id'
                layout={AdminLayout}
            />
            <PublicRoute
                exact={true}
                component={Comments}
                path='/employee/Comments'
                layout={AdminLayout}
            />
        </Switch>
    )
}

export default AdminMain
