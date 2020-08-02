/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import app from './containers/App/reducers';
import auth from './containers/App/reducers/auth';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  return combineReducers({
    app,
    auth,
    ...injectedReducers,
  });
}
