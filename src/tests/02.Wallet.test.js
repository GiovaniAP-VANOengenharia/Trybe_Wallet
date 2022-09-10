import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import { mockCurrencies, mockExpenses } from './helpers/mockExpenses';

describe('Verifica os elementos da página Wallet', () => {
  const { expenses } = mockExpenses;
  const { currencies } = mockCurrencies;
  const initialState = {
    user: { email: 'xablau@xablau.com' },
    wallet: {
      currencies,
      expenses,
      editor: false,
      idToEdit: 0,
      error: null,
      loading: false,
      total: 0,
      generalId: 0,
    },
  };

  const value = 'value-input';
  const currency = 'currency-input';
  const method = 'method-input';
  const tag = 'tag-input';
  const description = 'description-input';
  const btnAddBill = 'Adicionar despesa';
  const tagSelected = 'Alimentação';

  it('Verifica so email do usuário é exibido na página.', () => {
    renderWithRouterAndRedux(<Wallet />);

    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
  });

  it('Verifica se há na página os inputs para adicionar uma despesa', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(value);
    const currencySelect = screen.getByTestId(currency);
    const methodSelect = screen.getByTestId(method);
    const tagSelect = screen.getByTestId(tag);
    const descInput = screen.getByTestId(description);

    expect(valueInput).toBeInTheDocument();
    expect(currencySelect).toBeInTheDocument();
    expect(methodSelect).toBeInTheDocument();
    expect(tagSelect).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
  });

  it('Verifica se há na página Wallet o botão Adicionar despesa', () => {
    renderWithRouterAndRedux(<Wallet />);

    const button = screen.getByRole('button', { name: btnAddBill });
    expect(button).toBeInTheDocument();
  });

  it('Verifica se a despesa foi salva no estado da aplicação.', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState });

    const valueInput = screen.getByTestId(value);
    const currencySelect = screen.getByTestId(currency);
    const methodSelect = screen.getByTestId(method);
    const tagSelect = screen.getByTestId(tag);
    const descInput = screen.getByTestId(description);
    const button = screen.getByRole('button', { name: btnAddBill });

    userEvent.type(valueInput, '10000');
    await (waitFor(() => userEvent.selectOptions(currencySelect, 'BTC')));
    userEvent.selectOptions(methodSelect, 'Dinheiro');
    userEvent.selectOptions(tagSelect, 'Alimentação');
    userEvent.type(descInput, '2 Pizzas');
    userEvent.click(button);

    expect(valueInput.value).toEqual('10000');
    expect(currencySelect.value).toEqual('BTC');
    expect(methodSelect.value).toEqual('Dinheiro');
    expect(tagSelect.value).toEqual(tagSelected);
    expect(descInput.value).toEqual('2 Pizzas');

    const { wallet } = store.getState();
    await (waitFor(() => expect(wallet).toBe({
      currencies,
      expenses,
      editor: false,
      idToEdit: 0,
      error: null,
      loading: true,
      total: 0,
      generalId: 0,
    })));
  });

  it('Verifica se aparece na tabela da página Wallet a despesa após adicionada e se é deletada pelo botão Excluir.', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(value);
    const currencySelect = screen.getByTestId(currency);
    const methodSelect = screen.getByTestId(method);
    const tagSelect = screen.getByTestId(tag);
    const descInput = screen.getByTestId(description);
    const buttonAdd = screen.getByRole('button', { name: btnAddBill });

    userEvent.type(valueInput, '10000');
    await (waitFor(() => userEvent.selectOptions(currencySelect, 'BTC')));
    userEvent.selectOptions(methodSelect, 'Dinheiro');
    userEvent.selectOptions(tagSelect, tagSelected);
    userEvent.type(descInput, '2 Pizzas');
    userEvent.click(buttonAdd);

    const buttonDel = screen.getByTestId('delete-btn');

    userEvent.click(buttonDel);
  });

  it('Verifica se aparece na tabela da página Wallet a despesa após adicionada e se é editada pelo botão Editar.', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId(value);
    const currencySelect = screen.getByTestId(currency);
    const methodSelect = screen.getByTestId(method);
    const tagSelect = screen.getByTestId(tag);
    const descInput = screen.getByTestId(description);
    const buttonAdd = screen.getByRole('button', { name: btnAddBill });

    userEvent.type(valueInput, '10000');
    await (waitFor(() => userEvent.selectOptions(currencySelect, 'BTC')));
    userEvent.selectOptions(methodSelect, 'Dinheiro');
    userEvent.selectOptions(tagSelect, tagSelected);
    userEvent.type(descInput, '2 Pizzas');
    userEvent.click(buttonAdd);

    const buttonEdit = screen.getByTestId('edit-btn');

    userEvent.click(buttonEdit);

    expect(valueInput.value).toEqual('10000');
    expect(currencySelect.value).toEqual('BTC');
    expect(methodSelect.value).toEqual('Dinheiro');
    expect(tagSelect.value).toEqual(tagSelected);
    expect(descInput.value).toEqual('2 Pizzas');

    const btnEditBill = screen.getByRole('button', { name: 'Editar despesa' });

    userEvent.click(btnEditBill);
  });
});
