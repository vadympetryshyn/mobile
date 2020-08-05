import { takeLatest } from 'redux-saga/effects';
import getVacancies from './getVacancies';
import getVacanciesCount from './getVacanciesCount';
import getVacancy from './getVacancy';
import sendForm from './sendForm';
import complaint from './complaint';
import favoriteToggle from './favoriteToggle';
import {
  GET_VACANCIES_REQUEST,
  GET_VACANCIES_COUNT_REQUEST,
  GET_VACANCY_REQUEST,
  SEND_SEND_FORM_REQUEST,
  COMPLAINT_REQUEST,
  FAVORITE_TOGGLE_REQUEST,
} from '../constants';

export default function* watchVacancies() {
  yield takeLatest(GET_VACANCIES_REQUEST, getVacancies);
  yield takeLatest(GET_VACANCIES_COUNT_REQUEST, getVacanciesCount);
  yield takeLatest(GET_VACANCY_REQUEST, getVacancy);
  yield takeLatest(SEND_SEND_FORM_REQUEST, sendForm);
  yield takeLatest(COMPLAINT_REQUEST, complaint);
  yield takeLatest(FAVORITE_TOGGLE_REQUEST, favoriteToggle);
}
