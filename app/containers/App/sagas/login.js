import { call, put } from 'redux-saga/effects';
import { post } from '../../../utils/api';
import { loginFailure, setUserRequest } from '../actions/auth';
import { setItem } from '../../../utils/storage';
import * as RootNavigation from '../../../utils/RootNavigation';
import intlHelper from '../../../utils/intlHelper';
import notifyMessages from '../../../notifyMessages';

export default function* login({ payload }) {
  const response = yield call(post, 'auth/login', payload);

  if (response?.token) {
    yield setItem('token', response.token);
    yield put(setUserRequest());
    RootNavigation.navigate('Home');
  } else {
    yield setItem('token', '');
    let message = '';
    if (response.message === 'The user credentials were incorrect.') {
      message = intlHelper(notifyMessages.notify8);
    } else if (response.message === 'The given data was invalid.') {
      message = intlHelper(notifyMessages.notify9);
    } else if (response.resend) {
      message = intlHelper(notifyMessages.notify59);
    } else {
      message = intlHelper(notifyMessages.notify10);
    }
    yield put(loginFailure({ ...response, message }));
  }
}
