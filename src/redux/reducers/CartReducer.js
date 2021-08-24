import * as ActionTypes from '../ActionTypes';
const initialState = {
    products: [],
    total: 0
}

export default (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                products: [...state.products, action.product]
            };
        // case ActionTypes.UPDATE_CART:
        //     console.log(action.product)
        //     console.log(action.total)
        //     return {
        //         ...state,
        //         products: action.product,
        //         total: action.total
        //     };

        case ActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.id),
            };

        // setValues(values.map(val => (val._id === id ?
        //     { ...val, quantity: event.target.value, totalPrice: (event.target.value) * val.price }
        //     : { ...val, totalPrice: val.quantity * val.price })))
        case ActionTypes.ADD_QUANTITY:
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.id
                        ? { ...product, quantity: parseInt(product.quantity, 10) + 1, totalPrice: action.quantity * product.price }
                        : product,
                ),
            };

        case ActionTypes.SUB_QUANTITY:
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.id && product.quantity > 1
                        ? { ...product, quantity: parseInt(product.quantity, 10) - 1, totalPrice: action.quantity * product.price }
                        : product,
                ),
            };

        case ActionTypes.ADD_TOTAL:
            return {
                ...state,
                total: action.total
            }
        // case ActionTypes.SUB_QUANTITY:
        //     return {
        //         ...state,
        //         products: state.products.map(product =>
        //             product.id === action.id
        //                 ? {
        //                     ...product,
        //                     quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
        //                 }
        //                 : product,
        //         ),
        //     };
        // case ActionTypes.EMPTY_CART:
        //     return {
        //         ...state,
        //         products: state.products.map(product =>
        //             product.selected
        //                 ? { ...product, selected: false, quantity: 1 }
        //                 : product,
        //         ),
        //     };
        default:
            return state;

    }
}
