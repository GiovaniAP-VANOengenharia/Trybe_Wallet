import { GET_CURRENCIES, GET_CURRENCIES_FAILURE, GET_CURRENCIES_SUCCESS } from "../actions";

const INITIAL_STATE = {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
    error: null,
    loading: false,
};

const walletReducer = (state = INITIAL_STATE, action) => {
 switch(action.type) {
  case GET_CURRENCIES_SUCCESS: {
    return {
      ...state,
      ...action.xablau,
      error: null,
      loading: false,
    }
  }
  case GET_CURRENCIES_FAILURE: {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }
  case GET_CURRENCIES: {
    return {
      ...state,
      loading: true,
    }
  }
   default: return state;
 }
}

export default walletReducer;