const initialState = {
    address: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case 'ADD_ADDRESS':
            return { ...state, address: action.address }

        case 'RESET_ADDRESS':
            return { address: {} }
        default:
            return state
    }
}
