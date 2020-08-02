import produce from 'immer';

import * as types from '../constants';

// The initial state of the App
export const initialState = {

};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

    }
  });

export default appReducer;
