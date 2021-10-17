import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "./components/pages/homepage/Homepage";
import Login from "./components/pages/auth/Login";
// import PrivateRoute from './PrivateRoute';
import { Guard } from './Guards';

import ProductDetails from './components/pages/product-details/ProductDetails';
import ShoppingCart from './components/pages/cart/ShoppingCart';
import SellerDashboard from './components/pages/dashboard/SellerDashboard';
import Test from './components/Test';
import Register from './components/pages/auth/Register';
import Shipping from './components/pages/shipping/Shipping';
import Search from './components/pages/search/Search';
import ConfirmOrder from './components/pages/orders/ConfirmOrder';
import AdminDashboard from './components/pages/dashboard/AdminDashboard';
import Category from './components/pages/category/Category';
import Payment from './components/pages/payment/Payment';
import ForgotPassword from './components/pages/auth/ForgotPassword';
import ResetPassword from './components/pages/auth/ResetPassword';
import AccountDashboard from './components/pages/account/AccountDashboard';

import NotFound from './components/pages/NotFound';
import Feed from './components/pages/feed/Feed';

function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/" render={props => (
                    <Redirect to={{ pathname: '/home' }} />
                )} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />

                <Route path="/register" component={Register} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password/:token/:email" component={ResetPassword} />

                <Route exact path="/search/:word" render={(props) => (
                    <Search word={props.match.params.word} />
                )} />

                <Route exact path="/category/:category" render={(props) => (
                    <Category category={props.match.params.category} />
                )} />


                <Route path="/test" component={Test} />

                {/* <Route exact path="/test/:word" render={(props) => (
                    <Test word={props.match.params.word} />
                )} /> */}

                <Route path="/feed" component={Feed} />

                <Route exact path="/product/:id" render={(props) => (
                    <ProductDetails id={props.match.params.id} />
                )} />


                {/*Redirect if not authenticated */}



                <Guard path="/seller-dashboard" routeRedirect="/login" component={SellerDashboard} />
                <Guard path="/admin-dashboard" routeRedirect="/login" component={AdminDashboard} />
                <Guard path="/account-dashboard" routeRedirect="/login" component={AccountDashboard} />

                {/* <Guard path="/add-category" routeRedirect="/login" component={AddCategory} /> */}

                <Guard path="/cart" routeRedirect="/login" component={ShoppingCart} />
                <Guard path="/shipping" routeRedirect="/login" component={Shipping} />
                <Guard path="/confirm-order" routeRedirect="/login" component={ConfirmOrder} />
                <Guard path="/payment" routeRedirect="/login" component={Payment} />

                <Route component={NotFound} />
            </Switch>
        </>
    );
}
export default Routes;