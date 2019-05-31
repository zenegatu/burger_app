import * as actionTypes from '../actions/actionTypes';
import {updateObj} from "../../shared/util";

const initState = {
    access_token: null,
    userID: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}
const authReducer = (state=initState,action) => {
    const authStart = (state,action) => {
        return updateObj(state,{error:null,loading:true})
    };
    const authSuccess = (state,action) => {
        return updateObj(state, {
            access_token: action.access_token,
            userID: action.userID,
            error: null,
            loading:false
        })
    };
    const authFail = (state,action) => {
        return updateObj(state, {
            error: action.error,
            loading: false
        })
    }
    const authLogout = () => {
        return updateObj(state,{access_token: null});
    };
    const setAuthRedirectPath = (state,action) => {
        return updateObj(state,{authRedirectPath: action.path})
    }
   switch (action.type) {
       case actionTypes.AUTH_START:return authStart(state,action);
       case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
       case actionTypes.AUTH_FAIL: return authFail(state,action);
       case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
       case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
       default: return state;
   }
}
export default authReducer;
