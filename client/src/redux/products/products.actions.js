// upload Product
import {
    GET_PRODUCT_FAILURE,
    GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS,
    KIDS_PRODUCT_FAILURE,
    KIDS_PRODUCT_REQUEST, KIDS_PRODUCT_SUCCESS,
    MEN_PRODUCT_FAILURE,
    MEN_PRODUCT_REQUEST, MEN_PRODUCT_SUCCESS, STRIPE_PAYMENT_FAILURE, STRIPE_PAYMENT_REQUEST, STRIPE_PAYMENT_SUCCESS,
    UPLOAD_PRODUCT_FAILURE,
    UPLOAD_PRODUCT_REQUEST,
    UPLOAD_PRODUCT_SUCCESS, WOMEN_PRODUCT_FAILURE, WOMEN_PRODUCT_REQUEST, WOMEN_PRODUCT_SUCCESS
} from "./products.actionTypes";
import Axios from "axios";
import {setAlert} from "../layout/layout.actions";
import {placeOrder} from "../orders/orders.actions";
import {setAuthToken} from "../../util/setAuthToken";

// upload a product
let uploadProduct = (product , history) => {
    return async (dispatch) => {
         try {
             let config = {
                 headers : {
                     'Content-Type' : 'application/json'
                 }
             };
             dispatch({type : UPLOAD_PRODUCT_REQUEST});
             let response = await Axios.post(`/product/upload`, JSON.stringify(product) , config);
             dispatch({ type : UPLOAD_PRODUCT_SUCCESS , payload : response.data});
             history.push('/');
         }
         catch (error) {
              dispatch({type : UPLOAD_PRODUCT_FAILURE , payload: error});
         }
    }
};

// get MEN's Collection
let getMensCollection = () => {
    return async (dispatch) => {
        try{
            dispatch({type : MEN_PRODUCT_REQUEST});
            let response = await Axios.get('/product/men');
            dispatch({type : MEN_PRODUCT_SUCCESS , payload : response.data});
        }
        catch (error) {
            dispatch({ type : MEN_PRODUCT_FAILURE , payload : error});
        }
    };
};

// get Kid's Collection
let getKidsCollection = () => {
    return async (dispatch) => {
        try{
            dispatch({type : KIDS_PRODUCT_REQUEST});
            let response = await Axios.get('/product/kids');
            dispatch({type : KIDS_PRODUCT_SUCCESS , payload : response.data});
        }
        catch (error) {
            dispatch({ type : KIDS_PRODUCT_FAILURE , payload : error});
        }
    };
};

// get Women's Collection
let getWomensCollection = () => {
    return async (dispatch) => {
        try{
            dispatch({type : WOMEN_PRODUCT_REQUEST});
            let response = await Axios.get('/product/women');
            dispatch({type : WOMEN_PRODUCT_SUCCESS , payload : response.data});
        }
        catch (error) {
            dispatch({ type : WOMEN_PRODUCT_FAILURE , payload : error});
        }
    };
};

// get single Product
let getProduct = (productId) => {
    return async (dispatch) => {
        try{
            dispatch({type : GET_PRODUCT_REQUEST});
            let response = await Axios.get(`/product/${productId}`);
            dispatch({type : GET_PRODUCT_SUCCESS , payload : response.data});
        }
        catch (error) {
            dispatch({ type : GET_PRODUCT_FAILURE , payload : error});
        }
    };
};

// MAKE STRIPE PAYMENT
let makeStripePayment = (body , history, order) => {
    return async (dispatch) => {
        try {
            if(localStorage.token){
                setAuthToken(localStorage.getItem('token'));
            }
            let config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            };
            dispatch({type : STRIPE_PAYMENT_REQUEST});
            let response = await Axios.post(`/payment/pay`, JSON.stringify(body) , config);
            dispatch({ type : STRIPE_PAYMENT_SUCCESS , payload : response.data});
            dispatch(placeOrder(order , history));
        }
        catch (error) {
            dispatch(setAlert(JSON.stringify(error)) , 'danger');
            dispatch({type : STRIPE_PAYMENT_FAILURE , payload: error});
        }
    }
};

export {uploadProduct,
    getMensCollection,
    getKidsCollection,
    getWomensCollection,
    getProduct,
    makeStripePayment}
