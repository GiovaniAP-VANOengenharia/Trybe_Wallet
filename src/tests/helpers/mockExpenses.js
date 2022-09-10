import exchangeRates from "./mockData";

export const mockExpenses = {
  expenses: [
    {
      id: 0,
      value: '10000',
      currency: 'BTC',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '2 Pizzas',
      exchangeRates,
    },
  ],
};

export const mockCurrencies = {
  currencies: [
    'USD',
    'CAD',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'EUR',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP',
    'DOGE',
  ],
};
