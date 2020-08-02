import * as types from '../constants';

export const resetLoading = () => ({
  type: types.RESET_LOADING,
});

export const pushLoading = () => ({
  type: types.PUSH_LOADING,
});

export const popLoading = () => ({
  type: types.POP_LOADING,
});
