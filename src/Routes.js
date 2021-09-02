import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "./components/pages/homepage/Homepage";
import Login from "./components/Login";
import AddCategory from './components/pages/category/AddCategory';
import PrivateRoute from './PrivateRoute';
import { Guard } from './Guards';
import AddProduct from './components/pages/product/AddProduct';
import ProductDetails from './components/pages/product-details/ProductDetails';
import ShoppingCart from './components/pages/cart/ShoppingCart';
import Dashboard from './components/pages/dashboard/Dashboard';
import Test from './components/Test';
import ManageProduct from './components/pages/product/ManageProduct';
import Register from './components/Register';
import Shipping from './components/pages/shipping/Shipping';
import Search from './components/pages/search/Search';
import ConfirmOrder from './components/pages/orders/ConfirmOrder';

function Routes() {
    return (
        <>
            <Switch>
                <Route exact path="/" render={props => (
                    <Redirect to={{ pathname: '/home' }} />
                )} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />

                {/* <Route path="/add-category" component={AddCategory} /> */}
                {/* <Route path="/add-product" component={AddProduct} /> */}
                {/* <Route path="/user-product" component={ManageProduct} /> */}
                {/* <Route path="/cart" component={ShoppingCart} /> */}
                {/* <Route path="/dashboard" component={Dashboard} /> */}

                <Route path="/register" component={Register} />

                {/* <Route exact path="/category/:category" render={(props) => (
                    <Search category={props.match.params.category} />
                )} /> */}
                
                <Route exact path="/search/:word" render={(props) => (
                    <Search word={props.match.params.word} />
                )} />


                <Route path="/test" component={Test} />



                <Route exact path="/product/:id" render={(props) => (
                    <ProductDetails id={props.match.params.id} />
                )} />


                {/*Redirect if not authenticated */}

                <Guard path="/dashboard" routeRedirect="/login" component={Dashboard} />
                <Guard path="/add-category" routeRedirect="/login" component={AddCategory} />
                <Guard path="/cart" routeRedirect="/login" component={ShoppingCart} />
                <Guard path="/add-product" routeRedirect="/login" component={AddProduct} />
                <Guard path="/user-product" routeRedirect="/login" component={ManageProduct} />
                <Guard path="/shipping" routeRedirect="/login" component={Shipping} />
                <Guard path="/confirm-order" routeRedirect="/login" component={ConfirmOrder} />

            </Switch>
        </>
    );
}
export default Routes;