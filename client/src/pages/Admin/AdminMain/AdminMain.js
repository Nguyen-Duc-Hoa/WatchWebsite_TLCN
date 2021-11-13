import React from "react";
import { Switch } from "react-router-dom";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import Login from "../Login/Login";
import Energy from "../Energy/Energy";
import Products from "../Products/Products";
import AdminResult from "../../../components/Result/Result";
import PublicRoute from "../../../components/Routes/PublicRoute";
import PrivateRoute from "../../../components/Routes/PrivateRoute";
import ManageAccount from "../ManageAccount/ManageAccount";
import Order from "../Order/Order";
import OrderDetail from "../OrderDetail/OrderDetail";
import Product from "../UpdateProduct/Product";
import Comments from "../Comments/Comments";
import Sizes from "../Sizes/Sizes";
import Materials from "../Materials/Materials";
import WaterResistence from "../WaterResistence/WaterResistence";
import Brands from "../Brands/Brands";
import UpdateBrand from "../UpdateBrand/UpdateBrand";
import Profile from "../Profile/Profile";
import Employee from "../Employee/Employee";
import CreateAccount from "../CreateAccount/CreateAccount";
import ChangePassword from "../ChangePassword/ChangePassword";
import Statistic from "../Statistic/Statistic";
import ProductsStatistic from "../ProductsStatistic/ProductsStatistic";
import TurnoverStatistic from '../TurnoverStatistic/TurnoverStatistic'

function AdminMain() {
  return (
    <AdminLayout>
      <Switch>
        <PrivateRoute
          exact={true}
          component={AdminResult}
          path="/admin/Home"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={ManageAccount}
          path="/admin/ManageAccount"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Order}
          path="/admin/Order"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={OrderDetail}
          path="/admin/Order/:id"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Products}
          path="/admin/Products"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Product}
          path="/admin/Product/AddProduct"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Product}
          path="/admin/Product/:id"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Comments}
          path="/admin/Comments"
          // layout={AdminLayout}
        />
        {/* <PublicRoute
                exact={true}
                component={Login}
                path='/admin/Login'
            /> */}
        <PrivateRoute
          exact={true}
          component={Energy}
          path="/admin/Energy"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Sizes}
          path="/admin/Sizes"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Materials}
          path="/admin/Materials"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={WaterResistence}
          path="/admin/WaterResistence"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Brands}
          path="/admin/Brands"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={UpdateBrand}
          path="/admin/Brands/AddBrand"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={UpdateBrand}
          path="/admin/Brands/:id"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Profile}
          path="/admin/Profile"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Employee}
          path="/admin/Employees"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={CreateAccount}
          path="/admin/CreateAccount"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={ChangePassword}
          path="/admin/ChangePassword"
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact={true}
          component={Statistic}
          path="/admin/Statistic"
          onlyAdmin
          // layout={AdminLayout}
        />
        <PrivateRoute
          exact
          component={ProductsStatistic}
          path="/admin/ProductsStatistic"
          onlyAdmin
        />
        <PrivateRoute
          exact
          component={TurnoverStatistic}
          path="/admin/TurnoverStatistic"
          onlyAdmin
        />
      </Switch>
    </AdminLayout>
  );
}

export default AdminMain;
