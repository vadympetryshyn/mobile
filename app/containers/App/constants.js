const prefix = 'App';
const auth = 'Auth';

export const RESET_LOADING = `${prefix}/RESET_LOADING`;
export const PUSH_LOADING = `${prefix}/PUSH_LOADING`;
export const POP_LOADING = `${prefix}/POP_LOADING`;

export const LOAD_USER_DATA_REQUEST = `${auth}/LOAD_USER_DATA_REQUEST`;
export const LOAD_USER_DATA_SUCCESS = `${auth}/LOAD_USER_DATA_SUCCESS`;
export const LOAD_USER_DATA_FAILURE = `${auth}/LOAD_USER_DATA_FAILURE`;

export const SIGN_OUT_REQUEST = `${auth}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${auth}/SIGN_OUT_SUCCESS`;
export const SIGN_OUT_FAILURE = `${auth}/SIGN_OUT_FAILURE`;

export const LOGIN_REQUEST = `${auth}/LOGIN_REQUEST`;
export const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `${prefix}/LOGIN_FAILURE`;

export const REGISTER_REQUEST = `${auth}/REGISTER_REQUEST`;
export const REGISTER_SUCCESS = `${auth}/REGISTER_SUCCESS`;
export const REGISTER_FAILURE = `${auth}/REGISTER_FAILURE`;

export const CHECK_AUTH_REQUEST = `${auth}/CHECK_AUTH_REQUEST`;
export const CHECK_AUTH_SUCCESS = `${auth}/CHECK_AUTH_SUCCESS`;
export const CHECK_AUTH_FAILURE = `${auth}/CHECK_AUTH_FAILURE`;

export const SET_USER_REQUEST = `${auth}/SET_USER_REQUEST`;
export const SET_USER_SUCCESS = `${auth}/SET_USER_SUCCESS`;
export const SET_USER_FAILURE = `${auth}/SET_USER_FAILURE`;

