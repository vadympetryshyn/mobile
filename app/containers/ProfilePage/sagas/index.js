import { takeLatest } from 'redux-saga/effects';
import { GET_MY_RESUMES_REQUEST } from '../constants';
import getMyResumes from './getMyResumes';

export default function* watchVacancies() {
  yield takeLatest(GET_MY_RESUMES_REQUEST, getMyResumes);
}
