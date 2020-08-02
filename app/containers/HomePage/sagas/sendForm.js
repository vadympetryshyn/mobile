import { call, put } from 'redux-saga/effects';
import { postWithFile } from '../../../utils/api';
import { sendFormSuccess, sendFormFailure } from '../actions';

export default function* sendForm({ payload }) {
  const response = yield call(
    postWithFile,
    'send-mail/send-vacancy-form',
    payload,
  );

  if (response.data) {
    yield put(sendFormSuccess());
  }

  if (response.errors) {
    yield put(sendFormFailure(response.errors));
  }
}
