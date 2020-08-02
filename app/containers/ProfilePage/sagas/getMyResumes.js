import { call, put } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getMyResumesRequest, getMyResumesSuccess } from '../actions';

export default function* getMyResumes() {
  const response = yield call(
    get,
    'profile/my-resumes?country=eu&page=1&lang=ru',
  );

  if (response?.data) {
    yield put(getMyResumesSuccess(response.data));
  }
}
