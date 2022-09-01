import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
  // dispatch: PropTypes.func.isRequired,
  // currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps)(Table);
