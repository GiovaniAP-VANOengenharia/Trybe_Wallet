import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeEditor, expensesData, getCurrenciesThunk } from '../redux/actions';
import '../styles/Wallet.css';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valor: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      stateEditor: false,
      className: 'walletButton',
      clicked: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
    this.setState({ currency: 'USD' });
  }

  componentDidUpdate() {
    const { dispatch, editor } = this.props;
    const { clicked } = this.state;
    if (editor) {
      this.setState({ stateEditor: true });
      dispatch(changeEditor({ editor: false }));
      this.stateEdit();
    }
    if (clicked) {
      const TIME = 200;
      const timer = setInterval(() => {
        this.setState({ className: 'walletButton', clicked: false }, () => {
          clearInterval(timer);
        });
      }, TIME);
    }
  }

  stateEdit = () => {
    const { expenses, idToEdit } = this.props;
    const dispesa = expenses.find((bill) => bill.id === idToEdit);
    const { value, currency, method, tag, description } = dispesa;
    this.setState({
      valor: value,
      currency,
      method,
      tag,
      description,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { valor, currency, method, tag, description, stateEditor } = this.state;
    const { exchangeRates, idToEdit, generalId } = this.props;
    const despesa = {
      value: valor,
      currency,
      method,
      tag,
      description,
      exchangeRates,
      id: stateEditor ? idToEdit : generalId,
    };
    if (stateEditor) this.toEdit(despesa);
    else this.toAdd(despesa);
    this.setState({ valor: '',
      description: '',
      stateEditor: false,
      className: 'walletButton clicked',
      clicked: true });
  };

  toEdit = (despesa) => {
    const { dispatch, expenses, idToEdit } = this.props;
    const arr = expenses.filter((bill) => bill.id !== idToEdit);
    let array = [...arr, despesa];
    array = array.sort((a, b) => a.id - b.id);
    dispatch(expensesData({ expenses: array }));
    this.setState({ className: 'walletButton' });
  };

  toAdd = (despesa) => {
    const { dispatch, expenses, generalId } = this.props;
    this.setState({ className: 'walletButton' });
    const array = [...expenses, despesa];
    const addId = generalId + 1;
    dispatch(getCurrenciesThunk());
    dispatch(expensesData({ expenses: array, generalId: addId }));
  };

  render() {
    const { valor, currency, method, tag,
      description, stateEditor, className } = this.state;
    const { currencies } = this.props;
    return (
      <div className="walletDiv">
        <label htmlFor="valor" className="walletLabel">
          Valor:
          <input
            type="number"
            id="valor"
            data-testid="value-input"
            className="walletInputs"
            placeholder="Digite o valor"
            name="valor"
            value={ valor }
            onChange={ this.handleChange }
          />
        </label>
        <select
          data-testid="currency-input"
          name="currency"
          className="walletSelects"
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
          className="walletSelects"
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
          className="walletSelects"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <label htmlFor="description" className="walletLabel">
          Descrição:
          <input
            type="text"
            id="description"
            data-testid="description-input"
            className="walletInputs"
            placeholder="Ex: 2 pizzas"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          className={ className }
          onClick={ this.handleClick }
        >
          { stateEditor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { currencies, expenses, editor,
    idToEdit, exchangeRates, generalId } = state.wallet;
  return {
    currencies,
    expenses,
    editor,
    idToEdit,
    exchangeRates,
    generalId,
    // loading: false,
  };
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  generalId: PropTypes.number.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  exchangeRates: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
