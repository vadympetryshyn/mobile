import { call, put } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getEmploymentTypesSuccess } from '../actions';

export default function* getEmploymentTypes() {
  const response = yield call(get, 'employment-types?lang=ru&country=eu');
  if (response.data) {
    yield put(getEmploymentTypesSuccess(response.data));
  }
}
