import {CHANGE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT} from './actions';

const defaultState = {
    products: [],
};

const numberReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_PRODUCT:
            console.log("payload: " + action.payload.index);
            console.log("state: " + [...state.products]);

            return{
                ...state,
                products: [...state.products, state.products[action.payload.index].name = action.payload.name, state.products[action.payload.index].price = action.payload.price],
            }
        case SET_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: [...state.products.slice(0, action.payload), ...state.products.slice(action.payload + 1)],
            }
        default:
            return state;
    }
}


export default numberReducer;