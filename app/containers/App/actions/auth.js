import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../constants';

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (data) => ({
  type: LOGIN_FAILURE,
  data,
});

export const setUserRequest = (payload) => ({
  type: SET_USER_REQUEST,
  payload,
});

export const setUserSuccess = (data) => ({
  type: SET_USER_SUCCESS,
  data,
});

export const setUserFailure = (data) => ({
  type: SET_USER_FAILURE,
  data,
});

export const registerRequest = (payload) => ({
  type: REGISTER_REQUEST,
  payload,
});

export const registerSuccess = (success) => ({
  type: REGISTER_SUCCESS,
  success,
});

export const registerFailure = (data) => ({
  type: REGISTER_FAILURE,
  data,
});
