import { INITIAL_USER, LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_USER, LOGOUT_SUCCESS, LOGOUT_FAILED } from "../actions/UserActions";

const userReducer = (state = INITIAL_USER, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.user
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        case LOGIN_FAILED:
            return {
                ...state
            }
        case LOGOUT_USER:
            return {
                ...state
            }
        case LOGOUT_SUCCESS:
            return {
                ...state
            }
        case LOGOUT_FAILED:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default userReducer;