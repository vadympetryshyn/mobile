import { call, put } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getVacanciesCountSuccess } from '../actions';

export default function* getVacanciesCount({ payload }) {
  const { filters } = payload;
  let q = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in filters) {
    if (filters[prop]) {
      q += `&${prop}=${filters[prop].slug}`;
    }
  }
  const response = yield call(
    get,
    `vacancies/count?query=${q}&page=1&lang=ru&list=1`,
  );

  if (response.data) {
    yield put(getVacanciesCountSuccess(response.meta.total));
  }
}
