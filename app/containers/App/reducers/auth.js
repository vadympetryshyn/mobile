import {
  SET_USER_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '../constants';

const initialStateAuth = {
  user: {},
  login: {
    errors: {},
    message: '',
    resend: false,
    resendEmail: '',
  },
  register: {
    success: null,
    errors: {},
    message: '',
    resend: false,
    resendEmail: '',
  },
};

const auth = (state = initialStateAuth, action) => {
  switch (action.type) {
    case SET_USER_SUCCESS: {
      return {
        ...state,
        user: action.data,
        login: {
          errors: [],
          message: '',
          resend: false,
          resendEmail: '',
        },
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        login: {
          ...state.login,
          errors: action.data.errors || {},
          message: action.data.message || '',
          resend: action.data.resend || false,
          resendEmail: action.data.resendEmail || '',
        },
      };
    }

    case REGISTER_FAILURE: {
      return {
        ...state,
        register: {
          ...state.register,
          errors: action.data.errors || {},
          message: action.data.message || '',
          resend: action.data.resend || false,
          resendEmail: action.data.resendEmail || '',
        },
      };
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        register: {
          ...state.register,
          success: action.success,
          errors: {},
        },
      };
    }

    default: {
      return state;
    }
  }
};

// Exports
export default auth;
export { initialStateAuth };
