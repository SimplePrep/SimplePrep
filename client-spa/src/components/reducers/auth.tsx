import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL, 
    LOGOUT,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
} from '../../components/actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    error: null,
}

export default function(state = initialState, action:any) {
    const {type, payload} = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                error: null
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload
            }
        case LOGIN_SUCCESS: 
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                error: null,
            }
            
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user:payload,
                error: null,
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
                error: action.payload,
            }
        case LOGIN_FAIL: 
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                error: null,
            }
        


        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};