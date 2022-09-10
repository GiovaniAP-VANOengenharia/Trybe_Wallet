import {
  GET_CURRENCIES,
  GET_CURRENCIES_FAIL,
  GET_CURRENCIES_SUCCESS,
  EXPENSES_DATA,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
  loading: false,
  total: 0,
  generalId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_SUCCESS: {
    return {
      ...state,
      ...action.xablau,
      error: null,
      loading: false,
    };
  }
  case EXPENSES_DATA: {
    return {
      ...state,
      ...action.xablau,
    };
  }
  case GET_CURRENCIES_FAIL: {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }
  case GET_CURRENCIES: {
    return {
      ...state,
      loading: true,
    };
  }
  default: return state;
  }
};

export default wallet;
