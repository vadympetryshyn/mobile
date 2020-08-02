import { call, put } from 'redux-saga/effects';
import { post } from '../../../utils/api';
import { registerFailure, registerSuccess } from '../actions/auth';

export default function* register({ payload }) {
  let data = payload;
  if (typeof payload.company_type_id !== 'number') {
    data = {
      ...payload,
      company_type_id: payload.company_type_id.id,
      countries: payload.countries.id || null,
    };
  }

  const response = yield call(post, 'auth/register', data);

  if (response.user) {
    yield put(registerSuccess(payload));
  } else {
    yield put(registerFailure(response));
  }
}
