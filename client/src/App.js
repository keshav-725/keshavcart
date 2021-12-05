import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./modules/layout/components/navbar/Navbar";
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Home from "./modules/layout/components/home/Home";
import MensCollection from "./modules/products/components/mens-collection/MensCollection";
import WomensCollections from "./modules/products/components/womens-collection/WomensCollections";
import KidsCollection from "./modules/products/components/kids-collection/KidsCollection";
import UploadProducts from "./modules/products/components/upload-products/UploadProducts";
import Cart from "./modules/orders/components/cart/Cart";
import Checkout from "./modules/orders/components/checkout/Checkout";
import OrderList from "./modules/orders/components/order-list/OrderList";
import Profile from "./modules/users/components/profile/Profile";
import Login from "./modules/users/components/login/Login";
import Register from "./modules/users/components/register/Register";
import ProductDetails from "./modules/products/components/product-details/ProductDetails";
import Alert from "./modules/layout/components/alert/Alert";
import {useSelector} from "react-redux";
import {USER_FEATURE_KEY} from "./redux/users/users.reducers";
import {store} from './redux/store';
import {getUserInfo} from "./redux/users/users.actions";
import PrivateRoute from "./router/PrivateRoute";
import OrderSuccess from "./modules/orders/components/order-success/OrderSuccess";

let App = () => {

  useEffect(() => {
    store.dispatch(getUserInfo());
  },[]);

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <div>
          <Alert/>
        </div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/products/men" component={MensCollection}/>
          <Route exact path="/products/women" component={WomensCollections}/>
          <Route exact path="/products/kids" component={KidsCollection}/>
          <PrivateRoute exact path="/products/upload" component={UploadProducts}/>
          <Route exact path="/products/:id" component={ProductDetails}/>
          <PrivateRoute exact path="/orders/cart" component={Cart}/>
          <PrivateRoute exact path="/orders/checkout" component={Checkout}/>
          <PrivateRoute exact path="/orders/order-success" component={OrderSuccess}/>
          <PrivateRoute exact path="/orders/list" component={OrderList}/>
          <PrivateRoute exact path="/users/profile" component={Profile}/>
          <Route exact path="/users/login" component={Login}/>
          <Route exact path="/users/register" component={Register}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
