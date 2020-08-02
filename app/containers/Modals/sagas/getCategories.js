import { call, put } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getCategoriesSuccess } from '../actions';

export default function* getCategories({ payload }) {
  const response = yield call(get, 'categories/filters?lang=ru&country=eu');
  if (response.data) {
    yield put(getCategoriesSuccess(response.data));
  }
}
