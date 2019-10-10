import { ajax } from 'rxjs/ajax';
import { map, switchMap, catchError, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const INITIAL_USER = {
    user: {}
}

export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
}

export const loginSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

export const loginFailed = (user) => {
    return {
        type: LOGIN_FAILED,
        user
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const logoutFailure = () => {
    return {
        type: LOGOUT_FAILED
    }
}

export const loginUserEpic = action$ =>
    action$.pipe(
        ofType(LOGIN_USER),
        switchMap(action =>
            ajax('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.user)
            }).pipe(
                map(response => ({
                    type: LOGIN_SUCCESS,
                    response,
                    action
                })),
                catchError(error =>
                    of({
                        type: LOGIN_FAILED,
                        error
                    })
                )
            )
        )
    )

export const logoutUserEpic = action$ =>
    action$.pipe(
        ofType(LOGOUT_USER),
        switchMap(action =>
            ajax.postJSON('/api/logout').pipe(
                map(response => ({
                    type: LOGOUT_SUCCESS,
                    response,
                    action
                })),
                catchError(error =>
                    ({
                        type:LOGOUT_FAILED,
                        error
                    })
                )
            )
        )
    )