import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';
import Login from '../pages/Login';

describe('Verifica os elementos da página Login', () => {
  it('Verifica se há na página a entrada para o email.', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox', { type: 'email' });
    expect(emailInput).toBeInTheDocument();
  });

  it('Verifica se há na página a entrada para a senha', () => {
    renderWithRouterAndRedux(<Login />);

    const senhaInput = screen.getByRole('textbox', { type: 'password' });
    expect(senhaInput).toBeInTheDocument();
  });

  it('Verifica se há na página o botão Entrar', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button.disabled).toEqual(true);
    expect(button).toBeInTheDocument();
  });

  it('Verifica se o email foi salvo no estado da aplicação.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailTyped = 'xablau@xablau.com';

    const emailInput = screen.getByTestId('email-input');
    const senhaInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(emailInput, emailTyped);
    expect(emailInput.value).toEqual(emailTyped);
    userEvent.type(senhaInput, 'xablau');
    expect(senhaInput.value).toEqual('xablau');
    expect(button.disabled).toEqual(false);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
