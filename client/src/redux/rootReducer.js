import {combineReducers} from "redux";
import {PRODUCT_FEATURE_KEY, productReducer} from "./products/products.reducer";
import {USER_FEATURE_KEY, userReducer} from "./users/users.reducers";
import {ALERT_FEATURE_KEY, alertReducer} from "./layout/layout.reducers";
import {ORDER_FEATURE_KEY, orderReducer} from "./orders/orders.reducer";

let rootReducer = combineReducers({
    [PRODUCT_FEATURE_KEY] : productReducer,
    [USER_FEATURE_KEY] : userReducer,
    [ALERT_FEATURE_KEY] : alertReducer,
    [ORDER_FEATURE_KEY] : orderReducer
});
export {rootReducer};
