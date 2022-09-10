import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrenciesThunk, expensesData, changeEditor } from '../redux/actions';

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
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesThunk());
    this.setState({ currency: 'USD' });
  }

  componentDidUpdate() {
    const { dispatch, editor } = this.props;
    if (editor) {
      this.setState({ stateEditor: true });
      dispatch(changeEditor({ editor: false }));
      this.stateEdit();
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
    this.setState({ valor: '', description: '', stateEditor: false });
  };

  toEdit = (despesa) => {
    const { dispatch, expenses, idToEdit } = this.props;
    const arr = expenses.filter((bill) => bill.id !== idToEdit);
    const array = [...arr, despesa];
    const array2 = [...arr, despesa];
    array2.forEach((item, index) => {
      array[index] = array2.find((bill) => index === bill.id);
    });
    dispatch(expensesData({ expenses: array }));
  };

  toAdd = (despesa) => {
    const { dispatch, expenses, generalId } = this.props;
    const array = [...expenses, despesa];
    const addId = generalId + 1;
    dispatch(getCurrenciesThunk());
    dispatch(expensesData({ expenses: array, generalId: addId }));
  };

  render() {
    const { valor, currency, method, tag, description, stateEditor } = this.state;
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
          type="submit"
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
