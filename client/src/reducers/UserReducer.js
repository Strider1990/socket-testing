import { INITIAL_USER, LOGIN_USER, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_USER, LOGOUT_SUCCESS, LOGOUT_FAILED } from "../actions/UserActions";

const userReducer = (state = INITIAL_USER, action) => {
    console.log(state);
    console.log(action);
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
                ...state,
                user: action.user
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: action.user
            }
        case LOGOUT_FAILED:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default userReducer;