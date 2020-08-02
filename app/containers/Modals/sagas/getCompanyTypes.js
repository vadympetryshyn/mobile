import { call, put } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getCompanyTypesSuccess } from '../actions';

export default function* getCompanyTypes() {
  const response = yield call(get, 'company-types?lang=ru&country=eu');
  if (response.data) {
    yield put(getCompanyTypesSuccess(response.data));
  }
}
