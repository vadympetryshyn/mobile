import {
  GET_VACANCIES_REQUEST,
  GET_VACANCIES_SUCCESS,
  GET_VACANCY_REQUEST,
  GET_VACANCY_SUCCESS,
  CHANGE_FILTER_REQUEST,
  GET_VACANCIES_COUNT_REQUEST,
  GET_VACANCIES_COUNT_SUCCESS,
  SET_FILTER_REQUEST,
  SEND_SEND_FORM_REQUEST,
  SEND_SEND_FORM_SUCCESS,
  SEND_SEND_FORM_FAILURE,
  FAVORITE_TOGGLE_REQUEST,
  FAVORITE_TOGGLE_SUCCESS,
  COMPLAINT_REQUEST,
  COMPLAINT_SUCCESS,
} from '../constants';

export const getVacanciesRequest = (payload) => ({
  type: GET_VACANCIES_REQUEST,
  payload,
});

export const getVacanciesSuccess = (data) => ({
  type: GET_VACANCIES_SUCCESS,
  data,
});

export const getVacanciesCountRequest = (payload) => ({
  type: GET_VACANCIES_COUNT_REQUEST,
  payload,
});

export const getVacanciesCountSuccess = (data) => ({
  type: GET_VACANCIES_COUNT_SUCCESS,
  data,
});

export const getVacancyRequest = (payload) => ({
  type: GET_VACANCY_REQUEST,
  payload,
});

export const getVacancySuccess = (data) => ({
  type: GET_VACANCY_SUCCESS,
  data,
});

export const changeFilterRequest = (payload) => ({
  type: CHANGE_FILTER_REQUEST,
  payload,
});

export const setFilterRequest = (payload) => ({
  type: SET_FILTER_REQUEST,
  payload,
});

export const sendFormRequest = (payload) => ({
  type: SEND_SEND_FORM_REQUEST,
  payload,
});

export const sendFormSuccess = (success = true) => ({
  type: SEND_SEND_FORM_SUCCESS,
  success,
});

export const sendFormFailure = (errors) => ({
  type: SEND_SEND_FORM_FAILURE,
  errors,
});

export const favoriteToggleRequest = (payload) => ({
  type: FAVORITE_TOGGLE_REQUEST,
  payload,
});

export const favoriteToggleSuccess = (notifyNumber) => ({
  type: FAVORITE_TOGGLE_SUCCESS,
  notifyNumber,
});

export const complaintRequest = (payload) => ({
  type: COMPLAINT_REQUEST,
  payload,
});

export const complaintSuccess = () => ({
  type: COMPLAINT_SUCCESS,
});
