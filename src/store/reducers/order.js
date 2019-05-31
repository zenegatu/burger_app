import * as actionTypes from '../actions/actionTypes';
import {updateObj} from '../../shared/util';
const initState = {
    orders: [],
    loading: false,
    purchased: false,

}
const orderReducer = (state = initState, action) => {
    const initPurchase = (state,action) => {
        return updateObj(state,{purchased:false});
    };
    const purchaseSuccess = (state,action) => {
        action.newOrderData.orderID = action.orderID;
        const updatedProps = {
            orders: state.orders.concat(action.newOrderData),
            loading: false,
            purchased: true,
        };
        return updateObj(state,updatedProps );
    }
    const purchaseFailed = (state,action) => {
        return updateObj(state,{loading:false});
    };
    const tryPurchasing = (state,action) => {
        return updateObj(state,{loading:true});
    };
    const initIngredients = (state,action) => {
        const updatedProp = {
            ingredients: action.ingredients,
            error: false}
        return updateObj(state,updatedProp);
    };
    const fetchOrderSuccess = (state,action) => {
        const updated = {
            orders: action.orders,
            loading:false
        }
        return updateObj(state,updated)
    };
    const fetchOrderFail = (state,action) => {
        let updates = {
            error: action.error,
            loading: false
        };
        return updateObj(state,updates)
    };
    const tryFetchOrder = (state,action) => {
        return updateObj(state,{loading:true})
    }
    switch(action.type) {
        case actionTypes.INIT_PURCHASE: return initPurchase(state,action);
        case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state,action);
        case actionTypes.PURCHASE_FAILED: return purchaseFailed(state,action);
        case actionTypes.TRY_PURCHASING: return tryPurchasing(state,action);
        case actionTypes.INIT_INGREDIENTS: return initIngredients(state,action);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state,action);
        case actionTypes.FETCH_ORDER_FAILED: return fetchOrderFail(state,action);
        case actionTypes.TRY_FETCH_ORDER: return tryFetchOrder(state,action);
        default: return state;
    }
}
export default orderReducer