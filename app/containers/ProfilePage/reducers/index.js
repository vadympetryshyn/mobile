import { GET_MY_RESUMES_SUCCESS } from '../constants';

const initialState = {
  resumes: [],
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_RESUMES_SUCCESS: {
      return {
        ...state,
        resumes: action.data,
      };
    }

    default: {
      return state;
    }
  }
};

// Exports
export default profile;
export { initialState };
