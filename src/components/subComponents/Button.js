import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeEditor, expensesData } from '../../redux/actions';

class Button extends Component {
  constructor() {
    super();

    this.state = {
      className: 'tableButtons',
      clicked: false,
    };
  }

  componentDidUpdate() {
    const { clicked } = this.state;
    if (clicked) {
      const TIME = 200;
      const timer = setInterval(() => {
        this.setState({ className: 'tableButtons', clicked: false }, () => {
          clearInterval(timer);
        });
      }, TIME);
    }
  }

  handleClick = (event, bill) => {
    if (event.target.name === 'Editar') this.toEdit(bill);
    if (event.target.name === 'Excluir') this.toDelete(bill);
    this.setState({ className: 'tableButtons clicked', clicked: true });
  };

  toDelete = (bill) => {
    const { dispatch, expenses } = this.props;
    const array = expenses.filter((disp) => disp.id !== bill);
    if (array.lenght > 0) dispatch(expensesData({ expenses: array }));
    else dispatch(expensesData({ expenses: array, generalId: 0 }));
  };

  toEdit = (bill) => {
    const { dispatch } = this.props;
    dispatch(changeEditor({ editor: true, idToEdit: bill }));
  };

  render() {
    const { name, dataTestid, classDiv, bill } = this.props;
    const { className } = this.state;
    return (
      <div>
        <button
          type="button"
          data-testid={ dataTestid }
          name={ name }
          className={ `${className} ${classDiv}` }
          onClick={ (event) => this.handleClick(event, bill) }
        >
          { name }
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Button.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  bill: PropTypes.number.isRequired,
  classDiv: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Button);
