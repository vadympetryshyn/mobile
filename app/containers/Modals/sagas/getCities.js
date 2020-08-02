import { call, put, select } from 'redux-saga/effects';
import { get } from '../../../utils/api';
import { getCitiesSuccess } from '../actions';

export default function* getCities({ payload }) {
  let countrySlug = null;
  if (payload.selectedCountries) {
    countrySlug = payload.selectedCountries;
  } else {
    countrySlug = yield select(
      (state) => state.vacancies.filters.selectedCountries.slug,
    );
  }

  const response = yield call(
    get,
    `cities-ua/filters?lang=ru&country=eu&countrySlug=${countrySlug}`,
  );
  if (response.data) {
    yield put(getCitiesSuccess(response.data));
  }
}
