import {
  OPEN,
  CLOSE,
  OPEN2,
  CLOSE2,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CITIES_REQUEST,
  GET_CITIES_SUCCESS,
  GET_COMPANY_TYPES_REQUEST,
  GET_COMPANY_TYPES_SUCCESS,
  GET_EMPLOYMENT_TYPES_REQUEST,
  GET_EMPLOYMENT_TYPES_SUCCESS,
} from '../constants';

export const openModal = (payload) => ({
  type: OPEN,
  payload,
});

export const closeModal = (payload) => ({
  type: CLOSE,
  payload,
});

export const openModal2 = (payload) => ({
  type: OPEN2,
  payload,
});

export const closeModal2 = (payload) => ({
  type: CLOSE2,
  payload,
});

export const getCountriesRequest = (payload) => ({
  type: GET_COUNTRIES_REQUEST,
  payload,
});

export const getCountriesSuccess = (payload) => ({
  type: GET_COUNTRIES_SUCCESS,
  payload,
});

export const getCategoriesRequest = (payload) => ({
  type: GET_CATEGORIES_REQUEST,
  payload,
});

export const getCategoriesSuccess = (payload) => ({
  type: GET_CATEGORIES_SUCCESS,
  payload,
});

export const getCitiesRequest = (payload) => ({
  type: GET_CITIES_REQUEST,
  payload,
});

export const getCitiesSuccess = (payload) => ({
  type: GET_CITIES_SUCCESS,
  payload,
});

export const getCompanyTypesRequest = (payload) => ({
  type: GET_COMPANY_TYPES_REQUEST,
  payload,
});

export const getCompanyTypesSuccess = (payload) => ({
  type: GET_COMPANY_TYPES_SUCCESS,
  payload,
});

export const getEmploymentTypesRequest = (payload) => ({
  type: GET_EMPLOYMENT_TYPES_REQUEST,
  payload,
});

export const getEmploymentTypesSuccess = (payload) => ({
  type: GET_EMPLOYMENT_TYPES_SUCCESS,
  payload,
});
