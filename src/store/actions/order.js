import * as actionTypes from './actionTypes';
import remote from "../../axios_firebase";


const purchaseSuccess = (orderID,newOrderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        newOrderData: newOrderData,
        orderID: orderID
    }
};
const purchaseFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_FAILED,
        error: error
    }
};
const tryPurchasing = () => {
    return {
        type: actionTypes.TRY_PURCHASING
    }
}
export const async_purchase = (newOrderData,token) => {
    return dispatch => {
        dispatch(tryPurchasing());
        remote.post('/orders.json?auth=' + token, newOrderData)
            .then(response => {
                dispatch(purchaseSuccess(response.data.name, newOrderData));

            })
            .catch(error => {
                dispatch(purchaseFailed(error))
            })
    }
};
export const initPurchase = () => {
    return {
      type: actionTypes.INIT_PURCHASE
    }
};

export const tryFetchOrder = () => {
    return {
        type: actionTypes.TRY_FETCH_ORDER
    }
};
export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}
export const fetchOrderFailed = (err) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: err
    }
};

export const async_fetchOrder = (token,userID) => {
    return (dispatch) => {
        dispatch(tryFetchOrder());
        const queryParam = `?auth=${token}&orderBy="userID"&equalTo="${userID}"`;
        remote.get('/orders.json' + queryParam)
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        orderID: key
                    })

                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrderFailed(error))
            })
    }
}