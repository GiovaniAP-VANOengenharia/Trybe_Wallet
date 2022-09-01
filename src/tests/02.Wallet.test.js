// import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouterAndRedux from '../renderWithRouterAndRedux';
// import Wallet from '../pages/Wallet';
// import Header from '../components/Header';
// import Table from '../components/Table';
// import WalletForm from '../components/WalletForm';

// describe('Verifica os elementos da página Login', () => {
//   const initialState = {
//     user: { email: 'xablau@xablau.com' },
//   };
//   it('Verifica se há na página a entrada para o email.', () => {
//     renderWithRouterAndRedux(<Login />);

//     const emailInput = screen.getByRole('textbox', { type: 'email' });
//     expect(emailInput).toBeInTheDocument();
//   });

//   it('Verifica se há na página a entrada para a senha', () => {
//     renderWithRouterAndRedux(<Login />);

//     const senhaInput = screen.getByRole('textbox', { type: 'password' });
//     expect(senhaInput).toBeInTheDocument();
//   });

//   it('Verifica se há na página o botão Entrar', () => {
//     renderWithRouterAndRedux(<Login />);

//     const button = screen.getByRole('button', { name: 'Entrar' });
//     expect(button.disabled).toEqual(true);
//     expect(button).toBeInTheDocument();
//   });

//   it('Verifica se o email foi salvo no estado da aplicação.', () => {
//     const { store, history } = renderWithRouterAndRedux(<Login />, { initialState });

//     const emailInput = screen.getByRole('textbox', { type: 'email' });
//     const senhaInput = screen.getByRole('textbox', { type: 'password' });
//     const button = screen.getByRole('button', { name: 'Entrar' });

//     userEvent.type(emailInput, 'xablau@xablau.com');
//     expect(emailInput.value).toEqual('xablau@xablau.com');
//     userEvent.type(senhaInput, 'xablau01');
//     userEvent.click(button);
//     // expect(history.location.pathname).toBe('/carteira');

//     history.push('/carteira');

//     const { user } = store.getState();
//     expect(user).toEqual({
//       email: 'xablau@xablau.com',
//     });

//   });
// });
