import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Table.css';
import Button from './subComponents/Button';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table className="tableDiv">
          <thead>
            <tr className="tableHead">
              <th className="description">Descrição</th>
              <th className="description">Tag</th>
              <th className="description">
                Método de
                <br />
                pagamento
              </th>
              <th className="description">Valor</th>
              <th className="description">Moeda</th>
              <th className="description">
                Câmbio
                <br />
                utilizado
              </th>
              <th className="description">
                Valor
                <br />
                convertido
              </th>
              <th className="description">
                Moeda de
                <br />
                conversão
              </th>
              <th className="description">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((bill) => (
              <tr key={ bill.id } className="tableHead">
                <td>{bill.description}</td>
                <td>{bill.tag}</td>
                <td>{bill.method}</td>
                <td>{Number(bill.value).toFixed(2)}</td>
                <td>{bill.currency}</td>
                <td>
                  {Number(bill.exchangeRates[bill.currency].ask).toFixed(2)}
                </td>
                <td>
                  {
                    Number((bill.exchangeRates[bill
                      .currency].ask) * (bill.value)).toFixed(2)
                  }
                </td>
                <td>{bill.exchangeRates[bill.currency].name}</td>
                <td className="buttonsDiv">
                  <Button
                    name="Editar"
                    classDiv="edit"
                    dataTestid="edit-btn"
                    bill={ bill.id }
                  />
                  <Button
                    name="Excluir"
                    classDiv="delete"
                    dataTestid="delete-btn"
                    bill={ bill.id }
                  />
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
};
export default connect(mapStateToProps)(Table);
