import { call, put } from 'redux-saga/effects';
import { post } from '../../../utils/api';
import { favoriteToggleSuccess } from '../actions';

export default function* favoriteToggle({ payload }) {
  const response = yield call(
    post,
    `vacancies/toggle-favorite/${payload.userId}/${payload.vacancyId}?country=eu`,
  );

  if (response.data) {
    yield put(favoriteToggleSuccess(response.notifyNumber));
  }
}
