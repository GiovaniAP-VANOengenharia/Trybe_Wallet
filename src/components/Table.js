import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeEditor, expensesData } from '../redux/actions';

class Table extends Component {
  handleClick = (event, bill) => {
    if (event.target.name === 'Excluir') this.toDelete(bill);
    if (event.target.name === 'Editar') this.toEdit(bill);
  };

  toDelete = (bill) => {
    const { dispatch, expenses } = this.props;
    const array = expenses.filter((disp) => disp.id !== bill.id);
    if (array.lenght > 0) dispatch(expensesData({ expenses: array }));
    else dispatch(expensesData({ expenses: array, generalId: 0 }));
  };

  toEdit = (bill) => {
    const { dispatch } = this.props;
    dispatch(changeEditor({ editor: true, idToEdit: bill.id }));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((bill) => (
              <tr key={ bill.id }>
                <td>{bill.description}</td>
                <td>{bill.tag}</td>
                <td>{bill.method}</td>
                <td>{Number(bill.value).toFixed(2)}</td>
                <td>{bill.currency}</td>
                <td>{Number(bill.exchangeRates[bill.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    Number((bill.exchangeRates[bill
                      .currency].ask) * (bill.value)).toFixed(2)
                  }
                </td>
                <td>{bill.exchangeRates[bill.currency].name}</td>
                <td>
                  <button
                    type="button"
                    name="Editar"
                    data-testid="edit-btn"
                    onClick={ (event) => this.handleClick(event, bill) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    name="Excluir"
                    data-testid="delete-btn"
                    onClick={ (event) => this.handleClick(event, bill) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Table);
