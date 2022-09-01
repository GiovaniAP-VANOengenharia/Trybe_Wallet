import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesThunk, expensesData } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
    this.setState({ currency: 'USD' });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { valor, currency, method, tag, description } = this.state;
    const { dispatch, expenses, exchangeRates } = this.props;
    const id = expenses.length;
    const array = [...expenses, {
      value: valor,
      currency,
      method,
      tag,
      description,
      exchangeRates,
      id,
    }];
    this.setState({ valor: '', description: '' });
    dispatch(expensesData({ expenses: array }));
    dispatch(getCurrenciesThunk());
  };

  render() {
    const { valor, currency, method, tag, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <input
          type="number"
          data-testid="value-input"
          name="valor"
          value={ valor }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((moeda, i) => (
            <option key={ i }>{ moeda }</option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currencies, expenses, editor, idToEdit, exchangeRates, error } = state.wallet;
  return {
    currencies,
    expenses,
    editor,
    idToEdit,
    exchangeRates,
    error,
    // loading: false,
  };
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
