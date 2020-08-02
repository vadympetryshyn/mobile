import { takeLatest } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  SET_USER_REQUEST,
  REGISTER_REQUEST,
} from '../constants';
import login from './login';
import getUser from './getUser';
import register from './register';

export default function* watchVacancies() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(SET_USER_REQUEST, getUser);
  yield takeLatest(REGISTER_REQUEST, register);
}
