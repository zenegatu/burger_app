import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('Auth Reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(
            {
                access_token: null,
                userID: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
            }
        )
    });

    it('should store the token upon login', () => {
        expect(authReducer(
            {
                access_token: null,
                userID: null,
                error: null,
                loading: false,
                authRedirectPath: '/'
            },
            {
                type: actionTypes.AUTH_SUCCESS,
                access_token: 'this-token',
                userID: 'this-user'
            }
            )).toEqual(
            {
                access_token: 'this-token',
                userID: 'this-user',
                error: null,
                loading: false,
                authRedirectPath: '/'
            }
        )
    })
});
