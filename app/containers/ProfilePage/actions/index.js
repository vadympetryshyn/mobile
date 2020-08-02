import {
  GET_MY_RESUMES_REQUEST,
  GET_MY_RESUMES_SUCCESS,
  GET_MY_RESUMES_FAILURE,
} from '../constants';

export const getMyResumesRequest = (payload) => ({
  type: GET_MY_RESUMES_REQUEST,
  payload,
});

export const getMyResumesSuccess = (data) => ({
  type: GET_MY_RESUMES_SUCCESS,
  data,
});

export const getMyResumesFailure = (data) => ({
  type: GET_MY_RESUMES_FAILURE,
  data,
});
