import { call, put } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getVacancySuccess } from '../actions';

export default function* getVacancy({ payload }) {
  const response = yield call(
    get,
    `vacancies/id-slug/${payload.id}/${payload.slug}?userId=&lang=ru&country=eu`,
  );
  if (response.data) {
    yield put(getVacancySuccess(response.data));
  }
}
