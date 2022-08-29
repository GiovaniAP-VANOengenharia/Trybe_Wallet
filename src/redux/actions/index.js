export const USER_DATA = 'USER_DATA';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAILURE = 'GET_CURRENCIES_FAILURE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const addUser = (xablau) => {
  return {
    type: USER_DATA,
    xablau,
  };
}

const getCurrenciesSuccess = (xablau) => {
  return {
    type: GET_CURRENCIES_SUCCESS,
    xablau,
  };
}

const getCurrenciesFailure = (error) => {
  return {
    type: GET_CURRENCIES_FAILURE,
    error,
    loading: false,
  };
}

const getCurrencies = () => {
  return {
    type: GET_CURRENCIES,
    loading: true,
  };
}

export const getCurrenciesThunk = () => {
  return async (dispatch) => {

    dispatch(getCurrencies());

    try {
      const CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(CURRENCIES_URL);
      const curr = await response.json();
      const currencies = Object.keys(curr).filter((code) => code !== "USDT");
      const moedas = currencies.map((item) => curr[item]);
      const xablau = { currencies, error: null, loading: false }

      dispatch(getCurrenciesSuccess(xablau));
    } catch(e) {
      dispatch(getCurrenciesFailure(e.message));
    }
    
  }
}
