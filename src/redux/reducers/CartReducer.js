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

        case ActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                products: state.products.filter(product => product.sku.sellerSku !== action.sku),
            };

        case ActionTypes.ADD_QUANTITY:
            return {
                ...state,
                products: state.products.map(product =>
                    product.sku.sellerSku === action.sku
                        ? { ...product, quantity: parseInt(product.quantity, 10) + 1, totalPrice: action.quantity * product.price }
                        : product,
                ),
            };

        case ActionTypes.SUB_QUANTITY:
            return {
                ...state,
                products: state.products.map(product =>
                    product.sku.sellerSku === action.sku && product.quantity > 1
                        ? { ...product, quantity: parseInt(product.quantity, 10) - 1, totalPrice: action.quantity * product.price }
                        : product,
                ),
            };

        case ActionTypes.ADD_TOTAL:
            return {
                ...state,
                total: action.total
            }

        case ActionTypes.EMPTY_CART:
            return {
                products: [],
                total: 0
            }

        default:
            return state;

    }
}
