import {
  GET_VACANCIES_SUCCESS,
  GET_VACANCIES_REQUEST,
  CHANGE_FILTER_REQUEST,
  GET_VACANCIES_COUNT_SUCCESS,
  SET_FILTER_REQUEST,
  GET_VACANCY_REQUEST,
  GET_VACANCY_SUCCESS,
  SEND_SEND_FORM_SUCCESS,
  SEND_SEND_FORM_REQUEST,
  SEND_SEND_FORM_FAILURE,
  FAVORITE_TOGGLE_SUCCESS,
} from '../constants';

const initialState = {
  sendForm: {
    success: false,
    errors: {},
    loading: false,
  },
  favorites: {
    notifyNumber: null,
  },
  vacancies: [],
  vacancy: {},
  page: 1,
  totalElements: 0,
  count: 0,
  totalPages: 0,
  loading: false,
  filters: {
    query: '',
    selectedCountries: '',
    selectedCities: '',
    selectedCategories: '',
    selectedType: '',
    selectedTypeCountries: '',
  },
};

const vacancies = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_TOGGLE_SUCCESS: {
      return {
        ...state,
        favorites: {
          ...state.favorites,
          notifyNumber: action.notifyNumber,
        },
      };
    }

    case SEND_SEND_FORM_FAILURE: {
      return {
        ...state,
        sendForm: {
          ...state.sendForm,
          errors: action.errors || {},
          success: false,
          loading: false,
        },
      };
    }

    case SEND_SEND_FORM_SUCCESS: {
      return {
        ...state,
        sendForm: {
          ...state.sendForm,
          success: action.success,
          loading: false,
        },
      };
    }

    case SEND_SEND_FORM_REQUEST: {
      return {
        ...state,
        sendForm: {
          ...state.sendForm,
          loading: true,
        },
      };
    }

    case GET_VACANCY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_VACANCY_SUCCESS: {
      return {
        ...state,
        vacancy: action.data,
        loading: false,
      };
    }

    case GET_VACANCIES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_VACANCIES_SUCCESS: {
      return {
        ...state,
        vacancies:
          action.data.meta.current_page === 1
            ? action.data.data
            : state.vacancies.concat(action.data.data),
        page: action.data.meta.current_page,
        totalElements: action.data.meta.total,
        count: action.data.meta.total,
        totalPages: action.data.meta.last_page,
        loading: false,
      };
    }
    case GET_VACANCIES_COUNT_SUCCESS: {
      return {
        ...state,
        count: action.data === undefined ? state.totalElements : action.data,
      };
    }
    case CHANGE_FILTER_REQUEST: {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    }

    case SET_FILTER_REQUEST: {
      const data = action.payload || {
        query: '',
        selectedCountries: '',
        selectedCities: '',
        selectedCategories: '',
        selectedType: '',
        selectedTypeCountries: '',
      };
      return {
        ...state,
        filters: {
          ...state.filters,
          ...data,
        },
      };
    }
    default: {
      return state;
    }
  }
};

// Exports
export default vacancies;
export { initialState };
