import {
  OPEN,
  CLOSE,
  OPEN2,
  CLOSE2,
  GET_COUNTRIES_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_CITIES_SUCCESS,
  GET_COMPANY_TYPES_SUCCESS,
  GET_EMPLOYMENT_TYPES_SUCCESS,
} from '../constants';

const initialState = {
  open: false,
  type: '',
  params: {},
  open2: false,
  type2: '',
  callback: null,
  callback2: null,
  params2: {},
  countries: [],
  cities: [],
  categories: [],
  companyTypes: [],
  employmentTypes: [],
};

const modals = (state = initialState, action) => {
  switch (action.type) {
    case OPEN: {
      return {
        ...state,
        open: true,
        type: action.payload.type,
        params: action.payload.params,
        callback: action.payload.callback,
      };
    }
    case CLOSE: {
      return {
        ...state,
        open: false,
        type: '',
        params: {},
      };
    }

    case OPEN2: {
      return {
        ...state,
        open2: true,
        type2: action.payload.type,
        params2: action.payload.params,
        callback2: action.payload.callback,
      };
    }
    case CLOSE2: {
      return {
        ...state,
        open2: false,
        type2: '',
        params2: {},
        callback2: null,
      };
    }

    case GET_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countries: action.payload,
      };
    }

    case GET_CITIES_SUCCESS: {
      return {
        ...state,
        cities: action.payload,
      };
    }
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload,
      };
    }

    case GET_COMPANY_TYPES_SUCCESS: {
      return {
        ...state,
        companyTypes: action.payload,
      };
    }

    case GET_EMPLOYMENT_TYPES_SUCCESS: {
      return {
        ...state,
        employmentTypes: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

// Exports
export default modals;
export { initialState };
