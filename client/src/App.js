import "./App.less";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import OrderDetail from "./pages/OrderDetail/OrderDetail";
import AdminMain from "./pages/Admin/AdminMain/AdminMain";
import PublicRoute from "./components/Routes/PublicRoute";
import UserLayout from "./components/Layouts/UserLayout";
import Profile from "./pages/Profile/Profile";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import LoginAdmin from "./pages/Admin/Login/Login";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { useEffect } from "react";
import PrivateRoute from "./components/Routes/PrivateRoute";

function App({ onCheckAuthState, onFetchAllBrands }) {
  useEffect(() => {
    onCheckAuthState();
    onFetchAllBrands();
  }, []);
  return (
    <Router>
      <ErrorBoundary>
        <Switch>
          <PublicRoute
            path="/"
            exact={true}
            component={Home}
            layout={UserLayout}
          />
          <PublicRoute
            path="/products/:id"
            component={Product}
            layout={UserLayout}
          />
          <PublicRoute
            path="/products"
            component={Products}
            layout={UserLayout}
          />
          <PublicRoute
            path="/checkout/payment"
            component={Payment}
            layout={UserLayout}
          />
          <PrivateRoute
            path="/checkout"
            component={Checkout}
            layout={UserLayout}
            forUser
          />
          <PublicRoute
            exact={true}
            path="/login"
            component={Login}
            layout={UserLayout}
          />
          <PublicRoute
            path="/register"
            component={Register}
            layout={UserLayout}
          />
          <PublicRoute
            path="/orderHistory"
            component={OrderHistory}
            layout={UserLayout}
          />
          <PublicRoute
            path="/orderDetail/:id"
            component={OrderDetail}
            layout={UserLayout}
          />
          <PublicRoute
            path="/paymentSuccess"
            component={PaymentSuccess}
            layout={UserLayout}
          />
          <PrivateRoute
            path="/profile"
            component={Profile}
            layout={UserLayout}
            forUser
          />
          <PublicRoute
            exact={true}
            path="/secretRoute/login"
            component={LoginAdmin}
          />
          <Route path="/admin" component={AdminMain} />
        </Switch>
      </ErrorBoundary>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.authCheckState()),
    onFetchAllBrands: () => dispatch(actions.fetchAllBrands()),
  };
};

export default connect(null, mapDispatchToProps)(App);
