import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CartReducer from './CartReducer';
import ProfileReducer from "./ProfileReducer";
import ShippingReducer from './ShippingReducer';

const RootReducer = combineReducers({
    userAuth: AuthReducer,
    userDetails: ProfileReducer,
    userCart: CartReducer,
    shipping: ShippingReducer
});

export default RootReducer;