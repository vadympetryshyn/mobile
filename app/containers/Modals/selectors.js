/**
 * The session state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

export const selectModalsRoot = (state) => state.modals || initialState;
