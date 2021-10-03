import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import 'antd/dist/antd.css';
import Sidebar from './components/Header/Sidebar/Sidebar';
import Overlay from './components/Overlay/Overlay';
import Cart from './components/Header/Cart/Cart';
import Footer from './components/Footer/Footer'
import Products from './pages/Products/Products';
import BackTopBtn from './components/BackTopBtn/BackTopBtn';
import Product from './pages/Product/Product'
import Checkout from './pages/Checkout/Checkout'
import Shipping from './pages/Shipping/Shipping';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import OrderDetail from './pages/OrderDetail/OrderDetail';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Header />
        <Sidebar />
        <Cart />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path='/products/:id' component={Product} />
          <Route path='/products' component={Products} />
          <Route path='/checkout/shipping' component={Shipping} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/orderHistory' component={OrderHistory} />
          <Route path='/orderDetail/:id' component={OrderDetail} />
        </Switch>
        <Footer />
        <BackTopBtn />
        <Overlay />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
