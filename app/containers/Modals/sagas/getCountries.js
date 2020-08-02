import { call, put } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getCountriesSuccess } from '../actions';

export default function* getCountries({ payload }) {
  const response = yield call(get, 'countries/filters?lang=ru&country=eu');
  if (response.data) {
    yield put(getCountriesSuccess(response.data));
  }
}
