/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';
import { initialStateAuth } from './reducers/auth';

export const selectApp = (state) => state.app || initialState;
export const selectAuth = (state) => state.auth || initialStateAuth;

export const selectUser = createSelector([selectAuth], (auth) => auth.user);
export const selectLogin = createSelector([selectAuth], (auth) => auth.login);
export const selectRegister = createSelector(
  [selectAuth],
  (auth) => auth.register,
);
