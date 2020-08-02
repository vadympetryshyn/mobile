import { call, put, select } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getVacanciesSuccess } from '../actions';

export default function* getVacancies({ payload }) {
  const filters = yield select((state) => state.vacancies.filters);
  let q = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in filters) {
    if (filters[prop] && prop !== 'query') {
      q += `&${prop}=${filters[prop].slug}`;
    }
  }
  const response = yield call(
    get,
    `vacancies/search?query=${filters.query}${q}&page=${payload.page}&lang=ru&list=1`,
  );
  if (response.data) {
    yield put(getVacanciesSuccess(response));
  }
}
