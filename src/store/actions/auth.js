import * as actionTypes from './actionTypes';
//import remote from '../../axios-orders';
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (access_token, userID) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        access_token: access_token,
        userID: userID
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};
export const auth_logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userID');

    return {
        type: actionTypes.AUTH_LOGOUT,
    }
};
const async_checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(auth_logout())
        },expiresIn * 1000)
    }
}
export const async_auth = (email, psw, isLogin) => {
    return dispatch => {
        dispatch(authStart());
        const loginData = {
            email: email,
            password: psw,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC8bt_tMHlGwTWNr2TufQFBD5CfxDmxmyo';

        if (!isLogin) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC8bt_tMHlGwTWNr2TufQFBD5CfxDmxmyo';
        }


        axios.post(url, loginData)
            .then(res => {
                const expDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expireDate',expDate.toString());
                localStorage.setItem('userID',res.data.localId);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(async_checkAuthTimeout(res.data.expiresIn));

            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
};
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}
export const autoReLogin = () => {
    return dispatch => {
        const lsToken = localStorage.getItem('token');
        if(!lsToken) {
            dispatch(auth_logout());
        }else {
            const lsExpDate = new Date(localStorage.getItem('expireDate'));
            if(lsExpDate.getTime()  <= new Date().getTime()) {
                dispatch(auth_logout())
            }else {
                const lsUserID = localStorage.getItem('userID');
                dispatch(authSuccess(lsToken, lsUserID));
                const timeLeft =  (lsExpDate - new Date().getTime())/1000;
                dispatch(async_checkAuthTimeout(timeLeft))
            }
        }
    }

}
