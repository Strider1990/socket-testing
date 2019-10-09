const LOGIN_USER = 'LOGIN_USER';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_USER = 'LOGOUT_USER';
const LOGOUT_FAILED = 'LOGOUT_FAILED';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const login_user = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
}

const login_success = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

const login_failed = (user) => {
    return {
        type: LOGIN_FAILED,
        user
    }
}

const LOGOUT_USER = () => {
    return {
        type: LOGOUT_USER
    }
}

const LOGOUT_SUCCESS = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

const LOGOUT_FAILED = () => {
    return {
        type: LOGOUT_FAILED
    }
}

