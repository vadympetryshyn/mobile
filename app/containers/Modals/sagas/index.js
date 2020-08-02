import { takeLatest } from 'redux-saga/effects';
import {
  GET_CATEGORIES_REQUEST,
  GET_COUNTRIES_REQUEST,
  GET_CITIES_REQUEST,
  GET_COMPANY_TYPES_REQUEST,
} from '../constants';
import getCountries from './getCountries';
import getCategories from './getCategories';
import getCities from './getCities';
import getCompanyTypes from './getCompanyTypes';

export default function* watchVacancies() {
  yield takeLatest(GET_COUNTRIES_REQUEST, getCountries);
  yield takeLatest(GET_CATEGORIES_REQUEST, getCategories);
  yield takeLatest(GET_CITIES_REQUEST, getCities);
  yield takeLatest(GET_COMPANY_TYPES_REQUEST, getCompanyTypes);
}
