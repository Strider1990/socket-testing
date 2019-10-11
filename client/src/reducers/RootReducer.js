import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import user from './UserReducer';
import { loginUserEpic, logoutUserEpic, loginSuccessEpic } from '../actions/UserActions'

export const rootReducer = combineReducers({ user });
export const rootEpic = combineEpics(loginUserEpic, logoutUserEpic, loginSuccessEpic);