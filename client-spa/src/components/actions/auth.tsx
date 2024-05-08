import axios, {AxiosError} from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL
} from './types';

export const checkAuthenticated = () => async (dispatch:any) => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const body = JSON.stringify({token: localStorage.getItem('access')})
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            if (res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch(err){
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}

export const login = (email: string, password: string) => async (dispatch:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)

        if (res.data.access) {
            localStorage.setItem('token', res.data.access);
        }
        
        console.log('Login success!!')
        dispatch ({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (err){
        if (axios.isAxiosError(err)) {
            console.log('Login failed');
            dispatch({
              type: LOGIN_FAIL,
              payload: err.response ? err.response.data.detail : 'Login Failed. Either password or email is incorrect'
            });
          } else {
            console.log('An unexpected error occurred:', err);
          }
    }
};
export const signup = (first_name: string, last_name:string, email: string, password: string, re_password: string) => async (dispatch:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({first_name, last_name, email, password, re_password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)

        
        dispatch ({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
    } catch (err){
        if (axios.isAxiosError(err)) {
            console.log('Sign Up failed');
            dispatch({
              type: SIGNUP_FAIL,
              payload: err.response ? err.response.data.email[0] : 'Sign up failed. This email already exists!'
            });
          } else {
            console.log('An unexpected error occurred:', err);
          }
    }
};

export const verify = (uid:string, token:string) => async (dispatch:any) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({uid, token});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)

        console.log('Verification success!!')
        dispatch ({
            type: ACTIVATION_SUCCESS
        })
    } catch (err){

        console.log('Verification failed')
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}
export const load_user = () => async (dispatch:any) => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
    
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
        dispatch ({
            type: USER_LOADED_SUCCESS,
            payload: res.data
        })

        // dispatch(load_user());
    } catch (err){
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};

export const logout = () => (dispatch: any) => {
    dispatch({
        type: LOGOUT
    });
};

export const reset_password = (email:string) => async (dispatch:any) => {
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email});
    
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)
        dispatch ({
            type: PASSWORD_RESET_SUCCESS
        })
    } catch(err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
};

export const reset_password_confirm = (uid: string, token:string, new_password:string, re_new_password:string) => async (dispatch:any) => {
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token, new_password, re_new_password});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)
        dispatch ({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
    } catch(err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}
