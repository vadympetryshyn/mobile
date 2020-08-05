/**
 * The session state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

export const selectVacanciesRoot = (state) => state.vacancies || initialState;
export const selectVacancies = createSelector(
  [selectVacanciesRoot],
  (vacancies) => vacancies.vacancies,
);

export const selectFilters = createSelector(
  [selectVacanciesRoot],
  (vacancies) => vacancies.filters,
);

export const selectCount = createSelector(
  [selectVacanciesRoot],
  (vacancies) => vacancies.count,
);

export const selectVacancy = createSelector(
  [selectVacanciesRoot],
  (vacancies) => vacancies.vacancy,
);

export const selectSendForm = createSelector(
  [selectVacanciesRoot],
  (vacancies) => vacancies.sendForm,
);
