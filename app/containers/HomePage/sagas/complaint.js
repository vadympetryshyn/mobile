import { call, put } from 'redux-saga/effects';
import { post } from '../../../utils/api';
import { sendFormSuccess, sendFormFailure } from '../actions';

export default function* complaint({ payload }) {
  const response = yield call(post, 'complaints/store?country=eu', payload);

  if (response?.data) {
    yield put(sendFormSuccess());
  }

  if (response?.errors) {
    yield put(sendFormFailure(response.errors));
  }
}
