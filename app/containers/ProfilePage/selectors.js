/**
 * The session state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

export const selectProfile = (state) => state.profile || initialState;
export const selectResumes = createSelector(
  [selectProfile],
  (profile) => profile.resumes,
);
