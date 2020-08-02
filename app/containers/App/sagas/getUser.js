import { call, put } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { setUserSuccess } from '../actions/auth';
import { setItem } from '../../../utils/storage';

export default function* getUser() {
  const response = yield call(get, 'auth/user');

  if (response?.user) {
    yield put(setUserSuccess(response.user));
  } else {
    yield setItem('token', '');
  }
}
