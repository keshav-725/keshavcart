import {
    ADD_TO_CART_FAILURE,
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS, CLEAR_CART_ITEMS,
    DECR_PRODUCT_QTY, DELETE_PRODUCT_FROM_CART, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS,
    INCR_PRODUCT_QTY, PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS
} from "./orders.actionTypes";

export const ORDER_FEATURE_KEY = 'order';

let initialState = {
    loading : false,
    cartItems : [],
    errorMessage : '',
    order : {},
    orders : []
};

let orderReducer = (state = initialState , action) => {
    let {type , payload} = action;
    switch(type) {
        case ADD_TO_CART_REQUEST:
            return  {
              ...state,
              loading: true
            };
        case ADD_TO_CART_SUCCESS:
            let exists = state.cartItems.find(cartItem => cartItem._id === payload._id);
            if(!exists){
                return  {
                    ...state,
                    loading: false,
                    cartItems: [...state.cartItems, payload]
                };
            }
            return  {
                ...state,
                loading: false,
                cartItems: [...state.cartItems]
            };
        case ADD_TO_CART_FAILURE:
            return  {
                ...state,
                loading: false,
                errorMessage: payload
            };
        // incr product qty
        case INCR_PRODUCT_QTY:
            let incrCartItems = state.cartItems.map(cartItem => {
                if(cartItem._id === payload.productId){
                    return {
                        ...cartItem,
                        qty : cartItem.qty + 1
                    }
                }
                return  cartItem;
            });
            return {
                ...state,
                cartItems: [...incrCartItems]
            };
        // decr product qty
        case DECR_PRODUCT_QTY:
            let decrCartItems = state.cartItems.map(cartItem => {
                if(cartItem._id === payload.productId){
                    return {
                        ...cartItem,
                        qty : (cartItem.qty - 1 > 0) ? cartItem.qty - 1 : 1
                    }
                }
                return  cartItem;
            });
            return {
                ...state,
                cartItems: [...decrCartItems]
            };
        case DELETE_PRODUCT_FROM_CART:
            let selectedCartItems = state.cartItems.filter(cartItem => cartItem._id !== payload.productId);
            return {
                ...state,
                cartItems: [...selectedCartItems]
            };
        // Place An Order
        case PLACE_ORDER_REQUEST :
            return  {
                ...state,
                loading: true
            };
        case PLACE_ORDER_SUCCESS:{
            return {
                ...state,
                loading: false,
                order : payload.order
            }
        }
        case PLACE_ORDER_FAILURE:{
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        }
        case CLEAR_CART_ITEMS : {
            return {
                ...state,
                cartItems: []
            }
        }
        // Get All Orders
        case GET_ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders : payload.orders
            };
        case GET_ALL_ORDERS_FAILURE:{
            return {
                ...state,
                loading: false,
                errorMessage: payload
            };
        }
        default: return state;
    }
};
export {orderReducer};
