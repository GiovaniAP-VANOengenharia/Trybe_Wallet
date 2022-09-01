export const USER_DATA = 'USER_DATA';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const EXPENSES_DATA = 'EXPENSES_DATA';

export const addUser = (xablau) => ({
  type: USER_DATA,
  xablau,
});

export const changeEditor = (xablau) => ({
  type: EXPENSES_DATA,
  xablau,
});

const getCurrenciesSuccess = (xablau) => ({
  type: GET_CURRENCIES_SUCCESS,
  xablau,
});

export const expensesData = (xablau) => {
  const totalArray = xablau.expenses
    .map((item) => Number(item.value) * Number(item.exchangeRates[item.currency].ask));
  const total = totalArray.reduce((acc, curr) => (acc + curr), 0);
  return {
    type: EXPENSES_DATA,
    xablau: { ...xablau, total },
  };
};

const getCurrenciesFailure = (error) => ({
  type: GET_CURRENCIES_FAIL,
  error,
  loading: false,
});

const getCurrencies = () => ({
  type: GET_CURRENCIES,
  loading: true,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  dispatch(getCurrencies());

  try {
    const CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(CURRENCIES_URL);
    const curr = await response.json();
    const currencies = Object.keys(curr).filter((code) => code !== 'USDT');
    // const moedas = currencies.map((item) => curr[item]);
    const xablau = { currencies, exchangeRates: curr, error: null, loading: false };

    dispatch(getCurrenciesSuccess(xablau));
  } catch (e) {
    dispatch(getCurrenciesFailure(e.message));
  }
};
