import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valor: 0,
      currency: '',
      currencies: [],
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  async componentDidMount() {
    const { dispatch, currencies } = this.props;
    await dispatch(getCurrenciesThunk());
    this.setState({ currencies, currency: currencies[0] });
  }

  handleChange = ({ target }) => {
    const { name, value, type } = target;
    this.setState({ [name]: type === 'number' ? Number(value) : value });
  };

  render() {
    const { valor, currency, currencies, method, tag, description } = this.state;
    return (
      <form>
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
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    currencies: state.walletReducer.currencies,
    expenses: state.walletReducer.expenses,
    editor: state.walletReducer.editor,
    idToEdit: state.walletReducer.idToEdit,
    error: state.walletReducer.error,
    // loading: false,
  };
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.shape([]).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
